/* eslint-disable @typescript-eslint/restrict-template-expressions */
import http from 'http';
import app from './app';
// config file
import config from '../config/index';

// Db connect
import connectDB from './db/index';
import Logging from './helpers/logging';

app.set('PORT', config.PORT);
const server = http.createServer(app);

void (async () => {
  try {
    await connectDB();
    server.listen(app.get('PORT'), () => {
      Logging.info(`Server running at http://localhost:${app.get('PORT')}`);
    });
  } catch (error: unknown) {
    const err = error as {message: string};
    Logging.error(`Failed to connect to DB', ${err.message}`);
    server.close();
    process.exit(1);
  }
})();
