import { Router } from 'express';
import * as appointmentsController from './appointments.controller';

const router = Router();

router.get('/turnos-veterinaria/appointments/available-slots', appointmentsController.getAvailableSlots);
router.post('/turnos-veterinaria/appointments/book', appointmentsController.bookAppointment);
router.get('/turnos-veterinaria/appointments/upcoming', appointmentsController.listUpcomingAppointments);
router.post('/turnos-veterinaria/appointments/cancel', appointmentsController.cancelAppointment);

export default router;
