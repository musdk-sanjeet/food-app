import express from 'express';
import {getUserController,updateUserController,resetPassword,updatePassword,deleteUserProfile} from '../controllers/userController.js';
import requireAuth from '../middlewares/authMiddleware.js';

const userRouter = express.Router();

// Get user Data
userRouter.get('/getuser',requireAuth,getUserController);

// Update User Data
userRouter.put('/updateuser',requireAuth,updateUserController);

// Reset User Password
userRouter.post('/resetpassword',requireAuth,resetPassword);

// Update User Password
userRouter.post('/updatepassword',requireAuth,updatePassword);

// Delete User Password
userRouter.delete('/deleteuser/:id',requireAuth,deleteUserProfile);

export default userRouter;