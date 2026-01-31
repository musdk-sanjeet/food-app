import express from 'express';
import requireAuth from '../middlewares/authMiddleware.js';
import {createRestController,getAllRestController,getRestByIdController,deleteRestController} from '../controllers/resturantController.js';


const resRoute = express.Router();

// Create Resturant 
	resRoute.post('/create',requireAuth,createRestController);

// Get All Resturant 
	resRoute.get('/getall',getAllRestController);

// Get specific Resturant 
	resRoute.get('/get/:id',getRestByIdController);

// Delete Resturant 
	resRoute.delete('/delete/:id',requireAuth,deleteRestController);	

export default resRoute;
