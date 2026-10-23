import { NextFunction, Request, Response } from 'express';
import { UpdateAppointmentStatusRequest } from './veterinarian-schedule.models';
import * as scheduleService from './veterinarian-schedule.service';

export function getDailySchedule(_req: Request, res: Response): void {
  res.json(scheduleService.getDailySchedule());
}

export function updateAppointmentStatus(req: Request, res: Response, next: NextFunction): void {
  try {
    res.json(scheduleService.updateAppointmentStatus(req.body as UpdateAppointmentStatusRequest));
  } catch (error) {
    next(error);
  }
}

export function blockSlot(_req: Request, res: Response): void {
  res.status(201).json(scheduleService.blockSlot());
}
