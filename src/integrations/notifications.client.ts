export interface SendNotificationRequest {
  channel: 'email' | 'sms';
  to: string;
  subject?: string;
  message: string;
}

export interface SendNotificationResponse {
  notificationId: string;
  status: 'QUEUED';
}

export function sendNotification(request: SendNotificationRequest): SendNotificationResponse {
  const baseUrl = process.env.NOTIFICATIONS_API_URL ?? '';
  // Cliente dummy: reemplazar el log por POST /notifications/send cuando se habilite la integración.
  console.info('Dummy notification request', {
    endpoint: `${baseUrl}/notifications/send`,
    request
  });
  return { notificationId: 'notification-1001', status: 'QUEUED' };
}
