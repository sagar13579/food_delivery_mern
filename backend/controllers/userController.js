import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import validator from "validator";
import userModel from "../models/userModel.js";

//create token
const createToken = (id) => {
    return jwt.sign({id}, process.env.JWT_SECRET);
}

//login user
const loginUser = async (req,res) => {
    const {email, password} = req.body;
    try{
        const user = await userModel.findOne({email})

        if(!user){
            return res.json({success:false,message: "User does not exist"})
        }

        const isMatch = await bcrypt.compare(password, user.password)

        if(!isMatch){
            return res.json({success:false,message: "Invalid credentials"})
        }

        const token = createToken(user._id)
        res.json({success:true,token})
    } catch (error) {
        console.log(error);
        res.json({success:false,message:"Error"})
    }
}

//register user
const registerUser = async (req,res) => {
    const {name, email, password} = req.body;
    try{
        //check if user already exists
        const exists = await userModel.findOne({email})
        if(exists){
            return res.json({success:false,message: "User already exists"})
        }

        // validating email format & strong password
        if(!validator.isEmail(email)){
            return res.json({success:false,message: "Please enter a valid email"})
        }
        if(password.length<8){
            return res.json({success:false,message: "Please enter a strong password"})
        }

        // hashing user password
        const salt = await bcrypt.genSalt(10); // the more no. round the more time it will take
        const hashedPassword = await bcrypt.hash(password, salt)

        const newUser = new userModel({name, email, password: hashedPassword});
        const user = await newUser.save();
        const token = createToken(user._id)
        res.json({success:true,token})

    } catch(error){
        console.log(error);
        res.json({success:false,message:"Error"})
    }
}

const getUserProfile = async (req, res) => {
    try {
        let userData = await userModel.findById(req.body.userId);
        return res.status(200).json({success:true, name:userData.name, email:userData.email});
    } catch (error) {
        console.log(error);
        return res.status(500).json({success:false,message:"Error"});
    }
}

const getUserProfileData = async (req, res) => {
    try {
        let userData = await userModel.findById(req.body.userId);
        const userRelatedData = {
            name: userData.name,
            email: userData.email,
            phone: userData.phone,
            street: userData.address.street,
            city: userData.address.city,
            state: userData.address.state,
            zipcode: userData.address.zipcode,
            country: userData.address.country
        }
        return res.status(200).json({success:true, data:userRelatedData});
    } catch (error) {
        console.log(error);
        return res.status(500).json({success:false,message:"Error"});
    }
}

const updateProfile = async (req, res) => {
  try {
    const userId = req.body.userId; // from auth middleware

    const { phone, address } = req.body;

    const newRecord = await userModel.findByIdAndUpdate(
      userId,
      { phone, address }
    );

    return res.status(200).json({ success: true, data: newRecord });
  } catch (error) {
    return res.status(500).json({ success: false, message: "Profile update failed" });
  }
};

export {loginUser, registerUser, getUserProfile, updateProfile, getUserProfileData}