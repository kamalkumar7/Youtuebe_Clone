import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRoutes from "./routes/users.routes.js";
import videoRoutes from './routes/videos.routes.js'
import commentRoutes from './routes/comments.routes.js'
import authRoutes from './routes/auth.routes.js'
import bodyParser from 'body-parser'
import cookieParser from "cookie-parser";
dotenv.config();
const app = express();

app.use((err, req, res, next) => {

    const status = err.status || 500;
    const message = err.message || "Something went wrong!";
    return res.status(status).json({
      success: false,
      status,
      message,
    });
  });

app.listen(4000,()=>{
    console.log("listening on Port 4000");
})

app.use(cookieParser())
app.use(bodyParser.json())
app.use("/api/users", userRoutes);
app.use('/api/auth',authRoutes);
app.use('/api/comments',commentRoutes);
app.use('/api/videos',videoRoutes);

mongoose.set('strictQuery', false);
const connectDB = () => {
    mongoose.connect(process.env.MONGO_URL).then(() => {
        console.log("Connected to DataBase");
      }).catch((err) => 
      {
        throw err;
      });
  };

  connectDB();