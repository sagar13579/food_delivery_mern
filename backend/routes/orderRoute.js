import express from 'express';
import authMiddleware from '../middleware/auth.js';
import { getLastDayOrders, getTodayOrders, listOrders, placeOrder,updateStatus,userOrders, verifyOrder } from '../controllers/orderController.js';

const orderRouter = express.Router();

orderRouter.get("/list",listOrders);
orderRouter.post("/userorders",authMiddleware,userOrders);
orderRouter.post("/place",authMiddleware,placeOrder);
orderRouter.post("/status",updateStatus);
orderRouter.post("/verify",verifyOrder);
orderRouter.get("/analytics/today", getTodayOrders);
orderRouter.get("/analytics/yesterday", getLastDayOrders);

export default orderRouter;