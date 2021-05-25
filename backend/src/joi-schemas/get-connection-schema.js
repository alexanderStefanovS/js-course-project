
import Joi from 'joi';
import {DATABASE_TYPES} from '../db/db-types.js';
import {mysqlConnectionDataSchema} from './mysql-connection-data-schema.js';

const [MYSQL, POSTGRE] = DATABASE_TYPES;

const CONNECTION_DATA_SCHEMA_TYPE_MAP = {
  [MYSQL]: mysqlConnectionDataSchema,
  [POSTGRE]: mysqlConnectionDataSchema,
};

export function getDbConnectionSchema(dbType) {
  return Joi.object({
    dbType: Joi.string().valid(...DATABASE_TYPES),
    connectionData: CONNECTION_DATA_SCHEMA_TYPE_MAP[dbType] || null
  });
}
