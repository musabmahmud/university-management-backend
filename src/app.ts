import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import router from './app/routers';
import globalErrorHandler from './app/middlewares/globalErrorhandler';
import notFound from './app/middlewares/notFound';

const app: Application = express();

app.use(express.json());
app.use(cors());

app.use('/v1/api', router);

app.get('/v1/api', (_req: Request, res: Response) => {
  res.send('Welcome to University Management Backend API');
});

app.use(globalErrorHandler);
app.use(notFound);

export default app;
