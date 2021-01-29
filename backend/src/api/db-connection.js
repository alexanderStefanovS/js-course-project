
import {Router} from 'express';
import {testConnection} from '../db/extract-db-data.js';

export const dbConnection = Router();

dbConnection.post('/', (req, res) => {
  
  // #TODO validate input

  testConnection(req.body.dbType, req.body.connectionData)
    .then((result) => {
      if (result === true) {
        req.session.connectionData = req.body.connectionData;
        req.session.dbType = req.body.dbType;
      }    
      res.send(result);
    });

});

