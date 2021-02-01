
import {DATABASE_TYPES} from './db-types.js';

const [MYSQL] = DATABASE_TYPES;

export const DATA_TYPES_MAP = { 
  [MYSQL]: {
    int: 'number',
    varchar: 'string',
    date: 'Date', 
    text: 'string',
    datetime: 'Date'
  } 
};
