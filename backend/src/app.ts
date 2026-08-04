import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import routes from './routes';

import { errorMiddleware } from './middlewares/error.middleware';

const app = express();

app.use(cors());

app.use(helmet());

app.use(morgan('dev'));

app.use(express.json());

app.use(routes);

app.use(errorMiddleware);

export default app;