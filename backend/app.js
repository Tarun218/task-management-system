import express from 'express';
import cors from 'cors';
import register from './routes/register.route.js';
import login from './routes/login.route.js';
import profile from './routes/profile.route.js';
import board from './routes/board.route.js'
import task from './routes/tasks.route.js'
import boardTasks from './routes/getTasks.route.js';
import getUser from './controllers/getUser.controller.js';
const app = express();
app.use(express.json());
app.use(cors());
app.use("/uploads",express.static("uploads"))
app.use('/api/auth/',register);
app.use('/api/auth/',login);
app.use('/api/',profile);
app.use('/api/',board);
app.use('/api/',task);
app.use('/api/',boardTasks);
app.use('/api/',getUser);
export default app;