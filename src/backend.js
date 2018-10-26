import React from 'react';
import { render } from 'react-dom';
import Viewport from './components/viewport';

let app = null; // eslint-disable-line

const renderToRoot = (data) => {
  render(React.createElement(
    Viewport,
    { data },
  ), document.getElementById('root'));
};

const delegateAppController = (appController) => {
  app = appController;
};

export {
  delegateAppController,
  renderToRoot,
};
