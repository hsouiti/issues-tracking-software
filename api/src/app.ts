import express from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import cors from 'cors';

// config file
import config from '../config/index';

// Errors handlers
import errorsHandler from './middlewares/errorsHandler';
import notFound from './middlewares/notFound';

// routes
import projectsRouter from './routes/projects';
import usersRouter from './routes/users';
import ticketsRouter from './routes/tickets';
import authRouter from './routes/auth';

// Db connect
import connectDB from './db/index';
import Logging from './helpers/logging';

const app = express();
const dirName = path.resolve();

// middelwaress
app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(cookieParser(config.PARSER_SECRET));
app.use(express.static(path.join(dirName, 'build')));
app.use(cors({origin: true, credentials: true}));

// Routes
app.get('/', (req, res) => {
  res.json({
    message: 'Hello',
  });
});
app.use('/api/v1/projects', projectsRouter);
app.use('/api/v1/auth', authRouter);
app.use('/api/v1/users', usersRouter);
/* app.use('/api/v1/tickets', ticketsRouter) */

// Errors Handler
app.use(notFound);
app.use(errorsHandler);

void (async () => {
  try {
    await connectDB();
  } catch (error: unknown) {
    const err = error as {message: string};
    Logging.error(`Failed to connect to DB', ${err.message}`);
  }
})();

export default app;
