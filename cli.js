#!/usr/bin/env node
'use strict';
var meow = require('meow');
var apifs2swagger = require('./');

var cli = meow([
  'Usage',
  '  $ apifs2swagger [patterns]',
  '',
  'Options',
  '  -o, --output  Output path for API doc. [Default: /docs]',
  '',
  'Examples',
  '  $ apifs2swagger \'./**/*.spec.js\' -o swagger',
  '    swagger/',
  '      index.html',
  '      main.css',
  '  $ apifs2swagger \'./**/*.spec.js\'',
  '    docs/',
  '      index.html',
  '      main.css'
]);

apifs2swagger(cli.input[0], cli.flags);
