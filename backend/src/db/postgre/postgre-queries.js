
export const SQL_TABLE_NAMES = `select table_name from INFORMATION_SCHEMA.views WHERE table_schema = 'public'
                                union
                                select table_name from INFORMATION_SCHEMA.tables WHERE table_schema = 'public'`;

export const SQL_TABLE_COLUMNS = `SELECT DISTINCT c.column_name, c.data_type 
                                  FROM INFORMATION_SCHEMA.COLUMNS c 
                                  WHERE c.TABLE_SCHEMA = 'public' and c.table_name = $1`;
