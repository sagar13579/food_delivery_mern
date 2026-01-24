import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// Placing User Order for Frontend
const placeOrder = async (req, res) => {
  try {
    const newOrder = new orderModel({
      userId: req.body.userId,
      items: req.body.items,
      amount: req.body.amount,
      address: req.body.address,
    });
    console.log("newOrder: ", newOrder);
    await newOrder.save();
    await userModel.findByIdAndUpdate(req.body.userId, { cartData: {} });

    const line_items = req.body.items.map((item) => ({
      price_data: {
        currency: "inr",
        product_data: {
          name: item.name,
        },
        unit_amount: item.price * 100,
      },
      quantity: item.quantity,
    }));

    line_items.push({
      price_data: {
        currency: "inr",
        product_data: {
          name: "Delivery Charge",
        },
        unit_amount: 50 * 100,
      },
      quantity: 1,
    });

    console.log(
      "Stripe key prefix:",
      process.env.STRIPE_SECRET_KEY?.slice(0, 12),
    );
    console.log("Stripe key length:", process.env.STRIPE_SECRET_KEY?.length);

    const session = await stripe.checkout.sessions.create({
      success_url: `https://food-delivery-frontend-jan.onrender.com/verify?success=true&orderId=${newOrder._id}`,
      cancel_url: `https://food-delivery-frontend-jan.onrender.com/verify?success=false&orderId=${newOrder._id}`,
      line_items: line_items,
      mode: "payment",
    });

    console.log("session: ",session);

    res.json({ success: true, session_url: session.url });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error" });
  }
};

// Listing Order for Admin panel
const listOrders = async (req, res) => {
  try {
    const orders = await orderModel.find({});
    res.json({ success: true, data: orders });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error" });
  }
};

// User Orders for Frontend
const userOrders = async (req, res) => {
  try {
    const orders = await orderModel.find({ userId: req.body.userId });
    res.json({ success: true, data: orders });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error" });
  }
};

//Updating order status for admin panel
const updateStatus = async (req, res) => {
  try {
    await orderModel.findByIdAndUpdate(req.body.orderId, {
      status: req.body.status,
    });
    res.json({ success: true, message: "Status Updated" });
  } catch (error) {
    res.json({ success: false, message: "Error" });
  }
};

const verifyOrder = async (req, res) => {
  const { orderId, success } = req.body;
  try {
    if (success === "true") {
      await orderModel.findByIdAndUpdate(orderId, { payment: true });
      res.json({ success: true, message: "Paid" });
    } else {
      await orderModel.findByIdAndDelete(orderId);
      res.json({ success: false, message: "Not Paid" });
    }
  } catch (error) {
    res.json({ success: false, message: "Not  Verified" });
  }
};

// get today order count
const getTodayOrders = async (req, res) => {
  try {
    // IST offset = +5:30
    const IST_OFFSET = 5.5 * 60 * 60 * 1000;

    const now = new Date();

    // Start of today in IST → convert to UTC
    const startOfTodayIST = new Date(
      new Date(now.getTime() + IST_OFFSET).setHours(0, 0, 0, 0) - IST_OFFSET,
    );

    // End of today in IST → convert to UTC
    const endOfTodayIST = new Date(
      new Date(now.getTime() + IST_OFFSET).setHours(23, 59, 59, 999) -
        IST_OFFSET,
    );

    const totalOrders = await orderModel.countDocuments({
      payment: true,
      date: {
        $gte: startOfTodayIST,
        $lte: endOfTodayIST,
      },
    });

    res.json({ success: true, totalOrders });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// get yesterdays order count
const getLastDayOrders = async (req, res) => {
  try {
    const IST_OFFSET = 5.5 * 60 * 60 * 1000; // IST = UTC + 5:30
    const now = new Date();

    // Start of yesterday in IST → convert to UTC
    const startOfYesterday = new Date(
      new Date(now.getTime() + IST_OFFSET).setDate(
        new Date(now.getTime() + IST_OFFSET).getDate() - 1,
      ),
    );
    startOfYesterday.setHours(0, 0, 0, 0);
    startOfYesterday.setTime(startOfYesterday.getTime() - IST_OFFSET);

    // End of yesterday in IST → convert to UTC
    const endOfYesterday = new Date(
      new Date(now.getTime() + IST_OFFSET).setDate(
        new Date(now.getTime() + IST_OFFSET).getDate() - 1,
      ),
    );
    endOfYesterday.setHours(23, 59, 59, 999);
    endOfYesterday.setTime(endOfYesterday.getTime() - IST_OFFSET);

    const totalOrders = await orderModel.countDocuments({
      payment: true,
      date: {
        $gte: startOfYesterday,
        $lte: endOfYesterday,
      },
    });

    return res.json({
      success: true,
      totalOrders,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Failed to fetch last day orders",
    });
  }
};

// get last 7 days order count
const getLastWeekOrders = async (req, res) => {
  try {
    const IST_OFFSET = 5.5 * 60 * 60 * 1000;
    const now = new Date();

    // Convert current time to IST
    const nowIST = new Date(now.getTime() + IST_OFFSET);

    // Start of last week (7 days ago, 00:00 IST)
    const startOfLastWeek = new Date(nowIST);
    startOfLastWeek.setDate(startOfLastWeek.getDate() - 7);
    startOfLastWeek.setHours(0, 0, 0, 0);

    // End of yesterday (23:59:59 IST)
    const endOfLastWeek = new Date(nowIST);
    endOfLastWeek.setDate(endOfLastWeek.getDate() - 1);
    endOfLastWeek.setHours(23, 59, 59, 999);

    // Convert IST boundaries back to UTC
    const startUTC = new Date(startOfLastWeek.getTime() - IST_OFFSET);
    const endUTC = new Date(endOfLastWeek.getTime() - IST_OFFSET);

    const totalOrders = await orderModel.countDocuments({
      payment: true,
      date: {
        $gte: startUTC,
        $lte: endUTC,
      },
    });

    return res.json({
      success: true,
      totalOrders,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Failed to fetch last week orders",
    });
  }
};

// get last 30 days order count (excluding today)
const getLast30DaysOrders = async (req, res) => {
  try {
    const IST_OFFSET = 5.5 * 60 * 60 * 1000;
    const now = new Date();

    // Convert current time to IST
    const nowIST = new Date(now.getTime() + IST_OFFSET);

    // Start of last 30 days (30 days ago, 00:00 IST)
    const startOfLast30Days = new Date(nowIST);
    startOfLast30Days.setDate(startOfLast30Days.getDate() - 30);
    startOfLast30Days.setHours(0, 0, 0, 0);

    // End of yesterday (23:59:59 IST)
    const endOfLast30Days = new Date(nowIST);
    endOfLast30Days.setDate(endOfLast30Days.getDate() - 1);
    endOfLast30Days.setHours(23, 59, 59, 999);

    // Convert IST boundaries back to UTC for MongoDB
    const startUTC = new Date(startOfLast30Days.getTime() - IST_OFFSET);
    const endUTC = new Date(endOfLast30Days.getTime() - IST_OFFSET);

    const totalOrders = await orderModel.countDocuments({
      payment: true,
      date: {
        $gte: startUTC,
        $lte: endUTC,
      },
    });

    return res.json({
      success: true,
      totalOrders,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Failed to fetch last 30 days orders",
    });
  }
};

export {
  placeOrder,
  listOrders,
  userOrders,
  updateStatus,
  verifyOrder,
  getTodayOrders,
  getLastDayOrders,
  getLastWeekOrders,
  getLast30DaysOrders,
};
