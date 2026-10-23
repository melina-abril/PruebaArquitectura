import { Request, Response } from 'express';
import * as appointmentsService from './appointments.service';

export function getAvailableSlots(req: Request, res: Response): void {
  const result = appointmentsService.getAvailableSlots(req.query);
  res.status(result.statusCode).json(result.body);
}

export function bookAppointment(req: Request, res: Response): void {
  const result = appointmentsService.bookAppointment(req.body as Record<string, unknown>);
  res.status(result.statusCode).json(result.body);
}

export function listUpcomingAppointments(req: Request, res: Response): void {
  const result = appointmentsService.listUpcomingAppointments(req.query);
  res.status(result.statusCode).json(result.body);
}

export function cancelAppointment(req: Request, res: Response): void {
  const result = appointmentsService.cancelAppointment(req.body as Record<string, unknown>);
  res.status(result.statusCode).json(result.body);
}
