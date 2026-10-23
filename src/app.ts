import express, { type Request, type Response } from 'express';
import routes from './routes';
import { errorMiddleware } from './middleware/error.middleware';

const app = express();

app.use(express.json());
app.use(routes);

app.use((_request: Request, response: Response) => {
  response.status(404).json({ error: 'Route not found' });
});

app.use(errorMiddleware);

export default app;
