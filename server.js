import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import router from './routes/testRoutes.js';
import authrouter from './routes/authRoutes.js';
import userRouter from './routes/userRoutes.js';
import resRoute from './routes/resturantRoutes.js';
import catrouter from './routes/categoryRoutes.js';
import foodRouter from './routes/foodRoutes.js';
import connect from './config/dbconfig.js';
import dotenv from 'dotenv';

// check db connection 
dotenv.config()
connect();

const app = express();

//Middleware
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

// Import Routes
app.use('/api/v1/test',router);
app.use('/api/v1/auth',authrouter);
app.use('/api/v1/user',userRouter);
app.use('/api/v1/resturant',resRoute);
app.use('/api/v1/category',catrouter);
app.use('/api/v1/food',foodRouter);

app.get('/',(req,resp)=>{
	return resp.status(200).send('<h3>Welcome to food server</h3>');
});


const PORT = process.env.PORT || 5000;
app.listen(PORT,function(){
	console.log(`Server is running on PORT No. ${PORT}`);
});