import mongoose from 'mongoose';

const ordersSchema = new mongoose.Schema(
{
	foods :[{
			type : mongoose.Schema.Types.ObjectId,
			ref  : 'food', 
			required : true,
		}],
	payment :{
		type : Number,
		required : true,
	},
	buyer : {
		type : mongoose.Schema.Types.ObjectId,
		ref  : 'user', 
		required : true,
	},
	status :{
		type : String,
		enum : ['prepareing','prepared','on the way','delivered'],
		default : 'prepareing',
	}

},{timestamps:true}
);

export default mongoose.model('order',ordersSchema);