
import {Router} from 'express';
import {DB_METADATA, TABLE_METADATA} from '../db/query-types.js';
import {extractData} from '../db/extract-db-data.js';

export const dbMetadata = Router();

dbMetadata.get('/db', (req, res) => {
  const connectionData = req.session.connectionData;
  const dbType = req.session.dbType;

  if (connectionData) {
    extractData(dbType, DB_METADATA, connectionData, [connectionData.database])
      .then((result) => res.send(result));
  } else {
    res.send(false);
  }
});

dbMetadata.get('/table/:tableName', (req, res) => {
  const connectionData = req.session.connectionData;
  const dbType = req.session.dbType;
  const tableName = req.params.tableName;

  if (connectionData) {
    const db = connectionData.database;
    extractData(dbType, TABLE_METADATA, connectionData, [db, tableName])
      .then((result) => res.send(result));
  } else {
    res.send(false);
  }
});
