export type AppointmentStatus = 'SCHEDULED' | 'ATTENDED' | 'ABSENT';

export interface ScheduleAppointment {
  id: string;
  veterinarianId: string;
  petName: string;
  ownerName: string;
  date: string;
  startTime: string;
  endTime: string;
  status: AppointmentStatus;
}

export interface BlockedSlot {
  id: string;
  veterinarianId: string;
  date: string;
  startTime: string;
  endTime: string;
  reason: string;
}

export interface DailySchedule {
  veterinarianId: string;
  veterinarianName: string;
  date: string;
  appointments: ScheduleAppointment[];
  blockedSlots: BlockedSlot[];
}

export interface UpdateAppointmentStatusRequest {
  appointmentId: string;
  status: 'ATTENDED' | 'ABSENT';
}

export interface BlockSlotRequest {
  veterinarianId: string;
  date: string;
  startTime: string;
  endTime: string;
  reason: string;
}
