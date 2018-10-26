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
        <div className={ss.list_item}>
          <div className={ss.image}>
            <ImageLoader
              minified={`${publicPath}/${langs.main.second.images.first.image_min}`}
              normal={`${publicPath}/${langs.main.second.images.first.image}`}
            />
          </div>
          <div className={ss.description}>
            <span>
              {`${langs.main.second.images.first.span} `}
              <Link
                to={`${publicPath}/services&equipment/telemetry`}
                href={`${publicPath}/services&equipment/telemetry`}
              >
                {langs.main.second.images.first.a}
              </Link>
            </span>
          </div>
        </div>
        <div className={ss.list_item}>
          <div className={ss.image}>
            <ImageLoader
              minified={`${publicPath}/${langs.main.second.images.second.image_min}`}
              normal={`${publicPath}/${langs.main.second.images.second.image}`}
            />
          </div>
          <div className={ss.description}>
            <span>
              {`${langs.main.second.images.second.span} `}
              <Link
                to={`${publicPath}/services&equipment/downhole_engine`}
                href={`${publicPath}/services&equipment/downhole_engine`}
              >
                {langs.main.second.images.second.a}
              </Link>
            </span>
          </div>
        </div>
        <div className={ss.list_item}>
          <div className={ss.image}>
            <ImageLoader
              minified={`${publicPath}/${langs.main.second.images.third.image_min}`}
              normal={`${publicPath}/${langs.main.second.images.third.image}`}
            />
          </div>
          <div className={ss.description}>
            <span>
              {`${langs.main.second.images.third.span} `}
              <Link
                to={`${publicPath}/services&equipment/equipment_services`}
                href={`${publicPath}/services&equipment/equipment_services`}
              >
                {langs.main.second.images.third.a}
              </Link>
            </span>
          </div>
        </div>
        <div className={ss.list_item}>
          <div className={ss.image}>
            <ImageLoader
              minified={`${publicPath}/${langs.main.second.images.fourth.image_min}`}
              normal={`${publicPath}/${langs.main.second.images.fourth.image}`}
            />
          </div>
          <div className={ss.description}>
            <span>
              <Link
                to={`${publicPath}/services&equipment/drilling_team`}
                href={`${publicPath}/services&equipment/drilling_team`}
              >
                {langs.main.second.images.fourth.a}
              </Link>
              {` ${langs.main.second.images.fourth.span}`}
            </span>
          </div>
        </div>
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
