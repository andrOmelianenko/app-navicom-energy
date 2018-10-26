import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import s from './styles/index.sass';

export default function Preloader(props) {
  return (
    <div className={classNames(s.preloader, props.className)}>
      <div>
        <div className={s.horizontal_border} />
        <div className={s.horizontal_border} />
        <div className={s.vertical_border} />
        <div className={s.vertical_border} />
      </div>
      <div>
        <div className={s.container_logo_line}>
          <div className={s.logo_line} />
        </div>
        <div className={classNames(s.container_logo_line, s.line_second)}>
          <div className={s.logo_line} />
        </div>
        <div className={classNames(s.container_logo_line, s.line_third)}>
          <div className={s.logo_line} />
        </div>
        <div className={classNames(s.container_logo_line, s.line_fourth)}>
          <div className={s.logo_line} />
        </div>
        <div className={classNames(s.container_logo_line, s.line_fifth)}>
          <div className={s.logo_line} />
        </div>
        <div className={classNames(s.container_logo_line, s.line_sixth)}>
          <div className={s.logo_line} />
        </div>
      </div>
      <div>
        <div className={s.container_central_line}>
          <div className={s.logo_center_line} />
        </div>
        <div className={classNames(s.container_central_line, s.central_second)}>
          <div className={s.logo_center_line} />
        </div>
      </div>
    </div>
  );
}

Preloader.defaultProps = {
  className: '',
};

Preloader.propTypes = {
  className: PropTypes.string,
};
