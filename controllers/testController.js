const testUserController = (req,resp)=>{
	try{
		resp.status(200).send("<h3>Test User Api data</h3>");
	}catch(err){
		console.log('Error in test API :'+err);
	}

}

export default testUserController;