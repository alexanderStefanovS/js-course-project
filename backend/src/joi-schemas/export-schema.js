
import Joi from 'joi';

const COMLUMN_SCHEMA = Joi.object({
  columnName: Joi.string().required(),
  columnKey: Joi.string().empty(''),
  dataType: Joi.string().required(),
  isChecked: Joi.any()
});

const TABLE_SCHEMA = Joi.object({
  tableName: Joi.string().required(),
  columns: Joi.array().items(COMLUMN_SCHEMA).required(),
  isChecked: Joi.any()
});

export const EXPORT_SCHEMA = Joi.array().items(TABLE_SCHEMA);
