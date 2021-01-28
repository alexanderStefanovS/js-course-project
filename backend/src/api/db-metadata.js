
import {Router} from 'express';
import {DB_METADATA, TABLE_METADATA} from '../constants/map-consts.js';
import {getDbMetadata} from '../utils/db-util.js';

export const dbMetadata = Router();

dbMetadata.get('/db', (req, res) => {
  const connectionData = req.session.connectionData;

  if (connectionData) {
    getDbMetadata(connectionData, DB_METADATA, [])
      .then((result) => res.send(result));
  } else {
    res.send(false);
  }
});

dbMetadata.get('/table/:tableName', (req, res) => {
  const connectionData = req.session.connectionData;
  const tableName = req.params.tableName;

  if (connectionData) {
    const db = connectionData.database;
    getDbMetadata(connectionData, TABLE_METADATA, [db, tableName])
      .then((result) => res.send(result));
  } else {
    res.send(false);
  }
});
