
import {Router} from 'express';
import {ErrorResponse} from '../classes/error-response.js';
import {INVALID_REQUEST_DATA} from '../constants/error-messages.js';
import {BAD_REQUEST, INTERNAL_SERVER_ERROR} from '../constants/http-status-codes.js';
import {DATABASE_TYPES} from '../db/db-types.js';
import {testConnection} from '../db/extract-db-data.js';
import {getDbConnectionSchema} from '../joi-schemas/get-connection-schema.js';

function validate(requestData) {
  const validationSchema = getDbConnectionSchema(requestData.dbType);

  if (!validationSchema) {
    return false;
  }

  const {error} = validationSchema.validate(requestData);
  
  return error;
}

export const dbConnection = Router();

dbConnection.get('/db-types', (req, res) => {
  res.send(DATABASE_TYPES);
});

dbConnection.post('/', (req, res) => {
  
  const validationError = validate(req.body);
  if (validationError) {
    res.status(BAD_REQUEST).send(new ErrorResponse(validationError.message, INVALID_REQUEST_DATA));
    return;
  }

  testConnection(req.body.dbType, req.body.connectionData)
    .then((result) => {
      if (result === true) {
        req.session.connectionData = req.body.connectionData;
        req.session.dbType = req.body.dbType;
      }    
      res.send(result);
    })
    .catch((err) => {
      res.status(INTERNAL_SERVER_ERROR).send(err);
    });
});

