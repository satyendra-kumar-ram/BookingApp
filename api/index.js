import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import authRoute from './routes/auth.js';
import usersRoute from './routes/users.js';
import hotelsRoute from './routes/hotels.js';
import roomsRoute from './routes/rooms.js';
import cookieParser from "cookie-parser";
import cors from "cors";

dotenv.config();
const app = express();


const connect = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL,{ useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false});
        //await mongoose.connect(process.env.MONGO_URL);
        console.log('connected to db');
    } catch (error) {
        throw(error);
    }
};
// mongoose.connection.on('disconnected',()=>{
//     console.log('mongodb disconnected');
// });
// mongoose.connection.on('connected',()=>{
//     console.log('mongodb connected');
// });

//middlewares
app.use(cors())
app.use(cookieParser())
app.use(express.json());
app.use('/api/auth',authRoute);
app.use('/api/users',usersRoute);
app.use('/api/hotels',hotelsRoute);
app.use('/api/rooms',roomsRoute);


app.use((err,req,res,next)=>{
    if(err){
        const errorStatus = err.status || 500;
        const errorMessage = err.message || "Someting went wrong";
        return res.status(errorStatus).json({
            success:false,
            status:errorStatus,
            message:errorMessage,
            stack:err.stack
            
        });
    }
    next();
});

const port = process.env.port||'8000';
app.listen(port,()=>{
    connect();
    console.log(`server connected to port:${port}`);
})