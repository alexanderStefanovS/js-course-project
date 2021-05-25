
import pgPromise from 'pg-promise';
import {PostgreConnectionData} from './postgre-connection-data.js';
import {ErrorResponse} from '../../classes/error-response.js';
import {DB_CONNECT_ERR_MSG} from '../../constants/error-messages.js';
import {FN_MAP} from './map-consts.js';

const pgp = pgPromise();
const {PreparedStatement} = pgPromise;

function getPostgreDSN(data) {
  const connectionData = new PostgreConnectionData(data);
  return `postgres://${connectionData.user}:${connectionData.password}@${connectionData.host}/${connectionData.database}`;
}

export function testPostgreConnection(data) {
  const connectionData = new PostgreConnectionData(data);
  const dsn = getPostgreDSN(data);
  const db = pgp(dsn);

  let sco = null;
  return db.connect()
    .then((obj) => {
      sco = obj;
      return true;
    })
    .catch((err) => {
      throw ErrorResponse(err.code, `${DB_CONNECT_ERR_MSG} ${connectionData.database}`);
    })
    .finally(() => closeConnection(sco, db));
}

export function getPostgreMetadata(data, type, params) {
  return extractPostgreData(FN_MAP[type], params, data);
}

function extractPostgreData({sql, processFn, errMsg}, params, data) {
  const connectionData = new PostgreConnectionData(data);
  const dsn = getPostgreDSN(connectionData);
  const db = pgp(dsn);

  let sco = null;
  return db.connect()
    .then((obj) => {
      sco = obj;
      return query(sco, sql, params);
    })
    .then((results) => processFn(results))
    .catch((err) => {
      throw new ErrorResponse(err.code, `${errMsg}${connectionData.database}`); 
    })
    .finally(() => closeConnection(sco, db));
}

function query(sco, sql, params) {
  const ps = new PreparedStatement({name: 'metadata-query', text: sql});
  return sco.any(ps, params);
}

function closeConnection(sco, db) {
  if (sco) {
    sco.done();
  }
  db.$pool.end();
}
