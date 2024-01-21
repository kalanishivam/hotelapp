import { Schema, model } from "mongoose";

const reviewSchema = new Schema({
    place : {
        type : Schema.Types.ObjectId,
        ref : 'hotels',
        required : true
    },
    name: {
        type : Schema.Types.ObjectId,
        ref : 'users',
        required : true
    },
    review : {
        type : String,
    },
    Stars : {
        type : Number
    }
})

const reviews = model("reviews" , reviewSchema);
export default reviews;