import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import query from '../../utils/query';
import publicPath from '../../utils/get_build_path';

const sections = ['services', 'projects', 'contacts'];

class Scroll extends Component {
  static propTypes = {
    location: PropTypes.oneOfType([
      PropTypes.object,
    ]),
    history: PropTypes.oneOfType([
      PropTypes.object,
    ]),
    children: PropTypes.node,
  };

  static defaultProps = {
    location: {},
    history: {},
    children: null,
  };

  static contextTypes = {
    device: PropTypes.object,
  };

  componentDidMount() {
    const { location, history } = this.props;
    const { device } = this.context;
    const parsedQuery = query.parse(location.search);
    const { section } = parsedQuery;

    this.initScroll();

    if (sections.indexOf(section) === -1 || device.type === 'mobile') {
      history.replace(`${publicPath}/`);
    } else {
      this.moveTo(sections.indexOf(section) + 2);
    }
  }

  componentDidUpdate(prevProps) {
    const { location } = this.props;
    const { device } = this.context;
    const { location: locationPrev } = prevProps;

    if (location.search !== locationPrev.search) {
      const parsedQuery = query.parse(location.search);
      const { section } = parsedQuery;
      const sectionToMove = !section ? 1 : sections.indexOf(section) + 2;

      if (device.type === 'mobile') {
        const element = section ? document.getElementById(section) : document.getElementById('main');
        element.scrollIntoView(element);
      } else {
        this.moveTo(sectionToMove);
      }
    }

    if (device.type === 'mobile' && this.scrollOn) {
      this.moveTo(1);
      destroy(); //eslint-disable-line
      this.scrollOn = false;
    }

    if (device.type !== 'mobile' && !this.scrollOn) {
      this.initScroll();
      this.scrollOn = true;
    }
  }

  componentWillUnmount() {
    destroy(); // eslint-disable-line
  }

  onePageScrollId = 'scroll_container';

  onMoveSection = (index) => {
    const { location, history } = this.props;

    index = Number(index); // eslint-disable-line

    const parsedQuery = query.parse(location.search);
    const { section } = parsedQuery;
    const sectionToMove = index === 1 ? 0 : sections[index - 2];
    const sectionToMoveFromQuery = !section ? 0 : section;

    if (sectionToMove === sectionToMoveFromQuery) return;

    if (!sectionToMove) {
      history.push(`${publicPath}/`);
    } else {
      history.push({
        search: query.stringify({
          section: sectionToMove,
        }),
      });
    }
  }

  scrollOn = false;

  initScroll() {
    this.scrollOn = true;
    onePageScroll(`#${this.onePageScrollId}`, { // eslint-disable-line
      sectionContainer: 'section',
      easing: 'ease',
      animationTime: 1000,
      pagination: false,
      updateURL: false,
      loop: false,
      keyboard: true,
      responsiveFallback: false,
      beforeMove: this.onMoveSection,
    });
  }

  moveDown = () => {
    moveDown(`#${this.onePageScrollId}`); // eslint-disable-line
  };

  moveTo = (index) => {
    moveTo(`#${this.onePageScrollId}`, index); // eslint-disable-line
  };

  render() {
    const { children } = this.props;

    return (
      <div id={this.onePageScrollId}>
        {children}
      </div>
    );
  }
}

export default withRouter(Scroll);
