import { Schema , model } from "mongoose";
import crypto from 'crypto'

const userSchema = new Schema({
    name :{
        type : String,
        required : true
    },
    email : {
        type : String,
        required : true,
        unique : true
    },
    password :{
        type : String,
        required : true
    },
    location : {
        type : String,
    },
    phone : {
        type : Number,
    },
    passwordResetToken : String,
    passwordResetTokenExpire : Date

})

userSchema.methods.createResetPasswordToken = function(){
    const resetToken = crypto.randomBytes(32).toString('hex');
    
    this.passwordResetToken = crypto.createHash('sha256').update(resetToken).digest('hex');
    this.passwordResetTokenExpire = Date.now() + 600000;
    return resetToken;
}


const users = model("users" , userSchema);

export default users;