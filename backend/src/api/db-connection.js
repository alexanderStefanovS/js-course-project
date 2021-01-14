
import {Router} from 'express';
import {testConnection} from '../utils/db-util.js';
import {ConnectionData} from '../classes/connection-data.js';

export const dbConnection = Router();

dbConnection.post('/', (req, res) => {
  
  // #TODO validate input

  testConnection(req.body)
    .then((result) => {
      if (result === true) {
        req.session.connectionData = new ConnectionData(req.body);
      }    
      res.send(result);
    });

});

