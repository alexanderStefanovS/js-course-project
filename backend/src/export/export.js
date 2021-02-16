
import {archive} from './archive.js';
import {generateFiles} from './create-files.js';

export function exportModelsFromDB(dbType, data, tables) {
  const database = data ? data.database : null;
  return generateFiles(dbType, tables, database)
    .then( (dirname) => {
      return archive(dirname);
    })
    .then( (emitter) => emitter);
}
