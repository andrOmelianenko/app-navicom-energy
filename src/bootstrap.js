import AppController from './controllers/app';

const app = new AppController({
  '*': 'main',
});

window.app = app;
