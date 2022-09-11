/* eslint-disable @typescript-eslint/restrict-template-expressions */
import http from 'http';
import app from './app';
// config file
import config from '../config/index';

import Logging from './helpers/logging';

app.set('PORT', config.PORT);
const server = http.createServer(app);

server.listen(app.get('PORT'), () => {
  Logging.info(`Server running at http://localhost:${app.get('PORT')}`);
});
