
export function processColumnsAndTablesForExport(tables, dbTables) {
  return tables.reduce((acc, table) => {
    if (!table.columns.length) {
      const dbTable = dbTables.find((t) => t.tableName.toUpperCase() === table.tableName.toUpperCase());
      table.columns = dbTable.columns;
    }
    acc.push(table);
    return acc;
  }, []);
}
