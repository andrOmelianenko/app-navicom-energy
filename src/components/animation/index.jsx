import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withRouter } from 'react-router-dom';
import s from './index.sass';

class Animation extends PureComponent {
  static propTypes = {
    location: PropTypes.oneOfType([
      PropTypes.object,
    ]),
  };

  static defaultProps = {
    location: {},
  };

  state = {
    anim: false,
  };

  componentDidUpdate(prevProps) {
    const { pathname, search } = this.props.location;
    const { pathname: prevPathname, search: prevSearch } = prevProps.location;

    if (pathname !== prevPathname || search !== prevSearch) {
      this.setState({ // eslint-disable-line
        anim: !this.state.anim,
      });
    }
  }

  render() {
    const { anim } = this.state;

    return (
      <div className={s.wrapper}>
        <div className={classNames(s.layer, s.m_1, { [s.anim]: anim })}>
          <div />
          <div />
        </div>
        <div className={classNames(s.layer, s.m_2, { [s.anim]: !anim })}>
          <div />
        </div>
        <div className={classNames(s.layer, s.m_3, { [s.anim]: anim })}>
          <div />
          <div />
          <div />
        </div>
        <div className={classNames(s.layer, s.m_4, { [s.anim]: !anim })}>
          <div />
          <div />
          <div />
        </div>
        <div className={classNames(s.layer, s.m_5, { [s.anim]: !anim })}>
          <div />
          <div />
          <div />
        </div>
      </div>
    );
  }
}

export default withRouter(Animation);
