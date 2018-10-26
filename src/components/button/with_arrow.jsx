import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Button from './button';
import RightArrowIcon from '../../assets/svg/right_arrow_icon';
import s from './style/with_arrow.sass';

export default function ButtonWithArrow(props) {
  const {
    className, children, arrowPosition, ...other
  } = props;

  return (
    <Button
      className={classNames(
        s.button,
        className,
      )}
      {...other}
      primary={false}
    >
      {arrowPosition === 'left' && (
        <RightArrowIcon
          className={classNames(s.icon, s.m_left)}
        />
      )}
      <span className={s.container}>
        {children}
      </span>
      {arrowPosition === 'right' && (
        <RightArrowIcon
          className={s.icon}
        />
      )}
    </Button>
  );
}

ButtonWithArrow.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  arrowPosition: PropTypes.oneOf(['left', 'right']),
};

ButtonWithArrow.defaultProps = {
  children: null,
  className: '',
  arrowPosition: 'right',
};
