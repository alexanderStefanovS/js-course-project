
import {Router} from 'express';
import {getDatabaseMetadata, getTableMetadata} from '../utils/db-util.js';

export const dbMetadata = Router();

dbMetadata.get('/db', (req, res) => {
  const connectionData = req.session.connectionData;

  if (connectionData) {
    getDatabaseMetadata(connectionData)
      .then((result) => {
        res.send(result);
      });
  } else {
    res.send(false);
  }
});

dbMetadata.get('/table/:tableName', (req, res) => {
  const connectionData = req.session.connectionData;

  if (connectionData) {
    getTableMetadata(connectionData, req.params.tableName)
      .then((result) => {
        res.send(result);
      });
  } else {
    res.send(false);
  }
});
