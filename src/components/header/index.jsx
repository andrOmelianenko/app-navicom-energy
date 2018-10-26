import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import classNames from 'classnames';
import Animation from '../animation';
import publicPath from '../../utils/get_build_path';
import LogoIcon from '../../assets/svg/logo';
import query from '../../utils/query';
import s from './styles/index.sass';

class Header extends Component {
  static defaultProps = {
    history: {},
  };

  static propTypes = {
    history: PropTypes.oneOfType([
      PropTypes.object,
    ]),
  };

  static contextTypes = {
    langs: PropTypes.oneOfType([
      PropTypes.object,
    ]),
  };

  state = {
    opened: false,
  };

  handleClick = () => this.setState(prevState => ({
    opened: !prevState.opened,
  }));

  closeMenu = () => this.setState({
    opened: false,
  })

  render() {
    const { history } = this.props;
    const { langs } = this.context;
    const { opened } = this.state;

    const menuItems = [
      <div
        key="item1"
        className={s.menu_item}
        onClick={() => {
          this.closeMenu();
          history.push(`${publicPath}/`);
        }}
      >
        {langs.header.menu.main}
      </div>,
      <div
        key="item2"
        className={s.menu_item}
        onClick={() => {
          this.closeMenu();
          history.push(`${publicPath}/services&equipment/telemetry`);
        }}
      >
        {langs.header.menu.services}
      </div>,
      <div
        key="item3"
        className={s.menu_item}
        onClick={() => {
          this.closeMenu();
          history.push({
            pathname: `${publicPath}/`,
            search: query.stringify({
              section: 'projects',
            }),
          });
        }}
      >
        {langs.header.menu.projects}
      </div>,
      <div
        key="item4"
        className={s.menu_item}
        onClick={() => {
          this.closeMenu();
          history.push({
            pathname: `${publicPath}/`,
            search: query.stringify({
              section: 'contacts',
            }),
          });
        }}
      >
        {langs.header.menu.contacts}
      </div>,
    ];

    return (
      <div className={s.header}>
        <div className="m_width">
          <LogoIcon
            className={s.logo}
            onClick={() => {
              this.closeMenu();
              history.push(`${publicPath}/`);
            }}
          />
          <div
            key="menu_items"
            className={classNames(s.menu, opened ? s.opened : null)}
          >
            <div className={s.anim_layer} >
              <Animation />
            </div>
            <div className={s.linksWrap}>
              {menuItems}
            </div>
          </div>
          <div
            key="menu_label"
            className={classNames(s.menu_label, opened ? s.label_opened : null)}
            onClick={this.handleClick}
          >
            <span>{langs.header.menu_label}</span>
          </div>
          <div className="clear" />
        </div>
      </div>
    );
  }
}

export default withRouter(Header);
