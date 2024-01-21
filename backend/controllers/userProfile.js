import users from "../models/users";


export const getUserDetials = async(req, res)=>{
    try{
        const {email} =req.body;
        const userDetail = await users.findOne({email});
        if(!userDetail){
            return res.status(403).json({error : "NO SUCH USER REGISTERED"})
        }else{
            return res.status(200).json({userDetail})
        }

    }catch(error){
        console.log(`error in get User details : ${error.message}`);
        res.status(500).json({error : 'INTERNAL SERVER ERROR'})
    }
}


export const updateUserDetails = async (req, res)=>{
    try{
        const {email, phone ,name  } = req.body;
        const userDetail = await users.findOne({email})
        if(!userDetail){
            return res.status(403).json({error : "NO SUCH USER FOUND"})
        }else{
        userDetail.phone = phone;
        userDetail.name = name;
        userDetail.save();
        return res.status(200).json({message : "saved changes"})
        }
    }catch(error){
        console.log(`error in update user deatils : ${error.message}`)
        res.staus(500).json({error : 'INTERNAL SERVER ERROR '})
    }
}

