import routes from './routes';
import path from 'path';
import cors from 'cors';
import express from 'express';

import { errors } from 'celebrate';

const app = express();
const corsOptions = {
  origin: process.env.REACT_APP_URL,
  credentials: true
}

app.options('*', cors(corsOptions));

app.use(cors());
app.use(express.json());
app.use(routes);

app.use('/uploads', express.static(path.resolve(__dirname, '..', 'uploads')));

app.use(errors());

app.listen(process.env.PORT || 3333);