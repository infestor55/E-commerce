import express from 'express';
import  colors from 'colors';
import dotenv from "dotenv";
import morgan from 'morgan';
import connectDB from './config/db.js';
import authRoutes from './routes/authRoute.js';
import categoryRoutes from './routes/categoryRoute.js';

//configure env
dotenv.config();

//database config
connectDB();

//rest object 
const app = express();

//middlewares
app.use(express.json());
app.use(morgan('dev'));
app.use(express.urlencoded({extended: false}));

//routes
app.use('/api', authRoutes);
app.use('/api/category', categoryRoutes );

//rest api
app.get('/',(req,res)=>{
    res.send(
         '<h1>Welcome to BEM ecommerce app</h1>'
    )
})
//PORT
const PORT = process.env.PORT || 8080 
//run listen 
app.listen(PORT,()=>{
    console.log(`Server running on ${process.env.DEV_MODE} mode on port ${PORT}`.bgCyan.white)
})