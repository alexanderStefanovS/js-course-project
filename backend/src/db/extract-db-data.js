
import {DATABASE_TYPES} from './db-types.js';
import {getMySQLMetadata, testMySQLConnection} from './mysql/mysql-util.js';

const [MYSQL] = DATABASE_TYPES;

export function testConnection(dbType, connectionData) {
  let testDbFn;

  switch (dbType) {
    case MYSQL: testDbFn = testMySQLConnection;
  }

  return testDbFn ? testDbFn(connectionData) : Promise.resolve(false);
}

export function extractData(dbType, queryType, connectionData, params) {
  
  let extractDbFn;
  
  switch (dbType) {
    case MYSQL: extractDbFn = getMySQLMetadata;
  }

  return extractDbFn(connectionData, queryType, params);
}
