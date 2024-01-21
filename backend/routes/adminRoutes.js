import express from 'express';
import { deleteUser, getAllUsers, updateUser } from '../controllers/adminController.js';
import { isAdmin, isAuthenticated } from '../middlewares/authMiddleware.js';
const router = express.Router();

router.get('/allusers', [isAuthenticated , isAdmin] , getAllUsers);
router.post("delete/:userId" , [isAuthenticated , isAdmin], deleteUser);
router.patch("update/:userId" , [isAuthenticated , isAdmin] , updateUser);

export default router;

