# api-first-spec-to-swagger [![Build Status](https://travis-ci.org/mitsuruog/api-first-spec-to-swagger.svg?branch=master)](https://travis-ci.org/mitsuruog/api-first-spec-to-swagger)

> Swagger JSON Converter for [api-first-spec](https://github.com/shunjikonishi/api-first-spec)


## Install

```
$ npm install --save apifs2swagger
```


## Usage

```js
const apifs2swagger = require('apifs2swagger');

apifs2swagger('./**/*.spec.js');
```


## API

### apifs2swagger(input, [options])

#### patterns

Type: `string`

The patterns that should executed files. patterns using [node-glob](https://github.com/isaacs/node-glob).

#### options

##### -o --output

Type: `string`<br>
Default: `docs`

The path that generate static HTML for API docs.


## CLI

```
$ npm install --global apifs2swagger
```

```
$ apifs2swagger --help

  Usage
    $ apifs2swagger [patterns]

  Options
    -o, --output  Output path for API doc. [Default: /docs]

  Examples
    $ apifs2swagger './**/*.spec.js' -o swagger
      swagger/
        index.html
        main.css
    $ apifs2swagger './**/*.spec.js'
      docs/
        index.html
        main.css
```


## License

MIT © [Mitsuru Ogawa](https://github.com/mitsuruog)
