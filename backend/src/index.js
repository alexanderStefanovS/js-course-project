
import express from 'express';
import {dbConnection} from './api/db-connection.js';
import {dbMetadata} from './api/db-metadata.js';
import {exportModels} from './api/export-models.js';
import session from 'express-session';
import bodyParser from 'body-parser';

const PORT = 3000;
const app = express();

const sessionConfig = {
  secret: 'secret',
  resave: true,
  saveUninitialized: true
};

app.use(bodyParser.json());
app.use(session(sessionConfig));

app.use('/db-connection', dbConnection);
app.use('/db-metadata', dbMetadata);
app.use('/export-models', exportModels);

app.get('/', (req, res) => {
  res.send('<h4>Model generator!</h4>');
});

app.listen(PORT, () => {
  console.log(`The server is listening on port: ${PORT}...`);
});
