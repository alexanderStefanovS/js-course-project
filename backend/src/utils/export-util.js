
import {getTablesWithColumns} from './db-util.js';

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
  return getTablesWithColumns(data)
    .then( (dbTables) => {
      const exportTables = processColumnsAndTablesForExport(tables, dbTables);
      return exportTables;
    });
}
