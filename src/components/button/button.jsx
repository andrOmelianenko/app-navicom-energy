import React, { PureComponent, createElement } from 'react'; // eslint-disable-line
import PropTypes from 'prop-types';
import classNames from 'classnames';
import s from './style/button.sass';

/**
 * Button component
 */
export default class Button extends PureComponent {
  static propTypes = {
    /**
     * The tabIndex attribute for button
     */
    tabIndex: PropTypes.number,
    /**
     * The URL to link to when the button is clicked
     */
    href: PropTypes.string,
    /**
     * This is what will be displayed inside the button
     */
    children: PropTypes.node.isRequired,
    /**
     * Callback function fired when the button is clicked
     */
    onClick: PropTypes.func,
    /**
     * Disables the button if set to true
     */
    disabled: PropTypes.bool,
    /**
     * The CSS class name of the root element
     */
    className: PropTypes.string,
    primary: PropTypes.bool,
  };

  static defaultProps = {
    tabIndex: 0,
    href: undefined,
    onClick: null,
    disabled: false,
    className: '',
    primary: false,
  };

  /**
   * If component is link
   * @return {boolean}
   */
  isLink() {
    const { disabled, href } = this.props;

    return href && !disabled;
  }

  /**
   * render
   * @return {ReactElement} markup
   */
  render() {
    const {
      href,
      children,
      className,
      primary,
      ...other
    } = this.props;
    const isLink = this.isLink();

    return createElement(isLink ? 'a' : 'button', {
      href: isLink ? href : null,
      'data-component': 'button',
      className: classNames(
        s.button,
        {
          [s.m_default]: !primary,
          [s.m_primary]: primary,
        },
        className,
      ),
      ...other,
    }, children);
  }
}
