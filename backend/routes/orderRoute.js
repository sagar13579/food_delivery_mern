import express from 'express';
import authMiddleware from '../middleware/auth.js';
import { getLast30DaysOrders, getLastDayOrders, getLastWeekOrders, getTodayOrders, listOrders, placeOrder,updateStatus,userOrders, verifyOrder } from '../controllers/orderController.js';

const orderRouter = express.Router();

orderRouter.get("/list",listOrders);
orderRouter.post("/userorders",authMiddleware,userOrders);
orderRouter.post("/place",authMiddleware,placeOrder);
orderRouter.post("/status",updateStatus);
orderRouter.post("/verify",verifyOrder);
orderRouter.get("/analytics/today", getTodayOrders);
orderRouter.get("/analytics/yesterday", getLastDayOrders);
orderRouter.get("/analytics/last-week", getLastWeekOrders);
orderRouter.get("/analytics/last-30-days", getLast30DaysOrders);

export default orderRouter;