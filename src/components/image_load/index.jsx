import React, { Component } from 'react';
import PropTypes from 'prop-types';
import publicPath from '../../utils/get_build_path';

class ImageLoader extends Component {
  static defaultProps = {
    minified: '',
    normal: '',
    asBackground: false,
    children: null,
  }

  static propTypes = {
    minified: PropTypes.string,
    normal: PropTypes.string,
    asBackground: PropTypes.bool,
    children: PropTypes.node,
  }

  constructor(props) {
    super(props);
    this.state = {
      img: props.minified,
      loading: true,
    };
    this.loadImage(props.normal);
  }

  componentWillReceiveProps(nextProps) {
    const { normal } = this.props;
    const { normal: nextNormal, minified } = nextProps;

    if (nextNormal !== normal) {
      this.setState({
        img: minified,
        loading: true,
      }, () => {
        this.loadImage(nextNormal);
      });
    }
  }

  onLoad = () => this.setState({
    img: this.image.src,
    loading: false,
  });

  onError = () => this.setState({
    img: `${publicPath}/assets/images/no-image_min.png`,
    loading: true,
  }, () => {
    this.loadImage(`${publicPath}/assets/images/no-image.png`);
  });

  loadImage = (normal) => {
    const image = new Image();

    if (this.image) {
      this.image.onload = null;
      this.image.onerror = null;
    }

    this.image = image;
    image.onload = this.onLoad;
    image.onerror = this.onError;
    image.src = normal;
  }

  render() {
    const { loading, img } = this.state;
    const {
      asBackground,
      children,
      normal,
      minified,
      ...other
    } = this.props;

    if (asBackground) {
      return (
        <div
          style={{ backgroundImage: `url(${img})` }}
          {...other}
        >
          {children}
        </div>
      );
    }

    return (
      <img
        src={img}
        alt="load_img"
        style={{
          filter: loading ? 'blur(5px)' : 'none',
        }}
        {...other}
      />
    );
  }
}

export default ImageLoader;
