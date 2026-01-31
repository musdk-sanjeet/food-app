import userModel from '../models/userModel.js';

const adminAuth = async(req,resp,next)=>{
	try{
		const user = await userModel.findById({_id : req.user.id});
		if(user.usertype !== 'admin'){
			return resp.status(404).send({
				success:false,
				message : 'Only admin is allowed!',
			});
		}else{
			next();
		}		
	}catch(error){
		console.log(error);
		resp.status(500).send({
			success : false,
			message : 'Un-Authorized Access!',
			error,
		});
	}
}
export default adminAuth;