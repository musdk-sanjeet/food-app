import userModel from '../models/userModel.js';
import bcrypt from 'bcryptjs';
import JWT from 'jsonwebtoken';

export const registerController = async(req,resp)=>{
	try{
		const {username, email, password, phone, address, answer } = req.body;

		// valiadtion 
		if(!username || !email || !password || !phone || !address || !answer){
			return resp.status(500).send({
				success : false,
				message : 'Please field all fields!'
			});
		}

		// Check user exists or not!
		const existinguser = await userModel.findOne({email});
		if(existinguser){
			return resp.status(500).send({
				message : false,
				message : 'User already existings',
			});
		}

		// Hashing Password 
		var salt = bcrypt.genSaltSync(10);
		const hashPassword = await bcrypt.hash(password,salt);
		// Create a new user 
		const user = await userModel.create({
			username,
			email,
			password: hashPassword,
			phone,
			address,
			answer,
		});
		resp.status(201).send({
			success : true,
			message : 'User is resgistered successfully!',
			user,
		})

	}catch(error){
		console.log(err);
		resp.status(500).send({
			success : false,
			message : 'Error in register API',
			error
		});
	}

}

// Login Controller
export const loginController = async (req, resp) => {
  try {
    const { email, password } = req.body;
    // Validation
    if (!email || !password) {
      return resp.status(400).send({
        success: false,
        message: 'Please fill all the fields',
      });
    }

    // Check user
    const user = await userModel.findOne({ email });
    if (!user) {
      return resp.status(404).send({
        success: false,
        message: 'User not found!',
      });
    }

    // Compare password
    const isMatch = await bcrypt.compare(password, user.password);   
    if (!isMatch) {
      return resp.status(401).send({
        success: false,
        message: 'Invalid credentials!',
      });
    }

    // Json Token (sign for encrypt and decrypt for verify)
    const token = JWT.sign({id : user._id},process.env.JWT_SECRET,{
    	expiresIn : "5d",
    });

    
    // Hide password
    // user.password = undefined;

    return resp.status(200).send({
      success: true,
      message: 'Login Successfully',
      token,
      user,
      
    });

  } catch (err) {
    console.log(err);
    return resp.status(500).send({
      success: false,
      message: 'Login Credential failed',
      error: err.message,
    });
  }
};

