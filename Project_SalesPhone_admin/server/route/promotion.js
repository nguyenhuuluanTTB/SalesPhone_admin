import express from 'express';
const router = express.Router();
import get_promotion from '../controller/get_promotion_Controller.js';

router.get('/', get_promotion);

export default router;