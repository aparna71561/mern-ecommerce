require('dotenv').config()
const mongoose=require("mongoose")

exports.connectToDB=async()=>{
    try {
        await mongoose.connect(process.env.MONGO_URI)
        console.log('connected to DB sucessfully');
    } catch (error) {
        console.log(error);
    }
}