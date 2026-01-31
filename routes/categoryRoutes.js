import express from 'express';
import requireAuth from '../middlewares/authMiddleware.js';
import {createCatController,getCatController,getCatByIdController,updateCatController,deleteCatController} from '../controllers/categoryController.js';

const catrouter = express.Router();

// Create Category 
catrouter.post('/create',requireAuth,createCatController);

// getall Category 
catrouter.get('/getcategory',getCatController);

// get specific Category 
catrouter.get('/get/:id',getCatByIdController);

// Update category 
catrouter.put('/update/:id', requireAuth, updateCatController);

// delete category 
catrouter.delete('/delete/:id', requireAuth, deleteCatController);


export default catrouter;