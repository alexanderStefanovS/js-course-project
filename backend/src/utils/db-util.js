
import {ConnectionData} from '../classes/connection-data.js';
import mysql from 'mysql';
import {ErrorResponse} from '../classes/error-response.js';
import {processTableNames, processTableColumns} from '../functions/process-db-data.js';

const SQL_TABLE_NAMES = 'SELECT table_name FROM information_schema.tables WHERE table_schema = \'reservation_system\'';
const SQL_TABLE_COLUMNS = 'SHOW COLUMNS FROM ??';
const DB_CONNECT_ERR_MSG = 'Error connecting database: ';

function connect(connection) {
  return new Promise((resolve, reject) => {
    connection.connect((err) => {
      if (err) {
        reject(err);
        return;
      }
      resolve();
    });
  });
}

function end(connection, results) {
  return new Promise((resolve, reject) => {
    connection.end((err) => {
      if (err) {
        reject(err);
        return;
      }
      resolve(results);
    });
  });
}

function query(connection, sql, values) {
  return new Promise((resolve, reject) => {
    connection.query(sql, values, function(err, results, fields) {
      if (err) {
        reject(err);
        return;
      }
      resolve(results);
    });
  });
}

export function testConnection(data) {
  const connectionData = new ConnectionData(data);
  const connection = mysql.createConnection(connectionData);

  return connect(connection)
    .then(() => end(connection, null))
    .then(() => true)
    .catch((err) => {
      return new ErrorResponse(err.sqlMessage, `${DB_CONNECT_ERR_MSG} ${connectionData.database}`);
    });
}

export function getDatabaseMetadata(data) {
  const connectionData = new ConnectionData(data);
  const connection = mysql.createConnection(connectionData);

  return connect(connection)
    .then(() => query(connection, SQL_TABLE_NAMES, []))
    .then((results) => end(connection, results))
    .then((results) => processTableNames(results))
    .catch((err) => {
      return new ErrorResponse(err.sqlMessage, `${DB_CONNECT_ERR_MSG} ${connectionData.database}`);
    });
} 

export function getTableMetadata(data, tableName) {
  const connectionData = new ConnectionData(data);
  const connection = mysql.createConnection(connectionData);

  console.log(tableName);

  return connect(connection)
    .then(() => query(connection, SQL_TABLE_COLUMNS, [`${connectionData.database}.${tableName}`]))
    .then((results) => end(connection, results))
    .then((results) => processTableColumns(results))
    .catch((err) => {
      return new ErrorResponse(err.sqlMessage, `${DB_CONNECT_ERR_MSG} ${connectionData.database}`);
    });
}
