
import {archive} from './archive.js';
import {generateFiles} from './create-files.js';

export function exportModelsFromDB(dbType, data, tables) {
  return generateFiles(dbType, tables, data.database)
    .then( (dirname) => archive(dirname))
    .then( (emitter) => emitter);
}
