import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
	username :{
		type : String,
		required : [true,'Username is required!'],
		trim : true,
	},
	email : {
		type : String,
		required : [true, "Email id is required!"],
		unique : true,
		lowercase : true,
	},
	password : {
		type : String,
		required : [true,"Password is required!"],
	},
	address : {
		type : Array,
		required : [true,"Address is required!"],
	},
	phone : {
		type : String,
		required : [true, 'Phone number is required!'],
	},
	usertype : {
		type : String,
		required : [true, "Usertype is required!"],
		default : 'client',
		enum : ['client','admin','vendor','driver'],
	},
	profile : {
		type : String,
		default : "https://cdn.pixabay.com/photo/2020/07/01/12/58/icon-5359553_640.png",
	},
	answer : {
		type : String,
		required : [true, 'Answer is required!'],
	},
  },
	{timestamps : true}	
);

export default mongoose.model('user',userSchema);
