import express, { Application, Request, Response } from 'express';
import userRouter from './routes/userRouter';
import { notFoundMiddleware } from './middlewares/notFound.middleware';
import { errorMiddleware } from './middlewares/error.middleware';

const app: Application = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req: Request, res: Response) => {
  res.send('API is running...');
});

app.use('/api/users', userRouter);

app.use(notFoundMiddleware);
app.use(errorMiddleware);

export default app;

