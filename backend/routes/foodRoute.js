import express from 'express';
import { addFood, listFood, removeFood } from '../controllers/foodController.js';
import multer from 'multer';
import authorizeRoles from "../middleware/role.js"
import authMiddleware from '../middleware/auth.js';

const foodRouter = express.Router();

//Image Storage Engine (Saving Image to uploads folder & rename it)
const storage = multer.diskStorage({
    destination: 'uploads',
    filename: (req, file, cb) => {
        return cb(null,`${Date.now()}${file.originalname}`);
    }
})

const upload = multer({ storage: storage})

foodRouter.get("/list", listFood);
foodRouter.post("/add",authMiddleware, authorizeRoles("admin"),upload.single('image'),addFood);
foodRouter.post("/remove",authMiddleware, authorizeRoles("admin"),removeFood);

export default foodRouter;