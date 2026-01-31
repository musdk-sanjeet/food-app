import mongoose from 'mongoose';

const url = process.env.MONGODB_URL;
const dbName = "food-app";

const connect = async ()=>{
	try{
		const conn = await mongoose.connect(url, {
	      dbName: dbName, 
	    });
		console.log(`database connected from : ${mongoose.connection.host}`);
	}catch(err){
		console.log(' connection error :'+err);
	}
}

export default connect;