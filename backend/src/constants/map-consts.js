
import {processTableColumns, processTableNames, processTablesAndColumns} from '../functions/process-db-data.js';
import {SQL_TABLES_AND_COLUMNS, SQL_TABLE_COLUMNS, SQL_TABLE_NAMES, DB_CONNECT_ERR_MSG} from './shared-consts.js';
import {ExtractDbDataProps} from '../classes/extract-db-data-props.js';

export const TABLE_METADATA = 'TABLE_METADATA';
export const DB_METADATA = 'DB_METADATA';
export const TABLES_COLUMNS_METADATA = 'TABLES_COLUMNS_METADATA';

export const FN_MAP = {
  [TABLE_METADATA]: new ExtractDbDataProps(processTableColumns, SQL_TABLE_COLUMNS, DB_CONNECT_ERR_MSG),
  [TABLES_COLUMNS_METADATA]: new ExtractDbDataProps(processTablesAndColumns, SQL_TABLES_AND_COLUMNS, DB_CONNECT_ERR_MSG),
  [DB_METADATA]: new ExtractDbDataProps(processTableNames, SQL_TABLE_NAMES, DB_CONNECT_ERR_MSG),
};
