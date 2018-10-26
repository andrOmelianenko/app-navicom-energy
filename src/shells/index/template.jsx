import React from 'react';
import PropTypes from 'prop-types';
import Noscript from './noscript';
import * as CONFIG from '../../../bundler/config';
import PreloaderIcon from '../../components/preloader';
import s from './styles/basic_styles.sass';
import publicPath from '../../utils/get_build_path';

const RootShell = props => (
  <html lang="en">
    <head>
      <meta charSet="UTF-8" />
      <meta name="viewport" content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0" />
      <meta httpEquiv="X-UA-Compatible" content="ie=edge" />
      <title>
        {props.title}
      </title>
      <style
        dangerouslySetInnerHTML={{
          __html: `
            @font-face {
              font-family: "HelveticaNeueCyr";
              font-style: normal;
              font-weight: 300;
              src: url("${CONFIG.GIT_URL}/assets/fonts/HelveticaNeueCyr-Light.eot");
              src: url("${CONFIG.GIT_URL}/assets/fonts/HelveticaNeueCyr-Light.woff") format("woff"), url("${CONFIG.GIT_URL}/assets/fonts/HelveticaNeueCyr-Light.ttf") format("truetype")
            }

            @font-face {
              font-family: "HelveticaNeueCyr";
              font-style: normal;
              font-weight: 400;
              src: url("${CONFIG.GIT_URL}/assets/fonts/HelveticaNeueCyr-Roman.eot");
              src: url("${CONFIG.GIT_URL}/assets/fonts/HelveticaNeueCyr-Roman.woff") format("woff"), url("${CONFIG.GIT_URL}/assets/fonts/HelveticaNeueCyr-Roman.ttf") format("truetype")
            }
            #scroll_container {
              -webkit-overflow-scrolling: touch;
            }
          `,
        }}
      />
      <style dangerouslySetInnerHTML={{ __html: props.inlineStyles }} />
      <link href={`${CONFIG.GIT_URL}/assets/styles/onepage-scroll.css`} rel="stylesheet" />
      <noscript>
        <Noscript />
      </noscript>
    </head>
    <body>
      <div
        className={s.root}
        id="root"
        style={{
          backgroundImage: `url(${publicPath}/assets/images/grain-texture.png), radial-gradient(ellipse at center, #3549d8 0%,#1c2974 100%)`,
        }}
      >
        <PreloaderIcon />
      </div>
      {props.disableReactDevTools && (
        <script
          dangerouslySetInnerHTML={{
            __html: "if (typeof window.__REACT_DEVTOOLS_GLOBAL_HOOK__ === 'object') {window.__REACT_DEVTOOLS_GLOBAL_HOOK__.inject = function() {}}",
          }}
        />
      )}
      <script defer="" src="https://cdnjs.cloudflare.com/ajax/libs/fetch/2.0.4/fetch.min.js" />
      <script
        type="text/javascript"
        charSet="utf-8"
        defer=""
        src={`${CONFIG.GIT_URL}/assets/scripts/onepagescroll.min.js`}
      />
      <script
        type="text/javascript"
        charSet="utf-8"
        defer=""
        src={`${CONFIG.GIT_URL}/bootstrap_${CONFIG.HASH}.js`}
      />
      {props.initServiceWorker && (
        <script
          dangerouslySetInnerHTML={{
            __html: `if ('serviceWorker' in window.navigator) {
              window.navigator.serviceWorker.register('${CONFIG.GIT_URL}/service_worker.js');
            }`,
          }}
        />
      )}
    </body>
  </html>
);

RootShell.propTypes = {
  title: PropTypes.string,
  inlineScripts: PropTypes.arrayOf(PropTypes.string), // eslint-disable-line
  inlineStyles: PropTypes.arrayOf(PropTypes.string),
  initServiceWorker: PropTypes.bool,
  disableReactDevTools: PropTypes.bool,
};

RootShell.defaultProps = {
  title: 'App',
  inlineScripts: [],
  inlineStyles: [],
  initServiceWorker: false,
  disableReactDevTools: false,
};

export default RootShell;
