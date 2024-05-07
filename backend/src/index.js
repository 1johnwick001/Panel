import express from "express"
import dotenv from "dotenv"
import connectDB from "./db/dbConnection.js";
import adminRouter from "./routes/ApiRoutes.js";
import clientRoutes from './routes/ClientRoutes.js'
import cors from "cors"
import cookieParser from "cookie-parser"

dotenv.config({
    path:'./.env'
});

connectDB();

const app = express();

//to parse incoming request bodies with JSON payloads.
app.use(express.json());
app.use(cors());
app.use(cookieParser());
app.use(express.urlencoded());
app.use(express.static('uploads'));


//CONFIGURING ROUTES 
app.use(adminRouter) //routes for admins
app.use('/client',clientRoutes) //routes for clients


//CONFIGURING PORT NUMBER FROM .ENV FILE 
const port = process.env.PORT;


app.listen(port,()=>{
    console.log(`server listening on ${port}`);
})
