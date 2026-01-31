import express from 'express';
import {registerController, loginController} from '../controllers/authController.js';

const authrouter = express.Router();

// Register POST Method
	authrouter.post('/register',registerController);
	authrouter.post('/login',loginController);

export default authrouter;