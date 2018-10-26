import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import PhoneIcon from '../../assets/svg/phone_icon';
import MailIcon from '../../assets/svg/mail_icon';
import s from './styles/index.sass';

const ContactDescription = (props, context) => {
  const { langs, data } = context;

  return ([
    <div key={0} className={s.title}>
      {langs.contact.info.descr}
    </div>,
    <a href={`tel:${data.contacts.phone}`} key={1} className={classNames(s.contacts, s.m_margin)}>
      <PhoneIcon className={s.contacts_icon} />
      {data.contacts.phone}
    </a>,
    <a href={`mailto:${data.contacts.email}`} key={2} className={s.contacts}>
      <MailIcon className={s.contacts_icon} />
      {data.contacts.email}
    </a>,
    <div key={3} className={s.address_title}>
      {langs.contact.info.address}
    </div>,
    <div key={4} className={s.address_value}>
      {data.contacts.address}
    </div>,
  ]);
};

ContactDescription.contextTypes = {
  langs: PropTypes.object,
  data: PropTypes.object,
};

export default ContactDescription;
