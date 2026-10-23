import {
  Appointment,
  AvailableSlot,
  AvailableSlotsResponse,
  CancellationResponse,
  ServiceResult,
  UpcomingAppointmentsResponse
} from './appointments.models';

const SAMPLE_DATE = '2030-06-17';
const SAMPLE_VETERINARIAN_ID = 'vet-001';
const APPOINTMENT_BASE = '/turnos-veterinaria/appointments';

// Datos dummy fijos: reemplazar por agenda y reservas persistidas.
const appointments: Appointment[] = [
  {
    id: 'apt-001',
    ownerId: 'owner-001',
    petId: 'pet-001',
    veterinarianId: SAMPLE_VETERINARIAN_ID,
    startsAt: '2030-06-17T09:00:00.000Z',
    endsAt: '2030-06-17T09:30:00.000Z',
    status: 'BOOKED'
  },
  {
    id: 'apt-002',
    ownerId: 'owner-001',
    petId: 'pet-002',
    veterinarianId: SAMPLE_VETERINARIAN_ID,
    startsAt: '2030-06-17T11:00:00.000Z',
    endsAt: '2030-06-17T11:30:00.000Z',
    status: 'BOOKED'
  }
];

const blockedStartsAt = new Set(['2030-06-17T10:00:00.000Z']);

function isValidDate(value: unknown): value is string {
  if (typeof value !== 'string' || !/^\d{4}-\d{2}-\d{2}$/.test(value)) return false;
  const parsed = new Date(`${value}T00:00:00.000Z`);
  return !Number.isNaN(parsed.getTime()) && parsed.toISOString().slice(0, 10) === value;
}

function isNonEmptyString(value: unknown): value is string {
  return typeof value === 'string' && value.trim().length > 0;
}

function slotsForDay(date: string): AvailableSlot[] {
  return Array.from({ length: 6 }, (_, index) => {
    const start = new Date(`${date}T09:00:00.000Z`);
    start.setUTCMinutes(start.getUTCMinutes() + index * 30);
    const end = new Date(start.getTime() + 30 * 60 * 1000);
    return { startsAt: start.toISOString(), endsAt: end.toISOString() };
  });
}

function freeSlots(date: string): AvailableSlot[] {
  return slotsForDay(date).filter((slot) =>
    !blockedStartsAt.has(slot.startsAt) &&
    !appointments.some((appointment) =>
      appointment.status === 'BOOKED' &&
      appointment.veterinarianId === SAMPLE_VETERINARIAN_ID &&
      slot.startsAt < appointment.endsAt &&
      slot.endsAt > appointment.startsAt
    )
  );
}

export function getAvailableSlots(query: Record<string, unknown>): ServiceResult<AvailableSlotsResponse> {
  const { veterinarianId, date } = query;
  if (!isNonEmptyString(veterinarianId) || !isValidDate(date)) {
    return { statusCode: 400, body: { error: 'veterinarianId and a valid date (YYYY-MM-DD) are required.' } };
  }
  if (veterinarianId !== SAMPLE_VETERINARIAN_ID || date !== SAMPLE_DATE) {
    return { statusCode: 404, body: { error: 'No sample schedule exists for this veterinarian and date.' } };
  }
  return { statusCode: 200, body: { veterinarianId, date, slots: freeSlots(date) } };
}

export function bookAppointment(input: Record<string, unknown>): ServiceResult<Appointment> {
  const { ownerId, petId, veterinarianId, date, time } = input;
  if (!isNonEmptyString(ownerId) || !isNonEmptyString(petId) ||
      !isNonEmptyString(veterinarianId) || !isValidDate(date) ||
      typeof time !== 'string' || !/^\d{2}:\d{2}$/.test(time)) {
    return { statusCode: 400, body: { error: 'ownerId, petId, veterinarianId, date (YYYY-MM-DD) and time (HH:mm) are required.' } };
  }
  if (veterinarianId !== SAMPLE_VETERINARIAN_ID || date !== SAMPLE_DATE) {
    return { statusCode: 404, body: { error: 'No sample schedule exists for this veterinarian and date.' } };
  }
  const slot = freeSlots(date).find((candidate) => candidate.startsAt.slice(11, 16) === time);
  if (!slot) {
    return { statusCode: 409, body: { error: 'The 30-minute slot is unavailable or outside working hours.' } };
  }
  // Reserva dummy: reemplazar por una operación atómica que impida superposiciones.
  return {
    statusCode: 201,
    body: {
      id: 'apt-003',
      ownerId,
      petId,
      veterinarianId,
      startsAt: slot.startsAt,
      endsAt: slot.endsAt,
      status: 'BOOKED'
    }
  };
}

export function listUpcomingAppointments(query: Record<string, unknown>): ServiceResult<UpcomingAppointmentsResponse> {
  const { ownerId } = query;
  if (!isNonEmptyString(ownerId)) {
    return { statusCode: 400, body: { error: 'ownerId is required.' } };
  }
  // Listado dummy: reemplazar por una consulta de turnos persistidos.
  return {
    statusCode: 200,
    body: {
      ownerId,
      appointments: appointments.filter((appointment) =>
        appointment.ownerId === ownerId &&
        appointment.status === 'BOOKED' &&
        new Date(appointment.startsAt).getTime() > Date.now()
      )
    }
  };
}

export function cancelAppointment(input: Record<string, unknown>): ServiceResult<CancellationResponse> {
  const { ownerId, appointmentId } = input;
  if (!isNonEmptyString(ownerId) || !isNonEmptyString(appointmentId)) {
    return { statusCode: 400, body: { error: 'ownerId and appointmentId are required.' } };
  }
  const appointment = appointments.find((item) => item.id === appointmentId && item.ownerId === ownerId);
  if (!appointment) {
    return { statusCode: 404, body: { error: 'Appointment not found for this owner.' } };
  }
  if (new Date(appointment.startsAt).getTime() - Date.now() < 24 * 60 * 60 * 1000) {
    return { statusCode: 409, body: { error: 'Appointments can only be cancelled at least 24 hours in advance.' } };
  }
  // Cancelación dummy: reemplazar por una actualización persistida de la agenda.
  return { statusCode: 200, body: { appointment: { ...appointment, status: 'CANCELLED' } } };
}
