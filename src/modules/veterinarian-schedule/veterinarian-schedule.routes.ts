import { Router } from 'express';
import * as scheduleController from './veterinarian-schedule.controller';

const router = Router();

router.get('/daily', scheduleController.getDailySchedule);
router.patch('/update-status', scheduleController.updateAppointmentStatus);
router.post('/block-slot', scheduleController.blockSlot);

export default router;
