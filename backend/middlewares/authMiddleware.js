import jwt from 'jsonwebtoken'

const jwt_secret = "samplesecret";

export const isAuthenticated = async (req, res , next)=>{
    const token = req.headers.authorization;
    if(!token){
        return res.status(403).json({nessage : "Unauthorized user! Please sign in before trying to access"})
    }
    try{
        const decoded = jwt.verify(token, jwt_secret);
        req.user = decoded;
        next();
    }catch(error){
        console.log(`error in is authenticated : ${error.message}`)
        return res.status(401).json({error : "INVALID TOKEN ERROR"})
    }
}

export const isAdmin = async (req, res, next)=>{
    const { role} = req.user;
        if(role !== 'admin'){
            return res.status(403).json({message : "Forbidden! Admin privilages required"})
        }else{
            next();
        }
}