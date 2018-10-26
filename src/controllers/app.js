import RouterController from './router';
import ShellController from './shell';
import VersionController from './version';
import CONFIG from '../../app_config.json';
import { BUILD_INFO, BUILD_INFO_FILENAME } from '../../bundler/config';
import * as datasource from './datasource';
import selectLanguage from '../utils/select_language';
import publicPath from '../utils/get_build_path';

export default class AppController {
  constructor(aliases) {
    this.datasource = datasource;
    this.router = new RouterController();
    this.shells = {};
    this.containers = {};
    this.backend = false;
    this.defaultLang = CONFIG.default_language;
    this.language = selectLanguage(CONFIG.languages, navigator.languages || [navigator.language])
    || this.defaultLang;

    for (const route in aliases) {
      const name = aliases[route];
      const shell = new ShellController(name);

      this.shells[name] = shell;
      this.router.onRoute([route], params => shell.init(this, params));
    }

    this.vc = new VersionController({
      currentVersion: BUILD_INFO,
      pathToVersionFile: `${publicPath}/${BUILD_INFO_FILENAME}`,
      notifyEvent: function notifyEvent(res, context) {
        if (res.code === 'old_version') {
          context.clear();
        }
      },
    });
  }

  mountLang(shellName) {
    return this.shells[shellName].mountLang(this.language);
  }

  mountTemplate(shellName, templateName) {
    return this.shells[shellName].mountTemplate(templateName);
  }

  localizeTemplate(shellName) {
    return this.shells[shellName].localizeTemplate(this.language);
  }

  unmountTemplate(shellName, templateName) {
    return this.shells[shellName].unmountTemplate(templateName);
  }

  mountScript(shellName, scriptName) {
    return this.shells[shellName].mountScript(scriptName);
  }

  unmountStyle(shellName, styleName) {
    this.shells[shellName].removeStyles(styleName);

    return Promise.resolve();
  }

  getDefaultLang(name) {
    return this.shells[name].langs[this.defaultLang];
  }

  mountContainer(name, action) {
    // let container = this.containers[name];

    if (!this.backend) {
      this.backend = import('../backend');
    }

    // if (!container) {
    //   container = import(`../containers/${name}/index.jsx`)
    //     .then((container) => { // eslint-disable-line
    //       this.containers[name] = container;

    //       return Promise.resolve(container);
    //     });
    // }

    return Promise.all([
      this.backend,
    ]).then(([backend]) => {
      backend.delegateAppController(this);
      backend.renderToRoot(action.data);
    });
  }
}
