import mongoose from 'mongoose'

const DB_URI = "sample";
export const connectToDB = async()=>{
try{
    await mongoose.connect(DB_URI);
    console.log(`connected to the database`);
}catch(error){
    console.log(`error in connecting to the databse : ${error.message}`)
}
}

