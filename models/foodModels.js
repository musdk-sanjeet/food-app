import mongoose from 'mongoose';

const foodSchema = new mongoose.Schema({
	title : {
		type : String,
		required : [true, 'Food title is required!'],
	},
	description : {
		type : String,
		required : [true, 'Food description is required!'],
	},
	price : {
		type : Number,
		required : [true, ' Food price is required!'],
	},
	imageurl : {
		type : String,
		default : 'https://image.similarpng.com/very-thumbnail/2021/09/Good-food-logo-design-on-transparent-background-PNG.png',
	},
	foodtags : {
		type : String,

	},
	category :{
		type : String,
	}, 

	code : {
		type : String,

	} ,
	isavailable : {
		type : Boolean,
		defa  : true,
	}, 
	resturant : {
		type : mongoose.Schema.Types.ObjectId,
		ref : 'resturant',
	},
	rating :{
		type : Number,
		default : 5,
		min : 1,
		max : 5,
	} ,
	ratingcount : {
		type : String,
	}

},{timestamps:true});

export default mongoose.model('food',foodSchema);