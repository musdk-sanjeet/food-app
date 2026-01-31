import categoryModel from '../models/categoryModel.js';

// Create Category API
export const createCatController = async(req,resp)=>{
	try{
		const {title,imageurl} = req.body;
		if(!title){
			return resp.status(400).send({
				success : false,
				message : 'Please provide category title!',
			});
		} 

		const category = new categoryModel({title,imageurl});
		await category.save();
		resp.status(200).send({
			success: true,
			message : 'New category Inserted!',
			category,
		});

	}catch(error){
		console.log(error);
		resp.status(500).send({
			success : false,
			message : 'Error in crating category API!',
			error,
		});
	}
}
// Get Category API
export const getCatController = async(req,resp)=>{
	try{		
		const category = await categoryModel.find({});
		if(!category){
			return resp.status(400).send({
				success: false,
				message : 'Category Not found!',
			});
		}	
		resp.status(200).send({
			success: true,
			message : 'category found!',
			totalCat: category.length,
			category,
		});

	}catch(error){
		console.log(error);
		resp.status(500).send({
			success : false,
			message : 'Error in get category API!',
			error,
		});
	}
}
// Get Category API
export const getCatByIdController = async(req,resp)=>{
	try{		
		const category = await categoryModel.find({_id : req.params.id});
		if(!category){
			return resp.status(400).send({
				success: false,
				message : 'Category Not found!',
			});
		}	
		resp.status(200).send({
			success: true,
			message : 'category found!',	
			category,
		});

	}catch(error){
		console.log(error);
		resp.status(500).send({
			success : false,
			message : 'Error in get category API!',
			error,
		});
	}
}

// Update Category API
export const updateCatController = async (req, resp) => {
  try {
    const { id } = req.params;
    const { title, imageurl } = req.body;
    const updateCategory = await categoryModel.findByIdAndUpdate(
      id,
      { title, imageurl },
      { new: true }
    );
    if (!updateCategory) {
      return resp.status(404).send({
        success: false,
        message: "No Category Found",
      });
    }
    resp.status(200).send({
      success: true,
      message: "Category Updated Successfully",
      category :updateCategory,
    });
  } catch (error) {
    console.log(error);
    resp.status(500).send({
      success: false,
      message: "Error in update category API!",
      error,
    });
  }
};

// delete Category API
export const deleteCatController = async (req, resp) => {
  try {
    const deleteCategory = await categoryModel.findByIdAndDelete({_id : req.params.id});
    if (!deleteCategory) {
      return resp.status(404).send({
        success: false,
        message: "No Category Found",
      });
    }
    resp.status(200).send({
      success: true,
      message: "Category deleted Successfully",
      category : deleteCategory,
    });
  } catch (error) {
    console.log(error);
    resp.status(500).send({
      success: false,
      message: "Error in delete category API!",
      error,
    });
  }
};
