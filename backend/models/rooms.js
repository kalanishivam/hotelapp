import { Schema, model } from "mongoose";

const roomsSchema = new Schema({
    roomNumber : {
        type : Number,
        rquired : true
    },
    isAvailable : {
        type : Boolean,
        required : true,
        default : true
    },
    Hotel : {
        type : Schema.Types.ObjectId,
        ref : "hotels"
    }

})