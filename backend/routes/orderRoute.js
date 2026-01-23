import express from 'express';
import authMiddleware from '../middleware/auth.js';
import roleMiddleWare from "../middleware/role.js";
import { getLast30DaysOrders, getLastDayOrders, getLastWeekOrders, getTodayOrders, listOrders, placeOrder,updateStatus,userOrders, verifyOrder } from '../controllers/orderController.js';

const orderRouter = express.Router();

orderRouter.get("/list",authMiddleware, roleMiddleWare("admin"),listOrders);
orderRouter.post("/userorders",authMiddleware,userOrders);
orderRouter.post("/place",authMiddleware,placeOrder);
orderRouter.post("/status",authMiddleware, roleMiddleWare("admin"), updateStatus);
orderRouter.post("/verify",verifyOrder);
orderRouter.get("/analytics/today", authMiddleware, roleMiddleWare("admin"), getTodayOrders);
orderRouter.get("/analytics/yesterday", authMiddleware, roleMiddleWare("admin"), getLastDayOrders);
orderRouter.get("/analytics/last-week", authMiddleware, roleMiddleWare("admin"),  getLastWeekOrders);
orderRouter.get("/analytics/last-30-days", authMiddleware, roleMiddleWare("admin"), getLast30DaysOrders);

export default orderRouter;