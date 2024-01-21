import { Schema, model } from "mongoose";

const roomsSchema = new Schema({
    roomNumber : {
        type : Number,
        required : true
    },
    isAvailable : {
        type : Boolean,
        required : true,
        default : true
    },
    hotel : {
        type : Schema.Types.ObjectId,
        ref : "hotels"
    },
    price : {
        type : Number,
        required : true
    },
    bookeduser : {
        type : Schema.Types.ObjectId,
        ref : 'users' , 
        default : undefined
    }

});


const rooms = model("rooms" , roomsSchema);
export default rooms;