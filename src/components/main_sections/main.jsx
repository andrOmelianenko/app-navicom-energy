import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { Link } from 'react-router-dom';
import publicPath from '../../utils/get_build_path';
import Button from '../button/with_arrow';
import s from './styles/index.sass';
import ss from './styles/main.sass';

const MainSection = (props, { langs }) => (
  <section className={classNames(ss.m_wrapper, s.wrapper)} id="main">
    <div className={s.content}>
      <div className={ss.title}>
        {langs.main.first.title}
      </div>
      <Link
        to={`${publicPath}/contact`}
        href={`${publicPath}/contact`}
      >
        <Button className={ss.button_to_main}>
          {langs.main.first.button}
        </Button>
      </Link>
    </div>
  </section>
);

MainSection.contextTypes = {
  langs: PropTypes.object,
};

export default MainSection;
