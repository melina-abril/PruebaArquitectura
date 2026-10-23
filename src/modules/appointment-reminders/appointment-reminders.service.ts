import { sendNotification } from '../../integrations/notifications.client';
import {
  ConfirmAttendanceRequest,
  ConfirmAttendanceResponse,
  SendReminderRequest,
  SendReminderResponse
} from './appointment-reminders.models';

export function sendReminder(request: SendReminderRequest): SendReminderResponse {
  const appointmentId = request.appointmentId ?? 'appointment-1001';
  const channel = request.channel === 'sms' ? 'sms' : 'email';
  const to = channel === 'sms' ? '+5491123456789' : 'owner@example.com';
  const notification = sendNotification({
    channel,
    to,
    subject: channel === 'email' ? 'Recordatorio de turno veterinario' : undefined,
    message: 'Recordatorio: turno para Luna el 3 de diciembre a las 10:00. Confirma tu asistencia.'
  });

  // Respuesta dummy sin persistencia: reemplazar por el registro real del recordatorio.
  return {
    reminder: {
      id: 'reminder-1001',
      appointmentId,
      ownerId: 'owner-1001',
      channel,
      to,
      scheduledFor: '2026-12-02T10:00:00.000Z',
      status: notification.status
    },
    notification
  };
}

export function confirmAttendance(request: ConfirmAttendanceRequest): ConfirmAttendanceResponse {
  // Respuesta dummy sin persistencia: reemplazar por la actualización real del turno.
  return {
    appointmentId: request.appointmentId ?? 'appointment-1001',
    ownerId: request.ownerId ?? 'owner-1001',
    attendance: 'CONFIRMED',
    confirmedAt: '2026-12-02T10:05:00.000Z'
  };
}
