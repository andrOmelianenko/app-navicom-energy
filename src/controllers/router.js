export default class RouterController {
  static prepareRouteRegexp(route) {
    let str = route;
    str = str.replace(/:[^/]+/g, '((?:(?:%\\d{1,3})|[A-z!@#$%^&*\\d])+)');
    str = str.replace(/\*/, '.+');

    let gitPathname = '';
    if (/https:\/\/([a-z-A-Z])\w+.github.io/g.exec(window.location.href)) {
      const pathname = /\/[^/]+/.exec(window.location.pathname);
      if (pathname) {
        gitPathname = pathname[0];
      }
    }

    const regexp = new RegExp(`^${gitPathname}${str}\\/?$`);

    return regexp;
  }

  static getParams(route) {
    const result = [];
    const regExp = /:([^/]+)/g;
    let match = regExp.exec(route);

    while (match) {
      result.push(match[1]);
      match = regExp.exec(route);
    }

    return result;
  }

  static paramValues(params, values) {
    const result = {};

    for (const key in params) {
      result[params[key]] = values[+key + 1];
    }

    return result;
  }

  constructor() {
    this.matched = false;
    this.prevRoute = '';

    this.routes = [];

    window.router = this;

    window.onpopstate = ::this.onPathChange;
  }

  checkRoute(route) {
    const pathname = window.location.pathname;
    const paramValues = route.regExp.exec(pathname);

    if (paramValues) {
      if (this.prevRoute !== pathname || !this.matched) {
        this.matched = true;
        this.prevRoute = pathname;
        route.callback(RouterController.paramValues(route.params, paramValues));
        return true;
      }
    }

    return false;
  }

  onRoute(routes, callback) {
    for (const route of routes) {
      const regExp = RouterController.prepareRouteRegexp(route);
      this.routes.push({
        route,
        regExp,
        params: RouterController.getParams(route),
        callback,
      });

      if (this.checkRoute(this.routes[this.routes.length - 1])) {
        break;
      }
    }
  }

  onPathChange() {
    for (const route of this.routes) {
      if (this.checkRoute(route)) {
        break;
      }
    }
  }

  push(path) { // eslint-disable-line
    window.history.pushState({}, null, path);
  }

  replace(path) { // eslint-disable-line
    window.history.replaceState({}, null, path);
  }

  back() { // eslint-disable-line
    window.history.back();
  }

  forward() { // eslint-disable-line
    window.history.forward();
  }
}
