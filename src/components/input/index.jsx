import React, { createElement, PureComponent } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import validator from '../../utils/validator';
import { SUPPORTED_FIELD_VALIDATION } from './constants';
import s from './styles/index.sass';

/**
 * Input component
 */
export default class Input extends PureComponent {
  static propTypes = {
    /**
     * Element tabIndex.
     */
    tabIndex: PropTypes.number,
    /**
     * The CSS class name of the wrapper element.
     */
    className: PropTypes.string,
    /**
     * The CSS class name of the input element.
     */
    classNameInput: PropTypes.string,
    /**
     * The default input value, useful when not controlling the component.
     */
    defaultValue: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
    ]),
    /**
     * If true, a textarea element will be rendered.
     */
    multiLine: PropTypes.bool,
    /**
     * Callback fired when the value is changed.
     */
    onChange: PropTypes.func,
    /**
     * Type of the input element. It should be a valid HTML5 input type.
     */
    type: PropTypes.string,
    /**
     * The input value, required for a controlled component.
     */
    value: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
    ]),
    /**
     * If true, the input will be required.
     */
    required: PropTypes.bool,
    /**
     * The short hint displayed in the input before the user enters a value.
     */
    placeholder: PropTypes.string,
    /**
     * This is what will be displayed in wrapper component
     */
    children: PropTypes.node,
    /**
     * Name attribute of the input element.
     */
    name: PropTypes.string,
    /**
     * Properties applied to the input element.
     */
    inputProps: PropTypes.oneOfType([
      PropTypes.object,
    ]),
    /**
     * If true, the input will be focused during the first mount.
     */
    autoFocus: PropTypes.bool,
    validation: PropTypes.arrayOf(PropTypes.oneOf(SUPPORTED_FIELD_VALIDATION)),
  };

  static defaultProps = {
    tabIndex: 0,
    className: '',
    classNameInput: '',
    defaultValue: undefined,
    multiLine: false,
    onChange: null,
    type: 'text',
    value: undefined,
    required: false,
    placeholder: undefined,
    children: null,
    name: undefined,
    inputProps: {},
    autoFocus: false,
    validation: undefined,
  };

  static contextTypes = {
    theme: PropTypes.object,
  };

  static validateValue(value, validation) {
    if (validation) {
      return validator(value, validation);
    }

    return true;
  }

  state = {
    valid: Input.validateValue(
      this.props.value || this.props.defaultValue,
      this.props.validation,
    ),
    hasValue: !!(this.props.value || this.props.defaultValue),
  };

  componentWillReceiveProps(nextProps) {
    const { value } = this.props;

    if (value !== nextProps.value) {
      this.setState({
        valid: Input.validateValue(nextProps.value, nextProps.validation),
        hasValue: !!nextProps.value,
      });
    }
  }

  /**
   * Return input value
   * @return {string}
   */
  getValue = () => {
    const { inputNode } = this;

    return inputNode.value;
  };

  /**
   * Set focus to input
   */
  setFocus = () => {
    const { inputNode } = this;

    inputNode.focus();
  };

  _onChange = (e) => {
    const { onChange, validation } = this.props;
    const { value } = e.target;
    const valid = Input.validateValue(value, validation);

    this.setState({
      valid,
      hasValue: !!value,
    });

    if (onChange) {
      onChange(e, valid);
    }
  };

  isValid() {
    const { validation } = this.props;
    const value = this.inputNode.getValue();

    return Input.validateValue(value, validation);
  }

  inputNode = null;

  /**
   * Clear input value
   */
  clearValue = () => {
    const { inputNode } = this;

    inputNode.value = '';
  };

  /**
   * Render required icon element
   * @return {ReactElement} markup
   */
  // _renderRequiredIcon() {
  //   const { required } = this.props;
  //   const { theme } = this.context;

  //   return required && (
  //     <RequiredIcon
  //       className={theme.input_required_icon}
  //     />
  //   );
  // }

  /**
   * render
   * @return {ReactElement} markup
   */
  render() {
    const {
      tabIndex,
      className,
      defaultValue,
      multiLine,
      onChange,
      type,
      value,
      required,
      placeholder,
      children,
      name,
      inputProps,
      autoFocus,
      classNameInput,
      ...other
    } = this.props;
    const {
      valid: validState,
      hasValue,
    } = this.state;
    const {
      ...otherInputProps
    } = inputProps;

    return (
      <div
        className={classNames(
          s.input,
          className,
        )}
        data-valid={hasValue ? validState : true}
        data-component="input"
        {...other}
      >
        {createElement(multiLine ? 'textarea' : 'input', {
          ref: (node) => { this.inputNode = node; },
          type: multiLine ? null : type,
          className: classNames(
            s.input_field,
            classNameInput,
          ),
          tabIndex,
          defaultValue,
          value,
          required,
          placeholder,
          name,
          autoFocus,
          onChange: e => this._onChange(e),
          ...otherInputProps,
        })}
        {children}
      </div>
    );
  }
}
