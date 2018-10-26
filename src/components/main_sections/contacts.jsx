import React from 'react';
import classNames from 'classnames';
import ContactForm from '../contact_form';
import ContactDescription from '../contacts_descr';
import s from './styles/index.sass';
import ss from './styles/contacts.sass';

const ContactsSection = () => (
  <section className={classNames('m_width', s.wrapper)} id="contacts">
    <div className={s.content}>
      <div className={ss.descr_part}>
        <ContactDescription />
      </div>
      <div className={ss.form_part}>
        <ContactForm />
      </div>
    </div>
  </section>
);

export default ContactsSection;
