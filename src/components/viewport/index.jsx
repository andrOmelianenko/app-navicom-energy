import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import ReactLoadable from 'react-loadable';
import { Router, Route, Switch, Redirect } from 'react-router-dom';
import { getDeviceInfo } from '../../utils/device_info';
import { SubjectSelector, SubjectCanvas, SubjectInfo } from '../../components/services_components';
import history from '../../utils/history';
import publicPath from '../../utils/get_build_path';
import Header from '../header';
import Footer from '../footer';
import Animation from '../animation';

const Main = ReactLoadable({
  /* webpackChunkName: "main" */
  loader: () => import('../../containers/main/index.jsx')
    .then(module => module.default),
  loading: () => null,
});

const Contact = ReactLoadable({
  /* webpackChunkName: "contact" */
  loader: () => import('../../containers/contact/index.jsx')
    .then(module => module.default),
  loading: () => null,
});

const SuccessfullySended = ReactLoadable({
  /* webpackChunkName: "successfully-sended" */
  loader: () => import('../../containers/successfully_sended/index.jsx')
    .then(module => module.default),
  loading: () => null,
});

export default class Viewport extends Component {
  static propTypes = {
    data: PropTypes.oneOfType([
      PropTypes.object,
    ]),
  };

  static defaultProps = {
    data: {},
  };

  static childContextTypes = {
    data: PropTypes.object,
    langs: PropTypes.object,
    device: PropTypes.object,
  };

  state = {
    device: getDeviceInfo(),
  };

  getChildContext() {
    return {
      data: this.props.data.data,
      langs: this.props.data.langs,
      device: this.state.device,
    };
  }

  componentDidMount() {
    window.addEventListener('resize', this.bindedResize);
  }

  /**
   * Rerender children only if device type changed
   */
  shouldComponentUpdate(nextProps, nextState) {
    const { device } = this.state;
    const { device: deviceNext } = nextState;

    return device.type !== deviceNext.type;
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.bindedResize);
  }

  /**
   * onResize window handler
   */
  onResize() {
    this.setState({
      device: getDeviceInfo(),
    });
  }

  bindedResize = this.onResize.bind(this);

  render() {
    const { data } = this.props;

    console.log('====================================');
    console.log('CONTEXT DATA', data);
    console.log('====================================');

    return (
      <Router history={history}>
        <div style={{ height: '100%' }}>
          <Animation />
          <Header />
          <Switch>
            <Route exact path={`${publicPath}/`} component={Main} />
            <Route path={`${publicPath}/services&equipment`}>
              <Fragment>
                <SubjectSelector />
                <Switch>
                  <Route exact path={`${publicPath}/services&equipment/:name`} component={SubjectCanvas} />
                  <Route exact path={`${publicPath}/services&equipment/:name/info`} component={SubjectInfo} />
                  <Redirect to={`${publicPath}/services&equipment/telemetry`} />
                </Switch>
              </Fragment>
            </Route>
            <Route exact path={`${publicPath}/contact`} component={Contact} />
            <Route exact path={`${publicPath}/successfully-sended`} component={SuccessfullySended} />
            <Redirect to={`${publicPath}/`} />
          </Switch>
          <Footer />
        </div>
      </Router>
    );
  }
}
