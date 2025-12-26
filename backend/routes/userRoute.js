import express from 'express';
import { getUserProfile, getUserProfileData, loginUser,registerUser, updateProfile } from '../controllers/userController.js';
import authMiddleware from '../middleware/auth.js';
const userRouter = express.Router();

userRouter.post("/register", registerUser);
userRouter.post("/login", loginUser);
userRouter.get("/profile",authMiddleware, getUserProfile);
userRouter.get("/profile-data",authMiddleware, getUserProfileData);
userRouter.post("/profile/add",authMiddleware, updateProfile);

export default userRouter;