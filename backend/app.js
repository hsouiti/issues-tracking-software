import dotenv from 'dotenv';
dotenv.config();

import express from 'express';

import cookieParser from 'cookie-parser';

import errorsHandler from './middlewares/errorsHandler.js';
import notFound from './middlewares/notFound.js';

import projectsRouter from './routes/projects.js';
import usersRouter from './routes/users.js';
import ticketsRouter from './routes/tickets.js';
import authRouter from './routes/auth.js';

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser(process.env.JWT_SECRET));

// Routes
app.get('/', (req, res) => res.send('Welcome'));
app.use('/api/v1/projects', projectsRouter);
app.use('/api/v1/auth', authRouter);
app.use('/api/v1/users', usersRouter);
app.use('/api/v1/tickets', ticketsRouter);

// Errors Handler
app.use(notFound);
app.use(errorsHandler);

export default app;
