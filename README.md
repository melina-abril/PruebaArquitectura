# Turnos Veterinaria — API

Backend REST JSON de ejemplo en Express 4 y TypeScript. Los servicios devuelven respuestas dummy: no usan base de datos ni realizan solicitudes a sistemas externos. El cliente de notificaciones registra el pedido y devuelve una respuesta de ejemplo.

## Ejecución

Requiere Node.js. Ejecutar `npm install`, copiar `.env.example` a `.env` y luego usar `npm run dev`. Para compilar y ejecutar el resultado: `npm run build` y `npm start`. `PORT` configura el puerto; `NOTIFICATIONS_API_URL` configura la URL de ejemplo del cliente de notificaciones.

## Servicios

| Método | Ruta |
| --- | --- |
| POST | /turnos-veterinaria/pets/register-owner |
| POST | /turnos-veterinaria/pets/create |
| GET | /turnos-veterinaria/pets/list |
| PUT | /turnos-veterinaria/pets/update |
| DELETE | /turnos-veterinaria/pets/delete |
| GET | /turnos-veterinaria/appointments/available-slots |
| POST | /turnos-veterinaria/appointments/book |
| GET | /turnos-veterinaria/appointments/upcoming |
| POST | /turnos-veterinaria/appointments/cancel |
| GET | /turnos-veterinaria/veterinarian-schedule/daily |
| PATCH | /turnos-veterinaria/veterinarian-schedule/update-status |
| POST | /turnos-veterinaria/veterinarian-schedule/block-slot |
| POST | /turnos-veterinaria/appointment-reminders/send |
| POST | /turnos-veterinaria/appointment-reminders/confirm |

Los routers de cada módulo se montan en su prefijo correspondiente y definen las rutas de servicio relativas a ese prefijo.
