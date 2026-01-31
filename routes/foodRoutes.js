import express from 'express';
import requireAuth from '../middlewares/authMiddleware.js';
import adminAuth from '../middlewares/adminMiddleware.js';
import {
	createfoodController,
	getallfoodController,
	getfoodController,
	updatefoodController,
	deletefoodController,
	placeorderController,
	orderStatusController
	} 
	from '../controllers/foodController.js';


const foodRouter = express.Router();
// Create 
foodRouter.post('/create',requireAuth,createfoodController);
// getall 
foodRouter.get('/getall',getallfoodController);
// get specific
foodRouter.get('/get/:id',getfoodController);
// Update specific
foodRouter.put('/update/:id',requireAuth,updatefoodController);
// delete specific
foodRouter.delete('/delete/:id',requireAuth, deletefoodController);


// Place Order 
foodRouter.post('/placeorder',requireAuth, placeorderController);
// Chnage Order status 
foodRouter.post('/orderstatus/:id',requireAuth,adminAuth, orderStatusController);

export default foodRouter;