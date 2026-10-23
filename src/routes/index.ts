import { Router, type Router as ExpressRouter } from 'express';
import * as petsRoutes from '../modules/pets/pets.routes';
import * as appointmentsRoutes from '../modules/appointments/appointments.routes';
import * as veterinarianScheduleRoutes from '../modules/veterinarian-schedule/veterinarian-schedule.routes';
import * as appointmentRemindersRoutes from '../modules/appointment-reminders/appointment-reminders.routes';

const router = Router();

// Admite routers exportados por defecto o con nombre desde cada módulo.
function moduleRouter(moduleExports: Record<string, unknown>): ExpressRouter {
  const candidate = Object.values(moduleExports).find((value) => {
    if (typeof value !== 'function') return false;
    const possibleRouter = value as { use?: unknown; handle?: unknown };
    return typeof possibleRouter.use === 'function' && typeof possibleRouter.handle === 'function';
  });

  if (!candidate) throw new Error('A module does not export an Express router');
  return candidate as ExpressRouter;
}

router.use('/turnos-veterinaria/pets', moduleRouter(petsRoutes));
router.use('/turnos-veterinaria/appointments', moduleRouter(appointmentsRoutes));
router.use('/turnos-veterinaria/veterinarian-schedule', moduleRouter(veterinarianScheduleRoutes));
router.use('/turnos-veterinaria/appointment-reminders', moduleRouter(appointmentRemindersRoutes));

export default router;
