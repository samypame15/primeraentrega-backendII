
import express from 'express';
import { registerUser } from '../controllers/session.controller.js'; 

const router = express.Router();

router.post('/', registerUser);

export default router;
