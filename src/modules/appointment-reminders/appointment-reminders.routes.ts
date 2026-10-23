import { Router } from 'express';
import * as reminderController from './appointment-reminders.controller';

const router = Router();

router.post('/turnos-veterinaria/appointment-reminders/send', reminderController.sendReminder);
router.post('/turnos-veterinaria/appointment-reminders/confirm', reminderController.confirmAttendance);

export default router;
