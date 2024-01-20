import { Schema, model } from "mongoose";


const reservationSchema = new Schema({
    user : {
        type : Schema.Types.ObjectId,
        ref : 'users',
        required : true
    },
    Hotel : {
        type : Schema.Types.ObjectId,
        required : true
    },
    roomNumber : {
        type : String,
        required : true,
    },
    checkInDate : {
        type : String,
        required : true
    },
    checkOutDate : {
        type  : String,
        required : true
    }
});


const reservation  = model("Reservations", reservationSchema);
export default reservation;