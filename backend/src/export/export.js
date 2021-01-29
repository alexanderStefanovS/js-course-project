
import {extractData} from '../db/extract-db-data.js';
import {TABLES_COLUMNS_METADATA} from '../db/query-types.js';
import {archive} from './archive.js';
import {generateFiles} from './create-files.js';
import {processColumnsAndTablesForExport} from './process-tables.js';

export function exportModelsFromDB(dbType, data, tables) {
  return extractData(dbType, TABLES_COLUMNS_METADATA, data, [data.database])
    .then( (dbTables) => processColumnsAndTablesForExport(tables, dbTables))
    .then( (tables) => generateFiles(dbType, tables, data.database))
    .then( (dirname) => archive(dirname))
    .then( (emitter) => emitter)
    .catch( (err) => console.log(err));
}
