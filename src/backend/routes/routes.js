import { Router } from 'express';
import apiController from '../controllers/apiController.js'

const router = Router();

router.get('/events', apiController.getEvents);

export default router;