import userModel from '../models/userModel.js';
import bcrypt from 'bcryptjs';

export const getUserController = async(req,resp) =>{
	try{
		// Find user	
		const user = await userModel.findById({_id : req.user.id});
		if(!user){
			return resp.status(404).send({
				success : false,
				message : "User Not found!",
			});
		}
		// Hide Password
		user.password = undefined
		resp.status(200).send({
			success : true,
			message : "User get successfully!",
			user,
		});

	}catch(error){
		console.log(error);
		resp.status(500).send({
			success : false,
			message : 'Error in Get User API',
			error,
		});
	}	
}

export const updateUserController = async(req,resp)=>{
	try{
		// Find User
		const user = await userModel.findById({_id : req.user.id});
		console.log(user);
		// Check Validation
		if(!user){
			return resp.status(404).send({
				success : false,
				message : "User Not found!",
			});
		}
		// Update 
		const {username,phone,address} = req.body;
		if(username) user.username = username;
		if(phone) user.phone = phone;
		if(address) user.address = address;

		await user.save();
		resp.status(200).send({
			success : true,
			message : "User Update successfully!",
			user,
		});

	}catch(error){
		console.log(error);
		resp.status('500').status({
			success : false,
			message : 'Error in Update API',
			error,
		});
	}
}

 // Reset USER PASSWORD
export const resetPassword = async(req, resp)=>{
	try{
		const {email,newPassword, answer} = req.body;
		if(!email || !newPassword || !answer){
			return resp.status(404).send({
				success : false,
				message : "Please Privcide all fields!",
			});
		}

	   // find 
	   const user = await userModel.findOne({email,answer});

	   if(!user){
	   	    return resp.status(404).send({
				success : false,
				message : "User Not found and invalid answer!",
			});
	   } 
	   // Hashing Password

	   var salt = bcrypt.genSaltSync(10);
	   const hashPassword = await bcrypt.hash(newPassword,salt);
	   user.password = hashPassword;
	   await user.save();

	   resp.status(200).send({
	   	success : true,
	   	message : 'Password Reset successfully!',
	   });

	}catch(error){
		console.log(error);
		resp.status(500).send({
			success : false,
			message : 'Error in Reset password API!',
			error,
		});
	}
}

// Update User Password
export const updatePassword =async(req,resp)=>{
	try{
		// Find user 
		const user = await userModel.findById({_id : req.user.id});
		if(!user){		
			return resp.status(404).send({
				success : false,
				message : "User Not found!",
			});		
		}

		// get Data from user
		const {oldPassword,newPassword} = req.body;
		if(!oldPassword || !newPassword){
			return resp.status(404).send({
				success : false,
				message : "Please provide old and new password!",
			});	
		}

		const isMatch = await bcrypt.compare(oldPassword,user.password);
		if(!isMatch){
			return resp.status(404).send({
				success : false,
				message : "Your old password is not match!",
			});	
		}
		// Hash Password 
		var salt = await bcrypt.genSaltSync(10);
		const hashPassword = await bcrypt.hash(newPassword,salt);
		user.password = hashPassword;
		await user.save();
	
		resp.status(200).send({
	      success: true,
	      message: "Password Updated successfully!",
	    });
	}catch(error){
		console.log(error);
		resp.status(500).send({
			success : false,
			message : 'Error in Update password API!',
			error,
		});
	}
}

export const deleteUserProfile = async (req,resp)=>{
	try{
		// find user 
		await userModel.findByIdAndDelete(req.params.id);
		return resp.status(200).send({
			success: true,
     		message: "Your account has been deleted",
		});
	}catch(error){
		console.log(error);
		resp.status(500).send({
			success : false,
			message : 'Error in deleted password API!',
			error,
		});
	}
}