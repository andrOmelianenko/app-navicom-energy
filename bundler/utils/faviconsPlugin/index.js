const childCompiler = require('./compiler.js');
const assert = require('assert');
const fs = require('fs');
const path = require('path');

/* eslint-disable */
// var options = {
//   appName: null,                  // Your application's name. `string`
//   appDescription: null,           // Your application's description. `string`
//   developerName: null,            // Your (or your developer's) name. `string`
//   developerURL: null,             // Your (or your developer's) URL. `string`
//   background: "#fff",             // Background colour for flattened icons. `string`
//   theme_color: "#fff",            // Theme color for browser chrome. `string`
//   path: "/",                      // Path for overriding default icons path. `string`
//   display: "standalone",          // Android display: "browser" or "standalone". `string`
//   orientation: "portrait",        // Android orientation: "portrait" or "landscape". `string`
//   start_url: "/?homescreen=1",    // Android start application's URL. `string`
//   version: "1.0",                 // Your application's version number. `number`
//   logging: false,                 // Print logs to console? `boolean`
//   online: false,                  // Use RealFaviconGenerator to create favicons? `boolean`
//   preferOnline: false,            // Use offline generation, if online generation has failed. `boolean`
//   icons: {
//     // Platform Options:
//     // - offset - offset in percentage
//     // - shadow - drop shadow for Android icons, available online only
//     // - background:
//     //   * false - use default
//     //   * true - force use default, e.g. set background for Android icons
//     //   * color - set background for the specified icons
//
//     android: true,              // Create Android homescreen icon. `boolean` or `{ offset, background, shadow }`
//     appleIcon: true,            // Create Apple touch icons. `boolean` or `{ offset, background }`
//     appleStartup: true,         // Create Apple startup images. `boolean` or `{ offset, background }`
//     coast: { offset: 25 },      // Create Opera Coast icon with offset 25%. `boolean` or `{ offset, background }`
//     favicons: true,             // Create regular favicons. `boolean`
//     firefox: true,              // Create Firefox OS icons. `boolean` or `{ offset, background }`
//     windows: true,              // Create Windows 8 tile icons. `boolean` or `{ background }`
//     yandex: true                // Create Yandex browser icon. `boolean` or `{ background }`
//   }
// }
/* eslint-enable */

/**
 * Tries to guess the name from the package.json
 */
function guessAppName(compilerWorkingDirectory) {
  let packageJson = path.resolve(compilerWorkingDirectory, 'package.json');
  if (!fs.existsSync(packageJson)) {
    packageJson = path.resolve(compilerWorkingDirectory, '../../../package.json');
    if (!fs.existsSync(packageJson)) {
      return 'Webpack App';
    }
  }
  return JSON.parse(fs.readFileSync(packageJson)).name;
}

function FaviconsWebpackPlugin(options) {
  if (typeof options === 'string') {
    options = { source: options }; // eslint-disable-line
  }
  assert(typeof options === 'object', 'FaviconsWebpackPlugin options are required');
  assert(options.source, 'An input file is required');

  this.options = Object.assign({
    outputFilePrefix: 'favicons-[hash]/',
    emitStats: false,
    statsFilename: 'favicons-[hash].json',
    persistentCache: true,
    inject: false,
    orientation: 'portrait',
  }, options);

  this.options.icons = Object.assign({
    android: true,
    appleIcon: true,
    appleStartup: false,
    coast: false,
    favicons: true,
    firefox: false,
    opengraph: false,
    twitter: false,
    yandex: false,
    windows: false,
  }, options.icons || {});
}

FaviconsWebpackPlugin.prototype.apply = function f(compiler) {
  const self = this;
  if (!self.options.appName) {
    self.options.appName = guessAppName(compiler.context);
  }

  // Generate the favicons
  let compilationResult;
  compiler.plugin('make', (compilation, callback) => {
    childCompiler.compileTemplate(self.options, compiler.context, compilation)
      .then((result) => {
        compilationResult = result;
        callback();
      })
      .catch(callback);
  });

  // Hook into the html-webpack-plugin processing
  // and add the html
  if (self.options.inject) {
    compiler.plugin('shell-bundler-before-html-beatify', (htmlSource, callback) => {
      if (htmlSource !== false) {
        htmlSource = htmlSource.replace(/(<\/head>)/i, `${compilationResult.stats.html.join('')}$&`); // eslint-disable-line
      }
      callback(null, htmlSource);
    });
  }

  // Remove the stats from the output if they are not required
  if (!self.options.emitStats) {
    compiler.plugin('emit', (compilation, callback) => {
      delete compilation.assets[compilationResult.outputName]; // eslint-disable-line
      callback();
    });
  }
};

module.exports = FaviconsWebpackPlugin;
