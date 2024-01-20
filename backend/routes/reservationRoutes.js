import express from 'express'
import { cancelReservation, createReservation, getAllreservations, getOneReservation } from '../controllers/reservationController.js';
const router =  express.Router();

router.get('/getallreservations' , getAllreservations);
router.post('createreservation' , createReservation);
router.get('/getonereservation', getOneReservation)
router.delete('deletereservatoin' , cancelReservation)

export default router;