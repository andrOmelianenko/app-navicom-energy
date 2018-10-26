import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import Input from '../input/index';
import Button from '../button/index';
import publicPath from '../../utils/get_build_path';
import * as CONFIG from '../../../bundler/config';
import s from './styles/index.sass';

class ContactForm extends Component {
  static propTypes = {
    showDescr: PropTypes.bool,
  };

  static defaultProps = {
    showDescr: true,
  };

  static contextTypes = {
    langs: PropTypes.object,
  };

  state = {
    sending: false,
    name: {
      value: '',
      valid: false,
    },
    phone: {
      value: '',
      valid: false,
    },
    email: {
      value: '',
      valid: false,
    },
  }

  onChange = (e, valid) => {
    const { name, value } = e.target;

    this.setState({
      [name]: {
        value,
        valid,
      },
    });
  }

  render() {
    const {
      name,
      phone,
      email,
      sending,
    } = this.state;
    const { showDescr } = this.props;
    const { langs } = this.context;

    return (
      <form action={`https://formspree.io/${CONFIG.EMAIL}`} method="POST" >
        <Input
          key={0}
          className={s.input_item}
          placeholder={langs.contact.form.placeholders.name}
          onChange={this.onChange}
          name="name"
          validation={['name']}
        />
        <Input
          key={1}
          className={s.input_item}
          placeholder={langs.contact.form.placeholders.company}
          name="company"
          ref={(input) => { this.refCompany = input; }}
        />
        <Input
          key={2}
          className={s.input_item}
          placeholder={langs.contact.form.placeholders.phone}
          onChange={this.onChange}
          name="phone"
          validation={['phone']}
        />
        <Input
          key={3}
          className={s.input_item}
          placeholder={langs.contact.form.placeholders.email}
          onChange={this.onChange}
          name="email"
          validation={['email']}
        />
        <Input
          key={4}
          multiLine
          classNameInput={s.multiline}
          placeholder={langs.contact.form.placeholders.text}
          name="text"
          ref={(input) => { this.refText = input; }}
        />
        <input
          type="hidden"
          name="_next"
          value={`${publicPath}/successfully-sended`}
        />
        <div
          key={5}
          className={s.bottom_block}
        >
          <Button
            primary
            className={s.button}
            disabled={!(name.valid && phone.valid && email.valid)}
            type="submit"
          >
            {langs.contact.form.send}
          </Button>
          <div className={s.loader_block}>
            {sending && <div className={s.loader} />}
          </div>
          {showDescr && (
            <div className={s.descr_block}>
              {langs.contact.form.description}
            </div>
          )}
        </div>
      </form>
    );
  }
}

export default withRouter(ContactForm);
