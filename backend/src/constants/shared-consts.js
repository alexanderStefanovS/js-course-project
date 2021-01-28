
export const SQL_TABLE_NAMES = 'SELECT table_name FROM information_schema.tables WHERE table_schema = \'reservation_system\'';
export const SQL_TABLE_COLUMNS = 'SELECT DISTINCT c.column_name, c.data_type, c.column_key FROM INFORMATION_SCHEMA.COLUMNS c WHERE c.TABLE_SCHEMA = ? and c.table_name = ?';
export const DB_CONNECT_ERR_MSG = 'Error connecting database: ';
export const SQL_TABLES_AND_COLUMNS = 'SELECT DISTINCT c.column_name, c.data_type, c.column_key, t.table_name FROM INFORMATION_SCHEMA.COLUMNS c JOIN INFORMATION_SCHEMA.TABLES t on c.table_name = t.table_name WHERE c.TABLE_SCHEMA = \'reservation_system\'';
