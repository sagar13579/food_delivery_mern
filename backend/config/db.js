import mongoose from "mongoose";

export const  connectDB = async () =>{
    await mongoose.connect(process.env.MONGODB_URL).then(()=>console.log("DB Connected"))
}

// add your mongoDB connection string above.
// Do not use '@' symbol in your database user's password else it will show an error.