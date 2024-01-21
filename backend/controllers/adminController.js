import users from "../models/users"


export const getAllUsers = async(req, res)=>{
    try{
        const allUsers = await users.find();
        return res.status(200).json({users : allUsers})

    }catch(error){
        console.log(`error in get all users in admin panel : ${error.message}`)
        return res.status(500).json({error : "INTERNAL SERVER ERROR"})
    }
}

export const updateUser = async(req, res)=>{
    try{
        const userId = req.params.userId;
        const  updatedUserData = req.body;
        const updatedUser = users.findByIdAndUpdate(userId, updatedUserData , {new : true});
        return res.status(200).json({message : "User Updated successfully"})

    }catch(error){
        console.log(`error in update user admin : ${error.message}`)
        return res.status(500).json({error : "INTERNAL SERVER ERROR "})
    }
}


export const deleteUser = async(req, res)=>{
    try{
        const userId = req.params.userId;
        await users.findByIdAndDelete(userId);
        return res.status(201).json({message : "user deleted successfully"})
    }catch(error){
        console.log(`error in deleteing user in admin panel : ${error.message}`)
        return res.status(500).json({error : "INTERNAL SERVER ERROR"})
    }
}