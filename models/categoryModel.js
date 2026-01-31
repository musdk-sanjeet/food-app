import mongoose from 'mongoose';

const categorySchema = new mongoose.Schema(
{
	title : {
		type : String,
		required : [true,"Category title is required!"],
	},

	imageurl :{
		type : String,
		default : "https://image.similarpng.com/very-thumbnail/2021/09/Good-food-logo-design-on-transparent-background-PNG.png",
	},
},{timestamps : true});

export default mongoose.model('category',categorySchema);