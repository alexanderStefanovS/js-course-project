
import {DATABASE_TYPES} from './db-types.js';

const [MYSQL, POSTGRE] = DATABASE_TYPES;

export const DATA_TYPES_MAP = { 
  [MYSQL]: {
    int: 'number',
    varchar: 'string',
    date: 'Date', 
    text: 'string',
    datetime: 'Date'
  },
  [POSTGRE]: {
    'character varying': 'string',
    'varchar': 'string',
    'char': 'string',
    'text': 'string',
    'smallint': 'number',
    'integer': 'number',
    'bigint': 'number',
    'decimal': 'number',
    'numeric': 'number',
    'real': 'number',
    'double precision': 'number',
    'serial': 'number',
    'bigserial': 'number',
    'boolean': 'boolean',
    'timestamp': 'Date',
    'timestamp without time zone': 'Date',
    'timestamp with time zone': 'Date',
    'date': 'Date',
    'time': 'Date',
  }
};
