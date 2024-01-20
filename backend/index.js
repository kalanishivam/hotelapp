import express from 'express'
import { connectToDB } from './database/db';
const app = express();


const PORT = 5000;
connectToDB();
app.use(express.json());

app.use('/api/users' , )


app.listen(PORT , (req, res)=>{
    console.log(`server started on port ${PORT}`)
})
