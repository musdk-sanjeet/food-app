import foodModel from '../models/foodModels.js';
import orderModel from '../models/orderModel.js';

// Create Food Controller
export const createfoodController =async(req,resp)=>{
	try{
		const {
			  title,
		      description,
		      price,
		      imageurl,
		      foodtags,
		      category,
		      code,
		      isavailable,
		      resturant,
		      rating
			} = req.body;

		if(!title || !description || !price || !resturant){
			return resp.status(404).send({
				success : false,		
				message : 'Please fill all required fields!',
			});
		}

		const food = new foodModel({
			  title,
		      description,
		      price,
		      imageurl,
		      foodtags,
		      category,
		      code,
		      isavailable,
		      resturant,
		      rating
		});
		await food.save();

		resp.status(201).send({
			success : true,
			message : 'New food is created!',
			food,
		});

	}catch(error){
		console.log(error);
		resp.status(500).send({
			success : false,
			message : 'Error in create food API',
			error,
		});
	}
}

// Get All food controller
export const getallfoodController =async(req,resp) =>{
	try{
		const food = await foodModel.find({});
		if(food.length ===0){
			return resp.status(404).send({
				success : false,
				message : 'No food Item founds!',
			});
		}

		resp.status(200).send({
			success : true,
			message : 'Found all foods!',
			totalfood : food.length,
			food,
		});
	}catch(error){
		console.log(error);
		resp.status(500).send({
			success : false,
			message : 'Error in getall food API',
			error,
		});
	}
}

// Get specific food controller
export const getfoodController =async(req,resp) =>{
	try{
		const food = await foodModel.findById({_id :req.params.id});
		if(!food){
			return resp.status(404).send({
				success : false,
				message : 'No food Item founds!',
			});
		}
		resp.status(200).send({
			success : true,
			message : 'Found foods!',			
			food,
		});
	}catch(error){
		console.log(error);
		resp.status(500).send({
			success : false,
			message : 'Error in get food API',
			error,
		});
	}
}

// Update food controller
export const updatefoodController =async(req,resp) =>{
	try{
		const foodId = await foodModel.findById({_id :req.params.id});
		if(!foodId){
			return resp.status(404).send({
				success : false,
				message : 'No food Item founds!',
			});
		}
		const {
			  title,
		      description,
		      price,
		      imageurl,
		      foodtags,
		      category,
		      code,
		      isavailable,
		      resturant,
		      rating
			} = req.body;
		const updatefood = await foodModel.findByIdAndUpdate(
		foodId,	
		{
			title,
		    description,
		    price,
		    imageurl,
		    foodtags,
		    category,
		    code,
		    isavailable,
		    resturant,
		    rating
		},
		{new : true}
		);  	

		resp.status(200).send({
			success : true,
			message : 'food update successfully!',			
			updatefood,
		});
	}catch(error){
		console.log(error);
		resp.status(500).send({
			success : false,
			message : 'Error in Update food API',
			error,
		});
	}
}


// delete food API
export const deletefoodController = async(req,resp)=>{
	try{
		const foodId = await foodModel.findById({_id :req.params.id});
		if(!foodId){
			return resp.status(404).send({
				success : false,
				message : 'No food Item founds!',
			});
		}
		await foodModel.findByIdAndDelete(foodId);
		resp.status(200).send({
			success : true,
			message : 'food deleted successfully!',			
			updatefood,
		});

	}catch(error){
		console.log(error);
		resp.status(500).send({
			success : false,
			message : 'Error in deleted food API',
			error,
		});
	}
}

// Place Order 
export const placeorderController = async(req,resp)=>{
	try{
		let {cart,payment} = req.body;
		if(!cart){
			return resp.status(500).send({
				success : false,
				message : 'Please Add food inside the cart',
			});
		}

		let total = 0;
		cart.map((item)=>{
			total += item.price;
		});

		let newOrder = new orderModel({
			foods : cart,
			payment : total,
			buyer : req.body.id,
		});

		await newOrder.save();
		resp.status(200).send({
			success : true,
			message : 'Your Order is placed!',
			newOrder,
		});
	}catch(error){
		console.log(error);
		resp.status(500).send({
			success : false,
			message : 'Error in place order food API',
			error,
		});
	}
}

// Change order Status 
export const orderStatusController = async(req,resp)=>{
	try{
		const orderId = req.params.id;
		console.log(orderId)
		if (!orderId) {
	      return res.status(404).send({
	        success: false,
	        message: "Please Provide valid order id",
	      });
    	}

    	const {status} = req.body;
    	
    	const order = await orderModel.findByIdAndUpdate(orderId,{ status },{ new: true });

    	resp.status(200).send({
    		success : true,
    		message : 'Order status change successfully!',

    	})
	}catch(error){
		console.log(error);
		resp.status(500).send({
			success : false,
			message : 'Error in change to Order status API!',
			error,
		});
	}
}
