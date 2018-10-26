import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { Link } from 'react-router-dom';
import publicPath from '../../../utils/get_build_path';
import ImageLoader from '../../image_load';
import s from './styles/index.sass';

class SubjectCanvas extends Component {
  static defaultProps = {
    match: {},
  };

  static propTypes = {
    match: PropTypes.oneOfType([PropTypes.object]),
  };

  static contextTypes = {
    data: PropTypes.object,
    langs: PropTypes.object,
  };

  state = {
    anim: false,
  }

  componentDidMount() {
    setTimeout(() => {
      this.animateComponent();
    }, 10);
  }

  componentWillReceiveProps() {
    this.setState({ anim: false });
    setTimeout(() => {
      this.animateComponent();
    }, 10);
  }

  animateComponent = () => this.setState({ anim: true })

  render() {
    const { params: { name }, url } = this.props.match;
    const { data, langs } = this.context;
    const { anim } = this.state;

    const filteredData = data.services.filter(elem => elem.url === name)[0];
    const expanded = typeof (filteredData.advantages[0]) === 'object';

    const advantagesList = filteredData.advantages.map((elem, index) => {
      if (expanded) {
        return ([
          <h3
            key={index} // eslint-disable-line
            className={s.sub_heading}
          >
            {elem.sub_heading}
          </h3>,
          <ul
            key={`-${index}`} // eslint-disable-line
            className={s.columns_ul}
          >
            {elem.txt_array.map((str, i) => ( // eslint-disable-next-line
              <li key={i}>
                {str}
              </li>
            ))}
          </ul>,
        ]);
      }
      return <li key={`adv${elem.length + index}`}>{elem}</li>;
    });

    return (
      <div className={classNames(s.canvas_wrap)}>
        <ImageLoader
          minified={`${publicPath}/${filteredData.img_min}`}
          normal={`${publicPath}/${filteredData.img}`}
          className={classNames(
            s.header,
            anim ? s.anim_img : null,
          )}
          asBackground
        >
          <div className={s.filter} >
            <h1>{filteredData.name}</h1>
          </div>
        </ImageLoader>
        <div className={classNames(
          s.content_subblock,
          anim ? s.anim_content : null,
        )}
        >
          <h2>
            {filteredData.heading}
          </h2>
          {
            filteredData.additional && (
              <Link
                to={`${url}/info`}
                href={`${url}/info`}
              >
                {langs.services.arrow_button}
              </Link>
            )
          }
          <hr className={s.line} />
          <p>
            {filteredData.description}
          </p>
          {expanded ? (
            <Fragment>
              {advantagesList}
            </Fragment>
          ) : (
            <ul className={s.columns_ul}>
              {advantagesList}
            </ul>
          )}
        </div>
      </div>
    );
  }
}

export default SubjectCanvas;
