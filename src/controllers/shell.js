import { IntlDOM } from 'lib-pintl';
import UUID from '../utils/uuid';
import publicPath from '../utils/get_build_path';

export default class PageController {
  constructor(name) {
    this.name = name;
    this.langs = {};
    this.styles = {};
    this.templates = {};
    this.langs = {};
  }

  init(app, props) {
    import(`../shells/${this.name}/manifest.js`)
      .then(m => m.default(app, props));
  }

  mountTemplate(name) {
    return Promise.all([
      this.fetchAndMountStyles(name),
      this.fetchAndMountTemplate(name),
    ]);
  }

  localizeTemplate(lang) {
    IntlDOM.translateFragment(this.langs[lang], document.getElementById('root'));

    return Promise.resolve();
  }

  fetchAndMountTemplate(name) {
    if (!this.templates[name]) {
      return fetch(`${publicPath}/shells/${this.name}/${name}.html`)
        .then(res => res.text())
        .then((template) => {
          this.templates[name] = template;
          document.querySelector('#root').innerHTML = template;

          return Promise.resolve();
        });
    }

    document.querySelector('#root').innerHTML = this.templates[name];

    return Promise.resolve();
  }

  fetchAndMountStyles(name) {
    if (!this.styles[name]) {
      return new Promise((res, rej) => {
        const id = UUID();
        const style = document.createElement('link');
        style.id = id;
        style.rel = 'stylesheet';
        style.href = `${publicPath}/shells/${this.name}/${name}.css`;
        style.onload = res;
        style.onerror = rej;

        this.styles[name] = style;
        document.head.appendChild(style);
      });
    }

    document.head.appendChild(this.styles[name]);

    return Promise.resolve();
  }

  mountLang(name) {
    if (!this.langs[name]) {
      return import(`../assets/langs/${name}/${this.name}.yaml`)
        .then((lang) => {
          this.langs[name] = lang;

          return Promise.resolve(lang);
        });
    }

    return Promise.resolve(this.langs[name]);
  }

  unmountTemplate(name) {
    this.removeStyles(name);
    this.clearHTML(name);

    return Promise.resolve();
  }

  removeStyles(name) {
    if (this.styles[name]) {
      document.head.removeChild(this.styles[name]);
    }
  }

  mountScript(name) {
    return import(`../shells/${this.name}/scripts/${name}.js`);
  }

  clearHTML() { // eslint-disable-line
    document.querySelector('#root').innerHTML = null;
  }
}
