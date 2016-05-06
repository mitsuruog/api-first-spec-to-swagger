'use strict';

const ruleDecorator = require('./ruleDecorator');
const ResponseProperty = require('./responseProperty');

function createIn(method) {
  // TODO
  return method === 'get' ? 'query' : 'formData';
}

function createParameterObject(method, request) {
  const ruleKeys = request.rules ? Object.keys(request.rules) : [];
  const paramKeys = Object.keys(request.params);
  let result = [];

  paramKeys.forEach((paramKey) => {
    var param = ResponseProperty.create(request.params[paramKey]);
    param.name = paramKey;
    param.in = createIn(method);

    ruleKeys.forEach((ruleKey) => {
      if (paramKey === ruleKey) {
        param = ruleDecorator(param, request.rules[ruleKey]);
      }
    });
    result.push(param);
  });

  return result;
}

exports.create = createParameterObject;
