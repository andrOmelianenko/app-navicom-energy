const loaderUtils = require('loader-utils');
const favicons = require('favicons/es5');
const faviconPersitenceCache = require('./cache');

function getPublicPath(compilation) {
  let publicPath = compilation.outputOptions.publicPath || '';
  if (publicPath.length && publicPath.substr(-1) !== '/') {
    publicPath += '/';
  }
  return publicPath;
}

function generateIcons(loader, imageFileStream, pathPrefix, query, callback) {
  const publicPath = getPublicPath(loader._compilation);
  favicons(imageFileStream, {
    ...query,
    path: '',
  }, (err, result) => {
    if (err) return callback(err);
    const html = result.html.map(entry => entry.replace(/(href=[""])/g, `$1${publicPath}${pathPrefix}`));
    const loaderResult = {
      outputFilePrefix: pathPrefix,
      html,
      files: [],
    };
    result.images.forEach((image) => {
      loaderResult.files.push(pathPrefix + image.name);
      loader.emitFile(pathPrefix + image.name, image.contents);
    });
    result.files.forEach((file) => {
      loaderResult.files.push(pathPrefix + file.name);
      loader.emitFile(pathPrefix + file.name, file.contents);
    });

    return callback(null, loaderResult);
  });
}

module.exports = function f(content) {
  const self = this;
  self.cacheable && this.cacheable(); // eslint-disable-line
  if (!self.emitFile) throw new Error('emitFile is required from module system');
  if (!self.async) throw new Error('async is required');

  const callback = self.async();
  const query = loaderUtils.parseQuery(self.query);
  const pathPrefix = loaderUtils.interpolateName(self, query.outputFilePrefix, {
    context: query.context || this.options.context,
    content,
    regExp: query.regExp,
  });
  const fileHash = loaderUtils.interpolateName(self, '[hash]', {
    context: query.context || this.options.context,
    content,
    regExp: query.regExp,
  });
  const cacheFile = `${pathPrefix}.cache`;
  faviconPersitenceCache.loadIconsFromDiskCache(
    self,
    query,
    cacheFile,
    fileHash,
    (err, cachedResult) => {
      if (err) return callback(err);
      if (cachedResult) {
        return callback(null, `module.exports = ${JSON.stringify(cachedResult)}`);
      }
      // Generate icons
      return generateIcons(self, content, pathPrefix, query, (err, iconResult) => { // eslint-disable-line
        if (err) return callback(err);

        faviconPersitenceCache.emitCacheInformationFile(
          self,
          query,
          cacheFile,
          fileHash,
          iconResult,
        );

        return callback(null, `module.exports = ${JSON.stringify(iconResult)}`);
      });
    },
  );
};

module.exports.raw = true;
