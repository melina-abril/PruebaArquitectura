export interface Appointment {
  id: string;
  ownerId: string;
  petId: string;
  veterinarianId: string;
  startsAt: string;
  endsAt: string;
  status: 'BOOKED' | 'CANCELLED';
}

export interface AvailableSlot {
  startsAt: string;
  endsAt: string;
}

export interface ApiError {
  error: string;
}

export interface ServiceResult<T> {
  statusCode: number;
  body: T | ApiError;
}

export interface AvailableSlotsResponse {
  veterinarianId: string;
  date: string;
  slots: AvailableSlot[];
}

export interface UpcomingAppointmentsResponse {
  ownerId: string;
  appointments: Appointment[];
}

export interface CancellationResponse {
  appointment: Appointment;
}
