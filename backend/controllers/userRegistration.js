import users from "../models/users.js";
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { sendEmail } from "../utils/emailHandles.js";
const jwt_secret = "samplesecret";

export const handleSignup  = async (req, res)=>{
try{
    const {name, password, email, location, phone} = req.body;
    if(!email || !password){
        return res.status(400).json({error : "PLEASE PROVIDE ALL DETAILS"})
    }
    const existinUser = await users.findOne({email});
    if(!existinUser){
        const salt = await  bcrypt.genSalt(10);
        const hashedPassword  = await  bcrypt.hash(password , salt);
        await users.create({
            name : name,
            password : hashedPassword,
            email : email,
            location : location,
            phone : phone
        })
        console.log(`user created successfully`); // to be removed later
        const paylaod = {
            user : {
                email : email,
                name : name,
                phone : phone
            }
        }
        const authToken = jwt.sign(paylaod , jwt_secret);

        return res.status(201).json({authToken : authToken , user : paylaod})
    }else{
        return res.status(400).json({error: "USER ALREADY EXIST. PLEASE LOGIN"})
    }

}catch(error){
    console.log(`error in handle singup : ${error.message}`)
    res.send(500).json({error : "INTERNAL SERVER ERROR"})
}
}


export const handleLogin = async (req , res)=>{
    try{
        const {email , password} = req.body;
        const existingUser = await users.findOne({email})
        if(!existingUser){
            return res.status(400).json({error : "PLEASE LOGIN WITH CORRECT USER CREDITIANLS"})
        }else{
            const passwordComapre = bcrypt.compare(password , existingUser.password);
            if(!passwordComapre){
                return res.status(400).json({error : "INVALID USER CREDENTIALS"})
            }else{
                const paylaod = {
                    user:{
                        email : email,
                        name : existingUser.name,
                        phone : existingUser.phone
                    }
                }
                const authToken = jwt.sign(paylaod , jwt_secret);
                return res.status(201).json({authToken : authToken , user : paylaod})
            }
        }
    }catch(error){
        console.log(`error in handle login : ${error.message}`)
        return res.status(500).json({error : "INTERNAL SERVER ERROR"})
    }
}


export const forgetPassword  = async (req, res)=>{
    try{
        const {email} = req.body;
        const existingUser = await users.findOne({email});
        if(!existingUser){
            return res.status(400).json({error : "NO SUCH USER EXIST! PLEASE CREATE AN ACCOUNT BEFORE TRYING TO SIGN IN"})
        }else{
            const resetToken = existingUser.createResetToken();
            const resetURL = `${req.protocol}://${req.get('host')}/api/resetpassword/${resetToken}`
            const message = `please click the link to reset the password. Link is valid for only 10 minutes \n\n. ${message}`
            await existingUser.save({validateBeforeSave : false});
            try{
                await sendEmail({
                    email : existingUser.email,
                    subject : 'Password cahnge request',
                    message : message
                })
                return res.status(200).json({message : "Password reset mail sent to the email address"})
            }catch(error){
                existingUser.passwordResetToken = undefined;
                existingUser.passwordResetTokenExpire = undefined;
                existingUser.save({validateBeforeSave : false});
                return res.status(5000).json({error : "There was an error sending email. Please send again later"})
            }
        }

    }catch(error){
        console.log(`error in forget password : ${error.message}`)
    }
}