import express from 'express'
import { connectToDB } from './database/db';
import userRoutes from './routes/userRoutes.js'
import reservationRoutes from './routes/reservationRoutes.js'
const app = express();


const PORT = 5000;
connectToDB();
app.use(express.json());

app.use('/api/users' , userRoutes);
app.use('/api/reservations', reservationRoutes)


app.listen(PORT , (req, res)=>{
    console.log(`server started on port ${PORT}`)
})
