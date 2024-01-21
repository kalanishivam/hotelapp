import hotel from "../models/hotel.js";
import reviews from "../models/reviews.js";
import users from "../models/users.js";


export const addReview = async(req, res)=>{
    try{
        const {review , stars, user, hotelName}= req.body;
        const userExists = await users.findOne({name : user})
        const hotelExists = await hotel.findOne({name : hotelName});
        if(!userExists || !hotelExists){
            return res.status(403).json({error : "USER OR HOTEL NOT FOUND"})
        }else{
       const reviewDetails=  await reviews.create({
            review : review,
            place : hotelExists._id,
            name : userExists._id,
            stars : stars
        })
    //    const populatedReviews = (await reviewDetails.populate({path : 'place', model : 'hotels'})).populate({path : 'name' , model : 'users'}).execPopulate();
       const populatedReviews = await reviews.populate(reviewDetails , [{path : 'place' , model : 'hotels'}, {path : 'name' , model : 'users'}])
       return res.status(201).json({review : populatedReviews})
    }

    }catch(error){
        console.log(`error in add review : ${error.message}`)
        res.status(500).json({error : "INTERNAL SERVER ERROR"})
    }
}


export const deleteReview = async(req,res)=>{
    try{
    const {user, hotelName} = req.body;
    const reviewToDelete = await reviews.findOne({name : user , 'place.name' : hotelName});
    if(!reviewToDelete){
        return res.status(404).json({error : "NU SUCH REVIEW FOUND"});
    }else{
        await reviewToDelete.remove();  
        return res.status(200).json({message : "review deleted successfully"})
    }
    }catch(error){
        console.log(`error in delete review : ${error.message}`);
        return res.status(500).json({error : "INTERNAL SERVER ERROR"})
    }
}