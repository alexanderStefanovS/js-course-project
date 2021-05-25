
import {processTableColumns, processTableNames} from '../process-db-data.js';
import {SQL_TABLE_COLUMNS, SQL_TABLE_NAMES} from './postgre-queries.js';
import {ExtractDbDataProps} from '../../classes/extract-db-data-props.js';
import {TABLE_METADATA, DB_METADATA} from '../query-types.js';
import {DB_CONNECT_ERR_MSG} from '../../constants/error-messages.js';
import {DATABASE_TYPES} from '../db-types.js';

const [MYSQL] = DATABASE_TYPES;

export const FN_MAP = {
  [TABLE_METADATA]: new ExtractDbDataProps(processTableColumns.bind(null, MYSQL), SQL_TABLE_COLUMNS, DB_CONNECT_ERR_MSG),
  [DB_METADATA]: new ExtractDbDataProps(processTableNames.bind(null, MYSQL), SQL_TABLE_NAMES, DB_CONNECT_ERR_MSG),
};
