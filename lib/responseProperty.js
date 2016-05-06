'use strict';

function createResponseProperty(type) {
  let property = {};

  if (Array.isArray(type)) {
    property.type = 'array';
    property.items = createResponseProperty(type[0]);
    return property;
  }

  if (type !== null && typeof type === 'object') {
    property.type = 'object';
    property.schema = {
      properties: {}
    };
    const keys = Object.keys(type);
    keys.forEach((key) => {
      property.schema.properties[key] = createResponseProperty(type[key]);
    });
    return property;
  }

  switch (type) {
    case 'string':
      property.type = 'string';
      break;
    case 'int':
      property.type = 'integer';
      break;
    case 'number':
      property.type = 'number';
      break;
    case 'boolean':
      property.type = 'boolean';
      break;
    case 'date':
      property.type = 'string';
      property.format = 'date';
      break;
    case 'datetime':
      property.type = 'string';
      property.format = 'date-time';
      break;
    case 'bit':
      property.type = 'number';
      property.enum = [0, 1];
      break;
    case 'any':
      // TODO
      break;
    default:
  }
  return property;
}

exports.create = createResponseProperty;
