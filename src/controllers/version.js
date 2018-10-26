/**
 * @class VersionController - sw version controller
 * @example
 *  new VersionController({
 *    currentVersion: 'versionId',
 *    pathToVersionFile: 'path/to/build_info.json',
 *    notifyEvent: (res, context) => {
 *      console.log(res, context);
 *    },
 *  });
 */
export default class VersionController {
  constructor(options) {
    this.currentVersion = options.currentVersion;
    this.pathToVersionFile = options.pathToVersionFile;
    this.notifyEvent = options.notifyEvent;
    this.checkDelay = options.checkDelay || 1800000;
    this.autoCheck = options.autoCheck || false;

    this.isSupportedSW = 'serviceWorker' in window.navigator;
    this.checkInterval = null;

    if (this.autoCheck) {
      this._startWatching();
    }
  }

  _startWatching() {
    this.checkInterval = setInterval(this.checkVersion.bind(this), this.checkDelay);
  }

  _stopWatching() {
    clearInterval(this.checkInterval);
  }

  _fetchVersionFile() {
    return fetch(`${this.pathToVersionFile}?${Date.now()}`, {
      method: 'GET',
    });
  }

  checkVersion() {
    this._fetchVersionFile()
      .then(res => res.json())
      .then((res) => {
        if (res.buildInfo !== this.currentVersion) {
          this.notifyEvent({
            code: 'old_version',
            message: 'app have new version',
          }, this);
        } else {
          this.notifyEvent({
            code: 'latest_version',
            message: 'app use latest version',
          }, this);
        }
      })
      .catch((error) => {
        this.notifyEvent({
          code: 'check_error',
          message: 'check version error',
          error,
        }, this);
      });
  }

  clear() {
    if (this.isSupportedSW) {
      window.caches.keys()
        .then(cacheNames => Promise.all( // eslint-disable-line
          cacheNames.map(cacheName =>
            (/(sw-precache|toolbox-cache)/.test(cacheName) ? caches.delete(cacheName) : Promise.resolve()),
          ))) // eslint-disable-line
        .then(() => {
          window.navigator.serviceWorker
            .getRegistrations()
            .then((registrations) => {
              Promise.all(registrations.map(registration => registration.unregister()));
            });
        })
        .catch((error) => {
          this.notifyEvent({
            code: 'clear_error',
            message: 'app clear cache error',
            error,
          }, this);
        })
        .then(() => {
          this.notifyEvent({
            code: 'clear_completed',
            message: 'app clear cache completed',
          }, this);
        });
    } else {
      this.notifyEvent({
        code: 'support_error',
        message: 'browser don\'t support service worker',
      }, this);
    }
  }
}
