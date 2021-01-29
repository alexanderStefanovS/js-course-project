
import {MYSQL} from './db-types.js';
import {getMySQLMetadata, testMySQLConnection} from './mysql/mysql-util.js';

export function testConnection(dbType, connectionData) {
  let testDbFn;

  switch (dbType) {
    case MYSQL: testDbFn = testMySQLConnection;
  }

  return testDbFn(connectionData);
}

export function extractData(dbType, queryType, connectionData, params) {
  
  let extractDbFn;

  switch (dbType) {
    case MYSQL: extractDbFn = getMySQLMetadata;
  }

  return extractDbFn(connectionData, queryType, params);
}
