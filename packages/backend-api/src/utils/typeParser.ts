/**
 * Type Parser Class
 * Convert raw string to a specific format
 */

import { isNil } from 'lodash';
import moment from 'moment';

export type Json = { [name: string]: any };

const toString = (val: any): string => {
  return isNil(val) ? null : String(val).trim();
};

const isEmptyString = (str: string): boolean => {
  return toString(str).trim() === '';
};

const toInt = (val: string): number => {
  if (isEmptyString(val)) {
    return null;
  }

  const result = parseInt(val, 10);
  if (Number.isNaN(result)) {
    throw new Error(`Unable to parse ${val} to data type: "Integer"`);
  }
  return result;
};

const toFloat = (val: string): number => {
  if (isEmptyString(val)) {
    return null;
  }

  const result = parseFloat(val);
  if (Number.isNaN(result)) {
    throw new Error(`Unable to parse ${val} to data type: "Float"`);
  }
  return result;
};

const toDate = (val: string, timezoneOffset: number = 0): Date => {
  const allowedDateFormats = [
    'YYYY-MM-DDTHH:mm:sssZ',
    'YYYY-MM-DDTHH:mm:ssZ',
    'YYYY-MM-DDTHH:mm:sZ',
    'YYYY-MM-DDTHH:mmZ',
    'YYYY-MM-DD HH:mm:sssZ',
    'YYYY-MM-DD HH:mm:ssZ',
    'YYYY-MM-DD HH:mm:sZ',
    'YYYY-MM-DD HH:mm:sss',
    'YYYY-MM-DD HH:mm:ss',
    'YYYY-MM-DD HH:mm:s',
    'YYYY-MM-DD HH:mm',
    'YYYY-MM-DD',
    'DD/MM/YYYY',
    'D/M/YYYY',
  ];

  if (!isEmptyString(val)) {
    const date = moment(val, allowedDateFormats, true);
    if (date.isValid()) {
      // localOffset for adapting to different server local timezones
      const localOffset = date.toDate().getTimezoneOffset();
      return date.subtract(timezoneOffset + localOffset, 'minute').toDate();
    }
    throw new Error(`Unable to parse ${val} to data type: "Date"`);
  }

  return null;
};

const toBool = (val: string | number | boolean): boolean => {
  return val === true || val === 1 || val === '1' || val === 'true';
};

const toJSON = (val: string): Json => {
  let result = {};
  try {
    result = JSON.parse(val);
  } catch (err) {
    throw new Error(`Unable to parse ${val} to data type: "JSON"`);
  }
  return result;
};

class TypeParser {
  static parse(val: string, type: string, options: any = {}) {
    let result: any = val;

    if (isNil(type)) {
      throw new Error(`Unknown data type: ${type}`);
    }

    try {
      switch (type.toUpperCase()) {
        case 'INTEGER':
          result = toInt(val);
          break;
        case 'FLOAT':
        case 'DOUBLE':
          result = toFloat(val);
          break;
        case 'DATE':
          const { timezoneOffset = 0 } = options; // eslint-disable-line no-case-declarations
          result = toDate(val, timezoneOffset);
          break;
        case 'STRING':
          result = toString(val);
          break;
        case 'BOOLEAN':
          result = toBool(val);
          break;
        case 'JSON':
          result = toJSON(val);
          break;
        default:
          throw new Error(
            `Unable to parse ${val} to unknown data type: ${type}`
          );
      }
    } catch (err) {
      console.error(err.stack);
      throw err;
    }
    return result;
  }
}

export default TypeParser;
