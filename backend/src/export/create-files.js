
import {DATA_TYPES_MAP} from '../db/data-types-map.js';
import {mkdir, writeFile} from 'fs';
import {join, resolve} from 'path';

const GENERATED_FILES_DIR = './generated-files';

function prepareClassNameAndFileName(tableName) {
  let className = '';
  let fileName = '';

  [...tableName].forEach((symbol, i) => {
    if (i === 0 || tableName[i - 1] === '_') {
      className = className.concat(symbol.toUpperCase());
      fileName = fileName.concat(symbol);
    } else if (symbol === '_' || symbol === '\r') {
      fileName = fileName.concat('-');
    } else {
      className = className.concat(symbol);
      fileName = fileName.concat(symbol);
    }
  });
  fileName = fileName.concat('.ts');

  return [className, fileName];
}

function prepareClassHeader(className) {
  return `\nexport class ${className} {\n\n`;
}

function prepareFieldName(columnName) {
  return [...columnName].reduce((fieldName, symbol, i) => {
    if (columnName[i - 1] === '_') {
      fieldName = fieldName.concat(symbol.toUpperCase());
    } else if (symbol !== '_' && symbol !== '\r') {
      fieldName = fieldName.concat(symbol);
    }
    return fieldName;
  }, '');
}

function getType(dbType, columnType) {
  return DATA_TYPES_MAP[dbType][columnType] || 'any';
}

function prepareFields(dbType, columns) {
  return columns.reduce((fields, column) => {
    const fieldName = prepareFieldName(column.columnName);
    const fieldType = dbType ? getType(dbType, column.dataType) : column.dataType;
    // const field = `\tprivate _${fieldName}: ${fieldType};\n`;
    const field = `\tpublic ${fieldName}: ${fieldType};\n`;
    return fields.concat(field);
  }, '');
}

function prepareConstructor(className, columns) {
  let constructor = `\n\tconstructor(init?: Partial<${className}>) {\n\t\tif (init) {\n`;
  constructor = columns.reduce((constr, column) => {
    const fieldName = prepareFieldName(column.columnName);
    constr = constr.concat(`\t\t\tthis.${fieldName} = init.${fieldName};\n`);
    return constr;
  }, constructor);
  constructor = constructor.concat('\t\t}\n\t}\n');

  return constructor;
}

function generateGetter(field, type) {
  return `\n\tpublic get ${field}(): ${type} {\n\t\treturn this._${field};\n\t}`;
}

function generateSetter(field, type) {
  return `\n\tpublic set ${field}(value: ${type}) {\n\t\tthis._${field} = value;\n\t}`;
}

function prepareGettersAndSetters(dbType, columns) {
  return columns.reduce((acc, column) => {
    const fieldName = prepareFieldName(column.columnName);
    const fieldType = dbType ? getType(dbType, column.dataType) : column.dataType;
    return acc.concat(`${generateGetter(fieldName, fieldType)}${generateSetter(fieldName, fieldType)}\n`);
  }, '');
}

function prepareClassFooter() {
  return '\n}\n';
}

function createFile(dbType, table, dirname) {
  const [className, fileName] = prepareClassNameAndFileName(table.tableName);
  const classHeader = prepareClassHeader(className);
  const fields = prepareFields(dbType, table.columns);
  const constructor = prepareConstructor(className, table.columns);
  // const gettersAndSetters = prepareGettersAndSetters(dbType, table.columns);
  const classFooter = prepareClassFooter();
  
  // const content = ''.concat(classHeader, fields, constructor, gettersAndSetters, classFooter);
  const content = ''.concat(classHeader, fields, constructor, classFooter);

  const path = join(dirname, fileName);
  return writeInFile(path, content);
}

function getDateAndTime() {
  const date = new Date();
  return `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}-${date.getHours()}-${date.getMinutes()}-${date.getSeconds()}`;
}

function writeInFile(path, content) {
  return new Promise((resolve, reject) => {
    writeFile(path, content, (err) => {
      if (err) {
        reject(err);
        return;
      }
      resolve();
    });
  });
}

function mkDir(dirname) {
  return new Promise((resolve, reject) => {
    mkdir(dirname, (err) => {
      if (err) {
        reject(err);
        return;
      }
      resolve();
    });
  });
}

function createFiles(dbType, tables, dirname) {
  const filesPromises = tables.reduce((promises, table) => {
    promises.push(createFile(dbType, table, dirname));
    return promises;
  }, []);

  return Promise.all(filesPromises);
}

export function generateFiles(dbType, tables, database) {
  const dateAndTime = getDateAndTime();
  const name = database ? `${database}-${dateAndTime}` : `${dateAndTime}`;
  const dirname = resolve(`${GENERATED_FILES_DIR}/${name}`);

  return mkDir(dirname)
    .then(() => createFiles(dbType, tables, dirname))
    .then(() => dirname)
    .catch((err) => err);
}
