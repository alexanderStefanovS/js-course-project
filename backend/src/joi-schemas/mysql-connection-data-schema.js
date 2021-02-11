
import Joi from 'joi';

export const mysqlConnectionDataSchema = Joi.object({
  host: Joi.string().required(),
  user: Joi.string().required(),
  password: Joi.string().required(),
  database: Joi.string().required()
});
