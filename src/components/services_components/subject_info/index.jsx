import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import PdfIcon from '../../../assets/svg/pdf_icon';
import publicPath from '../../../utils/get_build_path';
import ImageLoader from '../../image_load';
import s from './styles/index.sass';

class SubjectInfo extends Component {
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
    const { params: { name } } = this.props.match;
    const { data, langs } = this.context;
    const { anim } = this.state;

    const filteredData = data.services.filter(elem => elem.url === name)[0];

    const additionalsList = filteredData.additional.map((elem, index) => (
      <li key={`add${elem.name.length + index}`} className={s.info_block}>
        <div className={s.img_block}>
          <ImageLoader
            minified={`${publicPath}/${elem.img_min}`}
            normal={`${publicPath}/${elem.img}`}
          />
        </div>
        <h3>{elem.name}</h3>
        {
          elem.pdf
            ? (
              <a target="_blank" rel="noopener noreferrer" href={`${publicPath}/${elem.pdf}`}>
                <PdfIcon />
                {langs.services.pdf_link}
              </a>
            ) : null
        }
      </li>
    ));

    return (
      <div className={classNames(s.info_wrap, anim ? s.anim_block : null)}>
        <div className={s.scroll_wrap}>
          <h2>{filteredData.heading}</h2>
          <div className={s.content_block}>
            <ul>
              {additionalsList}
            </ul>
          </div>
        </div>
      </div>
    );
  }
}

export default SubjectInfo;
