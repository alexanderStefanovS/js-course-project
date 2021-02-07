
import {Router} from 'express';
import {parseTables} from '../functions/parse-tables.js';
import {exportModelsFromDB} from '../export/export.js';
import {readdir} from 'fs';
import {basename, resolve} from 'path';
import rimraf from 'rimraf';
import Joi from 'joi';

export const exportModels = Router();

const GENERATED_FILES_DIR = './generated-files';
const ARCHIVES_DIR = './archives';

function removeGenratedDirsAndFiles() {
  readdir(resolve(GENERATED_FILES_DIR), (err, dirs) => {
    dirs.forEach((dir) => {
      const dirPath = resolve(`${GENERATED_FILES_DIR}/${dir}`);
      rimraf(dirPath, () => {
        console.log(`${dir} is removed`);
      });
    });
  });
}

exportModels.post('/from-db', (req, res, next) => {
  const connectionData = req.session.connectionData;
  const dbType = req.session.dbType;
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
      });
  } else {
    res.send(false);
  }

  req.on('close', () => {
    emitter.off('archive-done', sendArchive);
    removeGenratedDirsAndFiles();
  });

});
