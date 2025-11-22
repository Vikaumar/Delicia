import express from 'express';
import { loginUser, registerUser, updateAddress ,getUserAddress , updateProfileInfo , changePassword , uploadAvatar ,getUserProfile} from '../controllers/userController.js';
import authMiddleware from '../middleware/auth.js';
import upload from '../middleware/upload.js';

const userRouter = express.Router();

userRouter.post("/register", registerUser);
userRouter.post("/login", loginUser);

userRouter.post("/upload-avatar", authMiddleware, upload.single("avatar"), uploadAvatar);
userRouter.put("/update-address",authMiddleware, updateAddress);
userRouter.get('/useraddresses', authMiddleware, getUserAddress);
userRouter.put("/updateprofile", authMiddleware, updateProfileInfo);
userRouter.put("/changepassword", authMiddleware, changePassword);
userRouter.get("/profile", authMiddleware, getUserProfile);

export default userRouter;
