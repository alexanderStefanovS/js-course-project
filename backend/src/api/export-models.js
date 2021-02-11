
import {Router} from 'express';
import {parseTables} from '../functions/parse-tables.js';
import {exportModelsFromDB} from '../export/export.js';
import {readdir} from 'fs';
import {basename, resolve} from 'path';
import rimraf from 'rimraf';
import {EXPORT_SCHEMA} from '../joi-schemas/export-schema.js';
import {INVALID_REQUEST_DATA, NO_CONNECTION_SET_SYS_MSG, NO_CONNECTION_SET_USR_MSG} from '../constants/error-messages.js';
import {ErrorResponse} from '../classes/error-response.js';
import {BAD_REQUEST, FORBIDDEN, INTERNAL_SERVER_ERROR} from '../constants/http-status-codes.js';

export const exportModels = Router();

const GENERATED_FILES_DIR = './generated-files';
const ARCHIVES_DIR = './archives';

function validate(requestData) {
  const {error} = EXPORT_SCHEMA.validate(requestData);
  return error;
}

function removeGenratedDirsAndFiles() {
  readdir(resolve(GENERATED_FILES_DIR), (err, dirs) => {
    dirs.forEach((dir) => {
      const dirPath = resolve(`${GENERATED_FILES_DIR}/${dir}`);
      rimraf(dirPath, () => {
        console.info(`${dir} is removed`);
      });
    });
  });
}

exportModels.post('/from-db', (req, res, next) => {
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

  if (connectionData) {
    exportModelsFromDB(dbType, connectionData, tables)
      .then((e) => {
        emitter = e;
        emitter.on('archive-done', sendArchive);
      })
      .catch((err) => {
        res.status(INTERNAL_SERVER_ERROR).send(new ErrorResponse('', 'Models generation is not successful'));
      });
  } else {
    res.status(FORBIDDEN).send(new ErrorResponse(NO_CONNECTION_SET_SYS_MSG, NO_CONNECTION_SET_USR_MSG));
  }

  req.on('close', () => {
    if (emitter) {
      emitter.off('archive-done', sendArchive);
      removeGenratedDirsAndFiles();
    }
  });

});
