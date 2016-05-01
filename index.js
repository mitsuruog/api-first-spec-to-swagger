'use strict';

const glob = require('glob');
const fs = require('fs');
const path = require('path');
const chalk = require('chalk');

const Module = require('module');
const originalRequire = Module.prototype.require;

// Override original module
const sinon = require('sinon');
const spec = require('api-first-spec');
sinon.stub(spec, 'define', require('./lib/swaggerRepoter'));

Module.prototype.require = function () {
  if (arguments[0] === 'api-first-spec') {
    return spec;
  } else {
    return originalRequire.apply(this, arguments);
  }
};

const TMP_DIR = './.apifs2swagger';

module.exports = (patterns, opts) => {

  const outputDir = opts.o || 'docs';

  console.log(chalk.underline(`start processing`));
  console.log(chalk.gray(`patterns: ${patterns}`));
  console.log(chalk.gray(`output dir: ${outputDir}`));

  // file search
  glob(patterns, (err, filenames) => {
    if (err) {
      console.log(chalk.red(err));
      return;
    }
    if (!filenames.length) {
      console.log(chalk.yellow(`WARN pattern "${patterns}" does not match any file.`));
      return;
    }

    // Each files convert to swagger json
    console.log(chalk.underline(`convert to swagger JSON`));
    const prevSkipTest = process.env.API_FIRST_SPEC_SKIP_TEST;
    process.env.API_FIRST_SPEC_SKIP_TEST = true;

    try {
      fs.accessSync(TMP_DIR, fs.F_OK);
    } catch (e) {
      fs.mkdirSync(TMP_DIR);
    }

    filenames.forEach((filename) => {
      console.log(chalk.gray(`processing >> ${filename}`));
      require(path.join(process.cwd(), filename));
    });
    process.env.API_FIRST_SPEC_SKIP_TEST = prevSkipTest;
    console.log(chalk.underline(`convert to swagger JSON completed.`));

    // generate static HTML
    console.log(chalk.underline(`generate API doc`));
    require('bootprint')
      .load(require('bootprint-openapi'))
      .merge({
        less: {
          main: [
            require.resolve('./theme/less/custom.less')
          ]
        },
        handlebars: {
          partials: path.join(__dirname, './theme/partials')
        }
      })
      .build(`${TMP_DIR}/swagger.json`, outputDir)
      .generate()
      .done(() => {
        console.log(chalk.underline(`generate API doc completed.`));
        console.log(chalk.gray(`generated >> ${outputDir}`));
      });

  });

};
