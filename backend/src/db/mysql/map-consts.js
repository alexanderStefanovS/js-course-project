
import {processTableColumns, processTableNames, processTablesAndColumns} from './process-mysql-data.js';
import {SQL_TABLES_AND_COLUMNS, SQL_TABLE_COLUMNS, SQL_TABLE_NAMES, DB_CONNECT_ERR_MSG} from './mysql-queries.js';
import {ExtractDbDataProps} from '../../classes/extract-db-data-props.js';
import {TABLE_METADATA, TABLES_COLUMNS_METADATA, DB_METADATA} from '../query-types.js';

export const FN_MAP = {
  [TABLE_METADATA]: new ExtractDbDataProps(processTableColumns, SQL_TABLE_COLUMNS, DB_CONNECT_ERR_MSG),
  [TABLES_COLUMNS_METADATA]: new ExtractDbDataProps(processTablesAndColumns, SQL_TABLES_AND_COLUMNS, DB_CONNECT_ERR_MSG),
  [DB_METADATA]: new ExtractDbDataProps(processTableNames, SQL_TABLE_NAMES, DB_CONNECT_ERR_MSG),
};
