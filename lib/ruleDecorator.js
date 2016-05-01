'use strict';

function ruleDecorator(target, rules) {
  const keys = Object.keys(rules);
  keys.forEach((key) => {
    switch (key) {
      case 'required':
        target.required = true;
        break;
      case 'min':
        target.exclusiveMinimum = true;
        target.minimum = rules[key];
        break;
      case 'max':
        target.exclusiveMaximum = true;
        target.maximum = rules[key];
        break;
      case 'minlength':
        target.minLength = rules[key];
        break;
      case 'maxlength':
        target.maxLength = rules[key];
        break;
      case 'pattern':
        target.pattern = rules[key];
        break;
      case 'email':
        target.format = 'email';
        break;
      case 'url':
        target.format = 'url';
        break;
      case 'format':
        target.format = rules[key];
        break;
      case 'list':
        // TODO
        break;
    }
  });
  return target;
}

module.exports = ruleDecorator;
