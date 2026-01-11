import mongoose from "mongoose";

export const  connectDB = async () =>{
    await mongoose.connect(process.env.MONGODB_URL).then(()=>console.log("DB Connected"))
}

// mongodb+srv://dinkoghosh:<db_password>@cluster0.5526d.mongodb.net/?appName=Cluster0

// add your mongoDB connection string above.
// Do not use '@' symbol in your database user's password else it will show an error.