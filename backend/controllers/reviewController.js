import reviews from "../models/reviews.js";


export const addReview = async(req, res)=>{
    try{
        const {review , stars, userId, hotelId}= req.body;
       const reviewDetails=  await reviews.create({
            review : review,
            place : hotelId,
            name : userId,
            stars : stars
        })
        ;(await reviewDetails.populate('hotels')).populate('users')

    }catch(error){
        console.log(`error in add review : ${error.message}`)
        res.status(500).json({error : "INTERNAL SERVER ERROR"})
    }
}