
import {Router} from 'express';
import {parseTables} from '../functions/parse-tables.js';
import {exportModelsFromDB} from '../utils/export-util.js';

export const exportModels = Router();

exportModels.post('/from-db', (req, res) => {
  const connectionData = req.session.connectionData;
  const tables = parseTables(req.body);

  if (connectionData) {
    exportModelsFromDB(connectionData, tables)
      .then((data) => {
        res.send(data);
      });
  } else {
    res.send(false);
  }

});
