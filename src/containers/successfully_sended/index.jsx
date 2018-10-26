import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Button from '../../components/button/with_arrow';
import publicPath from '../../utils/get_build_path';
import SendEmailIcon from '../../assets/svg/letter_icon';
import s from './styles/index.sass';

const SuccesfullySendedContainer = (props, { langs }) => (
  <div className={s.wrapper}>
    <div className={s.content}>
      <SendEmailIcon className={s.send_icon} />
      <div className={s.title}>
        {langs.contact.success.title}
      </div>
      <Link
        to={`${publicPath}/`}
        href={`${publicPath}/`}
      >
        <Button>
          {langs.contact.success.btn}
        </Button>
      </Link>
    </div>
  </div>
);

SuccesfullySendedContainer.contextTypes = {
  langs: PropTypes.object,
};

export default SuccesfullySendedContainer;

