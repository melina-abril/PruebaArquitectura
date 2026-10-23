import type { ErrorRequestHandler } from 'express';

type HttpError = Error & { status?: number; statusCode?: number };

export const errorMiddleware: ErrorRequestHandler = (error: unknown, _request, response, _next) => {
  const httpError = error as HttpError;
  const requestedStatus = httpError.status ?? httpError.statusCode;
  const status = typeof requestedStatus === 'number' && requestedStatus >= 400 && requestedStatus < 600
    ? requestedStatus
    : 500;

  response.status(status).json({
    error: status >= 500 ? 'Internal server error' : httpError.message || 'Request error'
  });
};
