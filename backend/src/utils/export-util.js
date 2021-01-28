
import {getDbMetadata} from '../utils/db-util.js';
import {TABLES_COLUMNS_METADATA} from '../constants/map-consts.js';
import {generateFiles} from '../functions/create-files.js';

function processColumnsAndTablesForExport(tables, dbTables) {
  return tables.reduce((acc, table) => {
    if (!table.columns.length) {
      const dbTable = dbTables.find((t) => t.tableName.toUpperCase() === table.tableName.toUpperCase());
      table.columns = dbTable.columns;
    }
    acc.push(table);
    return acc;
  }, []);
}

export function exportModelsFromDB(data, tables) {
  return getDbMetadata(data, TABLES_COLUMNS_METADATA, [data.database])
    .then( (dbTables) => processColumnsAndTablesForExport(tables, dbTables))
    .then( (tables) => generateFiles(tables, data.database))
    .then((result) => result);
}
