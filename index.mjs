//external packages
import express from "express"
import mongoose from "mongoose"
import cors from "cors"

//internal import

//Database connection
const MONGODB_URI = process.env.MONGODB_URI;
try {
    await mongoose.connect(MONGODB_URI);
    console.log('Connected to MongoDB');
} catch (err) {
    console.error('Failed to connect to MongoDB:', err);
}


//create express app
const app = express();

//use middlewares
app.use(express.json());
app.use(cors());

//listen for incoming request
const PORT = 5500;
app.listen(PORT, () => {console.log(`App is listening on port: ${PORT}`)});


