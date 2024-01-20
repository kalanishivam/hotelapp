import { Schema , model } from "mongoose";

const hotelSchema = new Schema({
    name : {
        type : String,
        rquired : true
    },
    city : {
        type : true
    },
    Stars : {
        type : Number,
    },
    Rooms : {
        type : Number
    }
})


const hotel = model('hotels'  , hotelSchema);
export default hotel;