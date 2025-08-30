import 'dotenv/config';
import express from 'express';
import cors, { CorsOptions } from 'cors';
import morgan from 'morgan';
import helmet from 'helmet';

import productsRouter from './products.router.js';

const app = express();

app.use(express.json());

// Helmet para la seguridad por si acaso
app.use(helmet());

// Morgan para el logging
app.use(morgan('dev'));

// CORS abierto para desarrollo
// TODO: Configurar CORS para producción (Que incluya todos los dominios que se conecten a la API)
const corsOptions: CorsOptions = {
  origin: true,
  credentials: true,
};
app.use(cors(corsOptions));

app.use('/v1', productsRouter);

const port = Number(process.env.PORT || 3001);

app.listen(port, () => {
  console.log(`[server] listening on http://localhost:${port}`);
});
