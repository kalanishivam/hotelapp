import express from 'express'
import { connectToDB } from './database/db';
import userRoutes from './routes/userRoutes.js'
import reservationRoutes from './routes/reservationRoutes.js'
import helment from 'helmet'
import xss from 'xss-clean';
import sanitize from 'express-mongo-sanitize'
// import csrf from 'csurf'
// const csrfProtection = csrf();
import ratelimit from 'express-rate-limit'
const app = express();
app.use(helment());

const limiter = ratelimit({
    limit : 40,
    windowMs : 60*60*1000,
    message : "too many requests from the same IP address"
})
app.use('/api' , limiter);

const PORT = 5000;
connectToDB();
app.use(express.json({limit: '10kb'}));
app.use(sanitize());
app.use(xss());

app.use('/api/users' , userRoutes);
app.use('/api/reservations', reservationRoutes)
// app.use(csrfProtection);

app.listen(PORT , (req, res)=>{
    console.log(`server started on port ${PORT}`)
})
