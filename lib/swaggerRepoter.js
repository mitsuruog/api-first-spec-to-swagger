'use strict';

const fs = require('fs');
const ParameterObject = require('./parameterObject');
const ResponseObject = require('./responseObject');
const SwaggerStructure = require('./swaggerStructure');

let swaggerSchema = Object.assign({}, SwaggerStructure.SCHEMA);

function swaggerRepoter(define) {
  let operationObject = JSON.parse(JSON.stringify(SwaggerStructure.OPERATION_OBJECT));
  let responseObject = JSON.parse(JSON.stringify(SwaggerStructure.RESPONSE_OPJECT));
  let pathItemObject = JSON.parse(JSON.stringify(SwaggerStructure.PATH_ITEM_OBJECT));

  if (define.request) {
    if (define.name) operationObject.summary = define.name;
    if (define.description) operationObject.description = define.description;
    if (define.request.contentType) operationObject.consumes.push(define.request.contentType);
    operationObject.parameters = ParameterObject.create(define.method.toLowerCase(), define.request);
  }
  if (define.response) {
    if (define.response.contentType) operationObject.produces.push(define.response.contentType);
    operationObject.responses[200] = ResponseObject.create(responseObject, 'schema', null, define.response.data, define.response.rules);
  }

  pathItemObject[define.method.toLowerCase()] = operationObject;
  swaggerSchema.paths[define.endpoint] = pathItemObject;

  fs.writeFileSync(`./.apifs2swagger/swagger.json`, JSON.stringify(swaggerSchema, null, 2));
}

module.exports = swaggerRepoter;
