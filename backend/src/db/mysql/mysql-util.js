
import {MySQLConnectionData} from './mysql-connection-data.js';
import mysql from 'mysql';
import {ErrorResponse} from '../../classes/error-response.js';
import {DB_CONNECT_ERR_MSG} from './mysql-queries.js';
import {FN_MAP} from './map-consts.js';

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

export function testMySQLConnection(data) {
  const connectionData = new MySQLConnectionData(data);
  const connection = mysql.createConnection(connectionData);

  return connect(connection)
    .then(() => end(connection, null))
    .then(() => true)
    .catch((err) => {
      return new ErrorResponse(err.code, `${DB_CONNECT_ERR_MSG} ${connectionData.database}`);
    });
}

export function getMySQLMetadata(data, type, params) {
  return extractMysqlData(FN_MAP[type], params, data);
}

function extractMysqlData({sql, processFn, errMsg}, params, data) {
  const connectionData = new MySQLConnectionData(data);
  const connection = mysql.createConnection(connectionData);
  return connect(connection)
    .then(() => query(connection, sql, params))
    .then((results) => end(connection, results))
    .then((results) => processFn(results))
    .catch((err) => new ErrorResponse(err.sqlMessage, `${errMsg}${connectionData.database}`));
}
