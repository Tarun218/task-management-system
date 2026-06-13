import express from 'express';
import cors from 'cors';
import register from './routes/register.js';
const app = express();
app.use(express.json());
app.use(cors());
app.use('/api/auth',register);


export default app;