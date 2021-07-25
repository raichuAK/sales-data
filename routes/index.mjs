import express from 'express';

import apiRouter from './api.mjs';
import debugLog from '../lib/logger.utility.mjs';
import fileUpload from 'express-fileupload';

const apiServer = express();
const port = 3000;

apiServer.get('/', (req, res) => {
  res.send(`API is up & running at port ${port}`);
});

apiServer.use('/api', apiRouter);
apiServer.use(fileUpload());

apiServer.listen(port, () => {
  // eslint-disable-next-line
  debugLog(`API listening at http://localhost:${port}`);
});
