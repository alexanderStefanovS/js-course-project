
import {Router} from 'express';
import {parseTables} from '../functions/parse-tables.js';
import {exportModelsFromDB} from '../export/export.js';
import {basename} from 'path';
import {INVALID_REQUEST_DATA} from '../constants/error-messages.js';
import {ErrorResponse} from '../classes/error-response.js';
import {BAD_REQUEST, INTERNAL_SERVER_ERROR} from '../constants/http-status-codes.js';
import {DATA_TYPES} from '../constants/data-types.js';
import {EXPORT_SCHEMA} from '../joi-schemas/export-schema.js';

export const exportModels = Router();

function validate(requestData) {
  const {error} = EXPORT_SCHEMA.validate(requestData);
  return error;
}

exportModels.get('/data-types', (req, res) => {
  res.send(DATA_TYPES);
});

exportModels.post('/', (req, res, next) => {
  const connectionData = req.session.connectionData;
  const dbType = req.session.dbType;

  const validationError = validate(req.body);
  if (validationError) {
    res.status(BAD_REQUEST).send(new ErrorResponse(validationError.message, INVALID_REQUEST_DATA));
    return;
  }

  const tables = parseTables(req.body);
  let emitter;

  function sendArchive(archivePath) {
    const filename = basename(archivePath);
    res.set('Filename', filename);
    res.download(archivePath, filename, (err) => {
      if (err) {
        next(err);
      } 
    });
  }

  exportModelsFromDB(dbType, connectionData, tables)
    .then((e) => {
      emitter = e;
      emitter.on('archive-done', sendArchive);
    })
    .catch((err) => {
      console.error(err);
      res.status(INTERNAL_SERVER_ERROR).send(new ErrorResponse('', 'Models generation is not successful'));
    });

  req.on('close', () => {
    if (emitter) {
      emitter.off('archive-done', sendArchive);
    }
  });

});
