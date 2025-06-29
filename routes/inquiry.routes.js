import express from 'express';
import { createInquiry, getAllInquiries, deleteInquiry } from '../controller/inquiry.controller.js';

const router = express.Router();

router.post('/save', createInquiry);
router.get('/getall', getAllInquiries);
router.delete('/delete/:id', deleteInquiry);

export default router;
