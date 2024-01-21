import rooms from "../models/rooms";
import users from "../models/users";



export const roomIsAvailable = async (req, res)=>{
    try{
        const {roomNumber, hotelName} = req.body;
        const roomsAvailable = await rooms.findOne({$and : [{'hotel.name' : hotelName}, {roomNumber : roomNumber}]});
        if (!roomsAvailable) {
            return res.status(404).json({ error: "Room not found" });
        }
        if(roomsAvailable.isAvailable == true){
            return res.status(201).json({message : "ROOM AVAILABLE" });
        }else{
            return res.status(404).json({error : "NO SUCH AVAILBEL ROOM"})
        }

    }catch(error){
        console.log(`error in get available rooms : ${error.message}`)
    }
}


export const bookRoom = async(req , res)=>{
    try{
        const {roomNumber , hotelName, userName} = req.body;
        const userDetails = users.findOne({name : userName});
        const roomDetails = await rooms.findOne({$and : [{'hotel.name' : hotelName}, {roomNumber : roomNumber}]});
        if(roomDetails.isAvailable){
            await roomDetails.updateOne({_id : roomDetails._id},{ $set : {isAvailable : false, bookeduser : userDetails._id}});
           const updatedRoom = rooms.findById(roomDetails._id).populate({
            path : 'bookeduser',
            select : '-passwordResetToken -passwordResetTokenExpire -password'
           })
            return res.status(200).json({message : "ROOM BOOKED SUCCESSFULLY"})
        }else{  
            return res.status(404).json({error : "ROOM NOT AVAILABLE"})
        }
    }catch(error){
        console.log(`error in booking room : ${error.message}`)
        return res.status(500).json({error : "INTERNAL SERVER ERROR "})
    }
}


