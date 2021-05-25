
import {Router} from 'express';
import {DB_METADATA, TABLE_METADATA} from '../db/query-types.js';
import {extractData} from '../db/extract-db-data.js';
import {ErrorResponse} from '../classes/error-response.js';
import {NO_CONNECTION_SET_SYS_MSG, NO_CONNECTION_SET_USR_MSG} from '../constants/error-messages.js';
import {INTERNAL_SERVER_ERROR, FORBIDDEN} from '../constants/http-status-codes.js';
import {DATABASE_TYPES} from '../db/db-types.js';

const [MYSQL] = DATABASE_TYPES;

export const dbMetadata = Router();

dbMetadata.get('/db', (req, res) => {
  const connectionData = req.session.connectionData;
  const dbType = req.session.dbType;

  if (connectionData) {
    const params = dbType === MYSQL ? [connectionData.database] : null;
    extractData(dbType, DB_METADATA, connectionData, params)
      .then((result) => res.send(result))
      .catch((err) => {
        res.status(INTERNAL_SERVER_ERROR).send(err);
      });
  } else {
    res.status(FORBIDDEN).send(new ErrorResponse(NO_CONNECTION_SET_SYS_MSG, NO_CONNECTION_SET_USR_MSG));
  }
});

dbMetadata.get('/table/:tableName', (req, res) => {
  const connectionData = req.session.connectionData;
  const dbType = req.session.dbType;
  const tableName = req.params.tableName;

  if (connectionData) {
    const params = dbType === MYSQL ? [connectionData.database, tableName] : [tableName];
    extractData(dbType, TABLE_METADATA, connectionData, params)
      .then((result) => res.send(result))
      .catch((err) => {
        res.status(INTERNAL_SERVER_ERROR).send(err);
      });
  } else {
    res.status(FORBIDDEN).send(new ErrorResponse(NO_CONNECTION_SET_SYS_MSG, NO_CONNECTION_SET_USR_MSG));
  }

});
