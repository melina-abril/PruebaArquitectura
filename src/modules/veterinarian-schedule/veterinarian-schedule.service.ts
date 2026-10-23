import { BlockedSlot, DailySchedule, ScheduleAppointment, UpdateAppointmentStatusRequest } from './veterinarian-schedule.models';

export function getDailySchedule(): DailySchedule {
  // Respuesta dummy a reemplazar por la consulta real de la agenda.
  return {
    veterinarianId: 'vet-001',
    veterinarianName: 'Dra. Laura Gómez',
    date: '2026-07-15',
    appointments: [
      {
        id: 'apt-1001',
        veterinarianId: 'vet-001',
        petName: 'Luna',
        ownerName: 'María Pérez',
        date: '2026-07-15',
        startTime: '09:00',
        endTime: '09:30',
        status: 'SCHEDULED'
      },
      {
        id: 'apt-1002',
        veterinarianId: 'vet-001',
        petName: 'Toby',
        ownerName: 'Juan Silva',
        date: '2026-07-15',
        startTime: '09:30',
        endTime: '10:00',
        status: 'SCHEDULED'
      }
    ],
    blockedSlots: [
      {
        id: 'block-001',
        veterinarianId: 'vet-001',
        date: '2026-07-15',
        startTime: '12:00',
        endTime: '13:00',
        reason: 'Cirugía programada'
      }
    ]
  };
}

export function updateAppointmentStatus(request: UpdateAppointmentStatusRequest): ScheduleAppointment {
  if (request?.status !== 'ATTENDED' && request?.status !== 'ABSENT') {
    throw new Error('The appointment status must be ATTENDED or ABSENT.');
  }

  // Respuesta dummy a reemplazar por la actualización real del turno.
  return {
    id: 'apt-1001',
    veterinarianId: 'vet-001',
    petName: 'Luna',
    ownerName: 'María Pérez',
    date: '2026-07-15',
    startTime: '09:00',
    endTime: '09:30',
    status: request.status
  };
}

export function blockSlot(): BlockedSlot {
  // Respuesta dummy a reemplazar por el bloqueo real de la franja.
  return {
    id: 'block-002',
    veterinarianId: 'vet-001',
    date: '2026-07-15',
    startTime: '15:00',
    endTime: '15:30',
    reason: 'Cirugía programada'
  };
}
