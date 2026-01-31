import mongoose from 'mongoose';

const url = "mongodb+srv://japar84330_db_user:5Sg99Hs13ZwvjzyV@cluster0.yo1zamc.mongodb.net/?appName=Cluster0";
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