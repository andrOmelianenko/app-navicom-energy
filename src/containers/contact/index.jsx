import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import ContactForm from '../../components/contact_form';
import { ButtonWithArrow } from '../../components/button';
import s from './styles/index.sass';

const ContactContainer = (props, context) => {
  const { history } = props;
  const { langs } = context;

  return (
    <div className={classNames('m_width', s.wrapper)}>
      <div className={s.content}>
        <ButtonWithArrow
          className={s.button}
          arrowPosition="left"
          onClick={history.goBack}
        >
          {langs.contact.backBtn}
        </ButtonWithArrow>
        <div className={s.form_wrapper}>
          <ContactForm />
        </div>
      </div>
    </div>
  );
};

ContactContainer.propTypes = {
  history: PropTypes.oneOfType([
    PropTypes.object,
  ]),
};

ContactContainer.defaultProps = {
  history: {},
};

ContactContainer.contextTypes = {
  langs: PropTypes.object,
};

export default ContactContainer;
