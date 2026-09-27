import express from "express"
import cors from "cors"
import connectDB from "./config/db"
import dotenv from "dotenv"
import urlRoutes from "./routes/url.routes"
import { redirectToOriginalUrl } from "./controllers/url.controller"
import asyncHandler from "./utils/asyncHandler"
import errorMiddleware from "./middleware/error.middleware"
import authRoutes from "./routes/auth.routes";
import cookieParser from "cookie-parser"
dotenv.config()

const app = express()

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.get('api/health',(req,res)=>{
  res.json({
    message:"Health ata"
  })
})
app.use(cookieParser())
app.use(express.json())
app.use("/api/urls",urlRoutes);
app.use("/api/auth",authRoutes)
app.get("/:shortCode",asyncHandler(redirectToOriginalUrl))
app.use(errorMiddleware);

const PORT = process.env.PORT || 5000;

(async()=>{
  await connectDB();
  app.listen(PORT,()=>{
    console.log(`Server is running on ${PORT}`)
  })
})()