import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { Link } from 'react-router-dom';
import Button from '../button/with_arrow';
import ImageLoader from '../image_load';
import publicPath from '../../utils/get_build_path';
import s from './styles/index.sass';
import ss from './styles/services.sass';

const ServicesSection = (props, { langs, data }) => (
  <section className={classNames('m_width', s.wrapper)} id="services">
    <div className={s.content}>
      <div className={ss.title}>
        {langs.main.second.title}
      </div>
      <div className={ss.advantage_list}>
        {langs.main.second.images.map((el, i) => (
          <div
            className={ss.list_item}
            key={i} // eslint-disable-line
          >
            <div className={ss.image}>
              <ImageLoader
                asBackground
                minified={`${publicPath}/${el.image_min}`}
                normal={`${publicPath}/${el.image}`}
                className={ss.image_inner}
              />
            </div>
            <div className={ss.description}>
              <span>
                {`${el.span} `}
                <Link
                  to={`${publicPath}${el.link}`}
                  href={`${publicPath}${el.link}`}
                >
                  {el.a}
                </Link>
              </span>
            </div>
          </div>
        ))}
      </div>
      <Link
        to={`${publicPath}/services&equipment/${data.services[0].url}`}
        href={`${publicPath}/services&equipment/${data.services[0].url}`}
      >
        <Button className={ss.button}>
          {langs.main.second.button}
        </Button>
      </Link>
    </div>
  </section>
);

ServicesSection.contextTypes = {
  langs: PropTypes.object,
  data: PropTypes.object,
};

export default ServicesSection;
