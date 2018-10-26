import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { Link } from 'react-router-dom';
import publicPath from '../../utils/get_build_path';
import Button from '../button/with_arrow';
import s from './styles/index.sass';
import ss from './styles/projects.sass';

const ProjectsSection = (props, { langs }) => (
  <section className={classNames('m_width', s.wrapper)} id="projects">
    <div className={s.content}>
      <div className={ss.title}>
        {langs.main.third.title}
      </div>
      <div className={ss.list}>
        {
          [0, 0].map((el, index) => (
            <div
              key={index} //eslint-disable-line
              className={ss.list_item}
            >
              <div className={ss.count_number}>{`0${index + 1}`}</div>
              <div className={ss.info_text}>
                {langs.main.third.list[[index + 1].toString()]}
              </div>
            </div>
          ))
        }
      </div>
      <Link
        to={`${publicPath}/contact`}
        href={`${publicPath}/contact`}
      >
        <Button className={ss.button}>
          {langs.main.third.button}
        </Button>
      </Link>
    </div>
  </section>
);

ProjectsSection.contextTypes = {
  langs: PropTypes.object,
};

export default ProjectsSection;
