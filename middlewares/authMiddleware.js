import JWT from 'jsonwebtoken';

const requireAuth = (req,resp,next)=>{
	try{
		// Get Token 
		const token = req.headers['authorization'].split(" ")[1];		
		JWT.verify(token,process.env.JWT_SECRET,(error,decode)=>{
			if(error){
				return resp.status(401).send({
					success : false,
					message : "Unauthorized user",
				});
			}else{				
				  req.user = decode;   
				  req.userId = decode.id; 
				  next();
			}
		});

	}catch(error){
		console.log(error);
		resp.status(500).send({
			success : false,
			message : 'Please Provide the Auth Token',
			error,
		});
	}

}

export default requireAuth;