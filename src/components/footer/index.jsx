import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withRouter } from 'react-router-dom';
import publicPath from '../../utils/get_build_path';
import s from './styles/index.sass';

function Footer(props) {
  const { location } = props;
  const show = location.pathname === `${publicPath}/`;

  return (
    <div className={s.footer}>
      <div className={classNames(
          s.mouse_detector,
          {
            [s.m_hide]: !show,
          },
        )}
      >
        <div className={s.ping} />
      </div>
    </div>
  );
}

Footer.propTypes = {
  location: PropTypes.oneOfType([
    PropTypes.object,
  ]),
};

Footer.defaultProps = {
  location: {},
};

export default withRouter(Footer);
