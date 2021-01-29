
import {MYSQL} from './db-types.js';

export const DATA_TYPES_MAP = { 
  [MYSQL]: {
    int: 'number',
    varchar: 'string',
    date: 'Date', 
    text: 'string',
    datetime: 'Date'
  } 
};
