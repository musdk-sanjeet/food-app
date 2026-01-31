import restaurantModel from '../models/resturantModel.js';

// Create Resturant API
export const createRestController = async (req, resp) => {
  try {
    const {
      title,
      imageUrl,
      foods,
      time,
      pickup,
      delivery,
      isOpen,
      logoUrl,
      rating,
      ratingCount,
      code,
      coords,
    } = req.body;

    if (!title || !coords) {
      return resp.status(400).json({
        success: false,
        message: "Please provide title and address!",
      });
    }

    const newRestaurant = new restaurantModel({
      title,
      imageUrl,
      foods,
      time,
      pickup,
      delivery,
      isOpen,
      logoUrl,
      rating,
      ratingCount,
      code,
      coords,
    });

    await newRestaurant.save();

    resp.status(201).json({
      success: true,
      message: "New restaurant inserted successfully!",
      restaurant: newRestaurant,
    });
  } catch (error) {
    console.error(error);
    resp.status(500).json({
      success: false,
      message: "Error in Create Restaurant API!",
      error,
    });
  }
};

// Get All Restrurant
export const getAllRestController = async (req, resp) => {
  try {
  	const resturant = await restaurantModel.find({});
  	if(!resturant){
  		return resp.status(404).send({
	  		success: false,
	      	message: "No Restaurant Available!",	      
  		});
  	}
  	resp.status(200).send({
  		success: true,
	    message: "All Restaurant!",
	    resturant,
  	});
    
  } catch (error) {
    console.error(error);
    resp.status(500).json({
      success: false,
      message: "Error in getall Restaurant API!",
      error,
    });
  }
};

// Get Specific Resturant 
export const getRestByIdController = async (req, resp) => {
  try {
  	const resturant = await restaurantModel.findById({_id : req.params.id});
  	if(!resturant){
  		return resp.status(404).send({
	  		success: false,
	      	message: "No Restaurant Available!",	      
  		});
  	}
  	resp.status(200).send({
  		success: true,
	    message: "Restaurant found!",
	    resturant,
  	});
    
  } catch (error) {
    console.error(error);
    resp.status(500).json({
      success: false,
      message: "Error in get Restaurant API!",
      error,
    });
  }
};


// Get Specific Resturant 
export const deleteRestController = async (req, resp) => {
  try {
  	const resturant = await restaurantModel.findByIdAndDelete({_id : req.params.id});
  	if(!resturant){
  		return resp.status(404).send({
	  		success: false,
	      	message: "No Restaurant Available!",	      
  		});
  	}
  	resp.status(200).send({
  		success: true,
	    message: "Restaurant deleted!",	  
  	});
    
  } catch (error) {
    console.error(error);
    resp.status(500).json({
      success: false,
      message: "Error in delete Restaurant API!",
      error,
    });
  }
};
