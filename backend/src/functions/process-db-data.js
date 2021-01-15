
import {TableColumn} from '../classes/table-column.js';
import {Table} from '../classes/table.js';

const TABLE_NAME = 'table_name';
const COLUMN_NAME = 'column_name';
const DATA_TYPE = 'data_type';
const FIELD = 'Field';
const TYPE = 'Type';
const KEY = 'Key';

export function processTableNames(dbResults) {
  return dbResults.reduce((acc, result) => {
    acc.push(new Table(result[TABLE_NAME]));
    return acc;
  }, []);
}

export function processTableColumns(dbResults) {
  return dbResults.reduce((acc, result) => {
    acc.push(new TableColumn(result[FIELD], result[KEY], result[TYPE]));
    return acc;
  }, []);
}

export function processTablesAndColumns(dbResults) {
   const tablesMap = dbResults.reduce((map, result) => {
    if (map.has(result[TABLE_NAME])) {
      map.get(result[TABLE_NAME]).push({
        columnName: result[COLUMN_NAME],
        dataType: result[DATA_TYPE]
      });
    } else {
      map.set(result[TABLE_NAME], [{
        columnName: result[COLUMN_NAME],
        dataType: result[DATA_TYPE]
      }]);
    }
    return map;
  }, new Map());

  const tables = [];
  tablesMap.forEach((value, key) => {
    const table = new Table(key);
    table.columns = value.reduce((acc, column) => {
      acc.push(new TableColumn(column.columnName, '', column.dataType));
      return acc;
    }, []);
    tables.push(table);
  });

  return tables;
}
