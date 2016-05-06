'use strict';

const ResponseProperty = require('./responseProperty');

function createRuleKey(prev, current) {
  return prev ? `${prev}.${current}` : current;
}

function createResponseObject(responseObject, key, ruleKey, response, rules) {
  if (!response) {
    return responseObject;
  }

  // if Array
  if (Array.isArray(response)) {
    let arraySchema = {};
    responseObject[key] = arraySchema;
    arraySchema.type = 'array';
    return createResponseObject(arraySchema, 'items', createRuleKey(ruleKey, key), response[0], rules);
  }

  // if Object
  if (response !== null && typeof response === 'object') {
    let objectSchema = {};
    responseObject[key] = objectSchema;
    objectSchema.type = 'object';
    objectSchema.properties = {};
    const keys = Object.keys(response);
    keys.forEach((key) => {
      createResponseObject(objectSchema.properties, key, createRuleKey(ruleKey, key), response[key], rules);
    });
    return responseObject;
  }

  // Other
  responseObject[key] = ResponseProperty.create(response);
  // TODO なんかおかしい
  // if(rules[ruleKey]) ruleDecorator(responseObject[key], rules[ruleKey]);

  return responseObject;
}

exports.create = createResponseObject;
