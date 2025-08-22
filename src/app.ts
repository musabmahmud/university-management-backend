import express, { Application } from 'express';
import cors from 'cors';
import router from './app/routers';
import globalErrorHandler from './app/middlewares/globalErrorhandler';
import notFound from './app/middlewares/notFound';


const app: Application = express();

app.use(express.json());
app.use(cors());

app.use('/api/v1', router);

app.use(globalErrorHandler);
app.use(notFound);

export default app;