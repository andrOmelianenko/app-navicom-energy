import React from 'react';
import rimraf from 'rimraf'; // eslint-disable-line
import { renderToStaticMarkup } from 'react-dom/server';
import webpack from 'webpack'; // eslint-disable-line
import ExtractTextPlugin from 'extract-text-webpack-plugin'; // eslint-disable-line
import path from 'path';
import evaluate from 'eval';
import { IntlWrapper } from 'lib-pintl';
import beautify from 'js-beautify';
import uuid from './uuid';

const beautifyHtml = beautify.html;

const renderToStaticDocument = (Component, props) => (
  renderToStaticMarkup(<IntlWrapper inShell><Component {...props} /></IntlWrapper>) // eslint-disable-line
);

const applyLocalizationReplace = (markup = '') => (
  markup.replace(
    /{{([\w\d.]+)}}/g,
    (...arg) => `<span style="display: inline" data-localization-id="${arg[1]}">&nbsp;</span>`,
  )
);

const scriptSourceToSourceHtml = (doctype, sourceJs, sourceCss = '', props = {}, name = 'index') => {
  let template;
  let render;

  try {
    template = evaluate(sourceJs).default;
  } catch (err) {
    throw new Error(`Evaluate error: ${err}`);
  }

  try {
    render = renderToStaticDocument(template, Object.assign(props, {
      inlineStyles: sourceCss,
      inlineScripts: props.inlineScripts,
    }));
    render = applyLocalizationReplace(render);
    if (doctype) {
      render = `<!doctype html>${render}`;
    }
  } catch (err) {
    throw new Error(`renderToStaticMarkup error: ${err}`);
  }

  return {
    name: `${name}.html`,
    source: render,
  };
};

/**
 * @class ShellBundler
 * @example
 *  // use plugin
 *  new StaticRender({
 *    pathToTemplate: path.join(__dirname, 'path/to/file'),
 *    outputHtmlName: 'file_name',
 *    props: {},
 *  })
 *
 * @example
 *  // template
 *  const Template = (props) => (
 *    <html>
 *      <head>
 *        <styles
 *          dangerouslySetInnerHTML={{
 *            __html: this.props.inlineStyles,
 *          }}
 *        />
 *      </head>
 *      <body>
 *        <div className="class">
 *          Content
 *        </div>
 *      </body>
 *    </html>
 *  );
 */
class ShellBundler {
  constructor(options) {
    if (!options) {
      throw new Error('Argument can\'t be empty!');
    }

    if (!Object.keys(options.templatesEntry).length) {
      throw new Error('Argument not valid!');
    }

    this.options = {
      templatesEntry: {},
      outputPathName: '',
      cssToProps: false,
      doctype: true,
      props: {},
    };

    this.options = Object.assign(this.options, options);
  }

  apply(compiler) {
    const { resolve } = compiler.options;
    const {
      templatesEntry,
      outputPathName,
      cssToProps,
      doctype,
      props,
    } = this.options;
    const outputPath = path.join(__dirname, `../../${uuid()}`);
    const extractSASS = new ExtractTextPlugin('[name].css');

    const webpackConfig = {
      resolve,
      module: {
        rules: [
          {
            test: /\.(js|jsx)$/,
            exclude: /node_modules/,
            use: [{
              loader: 'babel-loader',
            }],
          },
          {
            test: /\.css$/,
            use: extractSASS.extract({
              fallback: 'style-loader',
              use: [
                {
                  loader: 'css-loader',
                  options: {
                    importLoaders: 1,
                    modules: true,
                    localIdentName: '[local]_[hash:base64:5]',
                  },
                },
              ],
            }),
          },
          {
            test: /.*basic_.*\.sass$/,
            use: extractSASS.extract({
              fallback: 'style-loader',
              use: [
                'css-loader',
                'sass-loader',
              ],
            }),
          },
          {
            test: /\.sass$/,
            exclude: /.*basic_.*\.sass$/,
            use: extractSASS.extract({
              fallback: 'style-loader',
              use: [
                'css-loader?modules&importLoaders=1&localIdentName=[local]_[hash:base64:5]&minimize=true',
                'sass-loader',
              ],
            }),
          },
        ],
      },
      plugins: [
        extractSASS,
      ],
      cache: false,
      entry: templatesEntry,
      output: {
        path: outputPath,
        libraryTarget: 'umd',
        filename: '[name].js',
      },
    };

    compiler.plugin('emit', (compilation, done) => {
      // add files to compilation fileDependencies
      Object.keys(templatesEntry).forEach((t) => {
        if (compilation.fileDependencies.indexOf(templatesEntry[t]) === -1) {
          compilation.fileDependencies.push(templatesEntry[t]);
        }
      });

      try {
        webpack(webpackConfig, (error, stats) => {
          rimraf.sync(outputPath);
          const compilationErrors = (stats.compilation.errors || []).join('\n');

          if (error || compilationErrors) {
            throw new Error(`Webpack error: ${error || compilationErrors}`);
          }

          const assets = stats.compilation.assets;

          Object.keys(templatesEntry).forEach((name) => {
            const outputCss = assets[`${name}.css`];
            const outputJs = assets[`${name}.js`];

            if (!cssToProps) {
              compilation.assets[`${outputPathName}${name}.css`] = outputCss; // eslint-disable-line
            }

            const htmlSource = scriptSourceToSourceHtml(
              doctype,
              outputJs.source(),
              cssToProps && outputCss ? outputCss.source() : '',
              props,
              name,
            );

            compiler.applyPluginsAsyncWaterfall('shell-bundler-before-html-beatify', htmlSource.source, (error, res) => { // eslint-disable-line
              if (error) {
                throw new Error(`error: ${error}`);
              }
              htmlSource.source = res;
            });

            try {
              htmlSource.source = beautifyHtml(htmlSource.source, {
                indent_size: 2,
              });
            } catch (err) {
              throw new Error(`beautifyHtml error: ${err}`);
            }

            const file = {
              name: htmlSource.name,
              source: () => htmlSource.source,
              size: () => htmlSource.source.length,
            };

            compilation.assets[`${outputPathName}${file.name}`] = file; // eslint-disable-line
          });

          done();
        });
      } catch (error) {
        rimraf.sync(outputPath);
        throw new Error(`Webpack error: ${error}`);
      }
    });
  }
}

module.exports = ShellBundler;
