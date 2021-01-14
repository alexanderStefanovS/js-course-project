
import {TableColumn} from '../classes/table-column.js';
import {Table} from '../classes/table.js';

const TABLE_NAME = 'table_name';
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
