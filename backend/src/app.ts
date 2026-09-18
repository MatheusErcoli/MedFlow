import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import routes from './routes';

import { errorMiddleware } from './middlewares/error.middleware';
import path from 'path';

const app = express();

app.use(cors());

app.use(helmet({
    crossOriginResourcePolicy: { policy: 'cross-origin' },
}));

app.use(morgan('dev'));

app.use(express.json());

app.use('/uploads', express.static(path.resolve(__dirname, '..', 'uploads')));

app.use(routes);

app.use(errorMiddleware);

export default app;