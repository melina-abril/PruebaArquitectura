export interface SendReminderRequest {
  appointmentId?: string;
  channel?: 'email' | 'sms';
}

export interface ConfirmAttendanceRequest {
  appointmentId?: string;
  ownerId?: string;
}

export interface Reminder {
  id: string;
  appointmentId: string;
  ownerId: string;
  channel: 'email' | 'sms';
  to: string;
  scheduledFor: string;
  status: 'QUEUED';
}

export interface NotificationResult {
  notificationId: string;
  status: 'QUEUED';
}

export interface SendReminderResponse {
  reminder: Reminder;
  notification: NotificationResult;
}

export interface ConfirmAttendanceResponse {
  appointmentId: string;
  ownerId: string;
  attendance: 'CONFIRMED';
  confirmedAt: string;
}
