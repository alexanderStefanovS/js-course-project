
import {TableColumn} from '../classes/table-column.js';
import {Table} from '../classes/table.js';

export function parseTables(data) {
  return data.reduce((tables, t) => {
    const table = new Table(t.tableName);
    table.columns = t.columns.reduce((columns, c) => {
      columns.push(new TableColumn(c));
      return columns;
    }, []);
    tables.push(table);
    return tables;
  }, []);
}
