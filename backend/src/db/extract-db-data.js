
import {DATABASE_TYPES} from './db-types.js';
import {getMySQLMetadata, testMySQLConnection} from './mysql/mysql-util.js';
import {testPostgreConnection, getPostgreMetadata} from './postgre/postgre-utils.js';

const [MYSQL, POSTGRE] = DATABASE_TYPES;

export function testConnection(dbType, connectionData) {
  let testDbFn;

  switch (dbType) {
    case MYSQL: testDbFn = testMySQLConnection; break;
    case POSTGRE: testDbFn = testPostgreConnection; break;
  }

  return testDbFn ? testDbFn(connectionData) : Promise.resolve(false);
}

export function extractData(dbType, queryType, connectionData, params) {
  let extractDbFn;
  
  switch (dbType) {
    case MYSQL: extractDbFn = getMySQLMetadata; break;
    case POSTGRE: extractDbFn = getPostgreMetadata; break;
  }

  return extractDbFn(connectionData, queryType, params);
}
