
import {Router} from 'express';
import {parseTables} from '../functions/parse-tables.js';
// import {ConnectionData} from '../classes/connection-data.js';

export const exportModels = Router();

exportModels.post('/from-db', (req, res) => {
  // const connectionData = req.session.connectionData;
  const tables = parseTables(req.body);

  res.send(tables);

});
