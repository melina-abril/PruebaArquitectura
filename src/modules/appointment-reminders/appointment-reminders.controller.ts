import { Request, Response } from 'express';
import { ConfirmAttendanceRequest, SendReminderRequest } from './appointment-reminders.models';
import * as reminderService from './appointment-reminders.service';

export function sendReminder(req: Request<{}, {}, SendReminderRequest>, res: Response): void {
  res.json(reminderService.sendReminder(req.body ?? {}));
}

export function confirmAttendance(req: Request<{}, {}, ConfirmAttendanceRequest>, res: Response): void {
  res.json(reminderService.confirmAttendance(req.body ?? {}));
}
