import mongoose from "mongoose"
import dotenv from "dotenv"


dotenv.config({
    path:'./.env'
})

//loading mongo url from dotenv files
const MONGO_URL = process.env.MONGO_URL;

//connection for connecting db with node

const connectDB = async () => {
    try {
        const connection = await mongoose.connect(`${MONGO_URL}`)
        console.log(`\n MONGODB connected sucessfully !!!!!! `);
    } catch (error) {
        console.log("mongoDB connection error, error while connecting to mongodb url",error);
    }
}

export default connectDB