import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import ImageLoader from '../../components/image_load';
import publicPath from '../../utils/get_build_path';
import s from './styles/index.sass';

const AboutContainer = (props, context) => {
  const { langs } = context;

  return (
    <div className={s.about_wrap}>
      <ImageLoader
        asBackground
        minified={`${publicPath}/assets/images/about_min.jpg`}
        normal={`${publicPath}/assets/images/about.jpg`}
        className={s.main}
      >
        <h1 className={s.title}>
          {langs.about.heading}
        </h1>
        <div className={s.filter} />
      </ImageLoader>
      <div className={s.content}>
        <p className={s.summary}>{langs.about.summary}</p>
        <div className={s.txt}>
          {langs.about.txt.map((el, i) => (
            <p
              key={i} // eslint-disable-line
              className={s.chunk}
            >
              {el}
            </p>
          ))}
          {langs.about.list.map((el, i) => (
            <p
              key={i} // eslint-disable-line
              className={s.list_chunk}
            >
              {el}
            </p>
          ))}
        </div>
        <div className={s.contact}>
          <p className={s.contact_heading}>{langs.about.contact.heading}</p>
          <p className={s.contact_item}>{langs.about.contact.phone1}</p>
          <p className={s.contact_item}>{langs.about.contact.phone2}</p>
          <a href={`mailto:${langs.about.contact.email}`} className={classNames(s.contact_item, s.email)}>
            {langs.about.contact.email}
          </a>
          <p className={s.contact_item}>{langs.about.contact.address_title}</p>
          <p className={s.contact_item}>{langs.about.contact.address}</p>
        </div>
      </div>
    </div>
  );
};

AboutContainer.contextTypes = {
  langs: PropTypes.object,
};

export default AboutContainer;
