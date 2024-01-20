import reservation from "../models/reservation.js";
import users from "../models/users.js";


export const createReservation = async(req, res)=>{
    try{
        const {  email } = req.body;
        const userInfo = await users.findOne({email})
        reservation.create({
            user : userInfo._id,
            roomNumber : 12,
            checkInDate : 12,
            checkOutDate: 12
        })
    }catch(error){
        console.log(`error in create reservation : ${error.message}`);
        res.status(500).json({error : 'INTERNAL SERVER ERROR'})
    }
}


export const getAllreservations = async(req, res)=>{
    try{
       const allReservations = await reservation.find({}).populate('users');
       return res.status(201).json({allReservations : allReservations});
    }catch(error){
        console.log(`error in get all resevatoin : ${error.message}`);
        return res.status(500).json({error : "INTERNAL SERVER ERROR"})
    }
}


export const getOneReservation = async (req, res)=>{
    try{
        const { email , name} = req.body;
        const reservationDetails = await reservation.findOne({email}).populate('users')
        if(!reservationDetails){
            return res.staus(403).json({error : "NO SUCH RESERVATION FOUND"});
        }else{
            return res.status(200).json({reservationDetails : reservationDetails})
        }
    }catch(error){
        console.log(`error in get one reservation : ${error.message}`)
        return res.status(500).json({error: "INTERNAL SERVER ERROR"})
    }
}

export const cancelReservation = async(req, res)=>{
    try{
        const { reservationId, email } = req.body;
        const reservationDetails = await reservation.deleteOne({reservationId});
        if(!reservationDetails){
            return res.status(403).json({error : "NO SUCH RECORD FOUND"});
        }else{
            return res.status(203).json({message : "SUCCESSFULLY DELETED RESERVATION"});    
        }
        
    }catch(error){
        console.log(`error in cancel reservation : ${error.message}`);
        return res.status(500).json({error : "INTERNAL SERVERE ERROR"})
    }
}

