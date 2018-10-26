import React, { Component, Fragment } from 'react';
import { withRouter, NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Animation from '../../animation';
import ButtonWithArrow from '../../button/with_arrow';
import LeftArrowIcon from '../../../assets/svg/left_arrow_icon';
import RightArrowIcon from '../../../assets/svg/right_arrow_icon';
import s from './styles/index.sass';
import publicPath from '../../../utils/get_build_path';

class SubjectSelector extends Component {
  static defaultProps = {
    location: {},
    history: {},
  };

  static propTypes = {
    location: PropTypes.oneOfType([PropTypes.object]),
    history: PropTypes.oneOfType([PropTypes.object]),
  };

  static contextTypes = {
    data: PropTypes.object,
    langs: PropTypes.object,
  };

  state = {
    show: true,
    current: '',
  }

  handleMenuClick = name => this.setState({
    show: false,
    current: name,
  });

  handleOpenMenu = () => this.setState({
    show: true,
  });

  render() {
    const { history, location } = this.props;
    const { data, langs } = this.context;
    const { show, current } = this.state;

    const inSubjInfo = location.pathname.indexOf('/info') !== -1;

    const selectorElements = data.services.map(elem => (
      <NavLink
        key={elem.url}
        to={`${publicPath}/services&equipment/${elem.url}`}
        className={s.link}
        activeClassName={classNames(s.link_active, inSubjInfo ? s.link_modified : null)}
        onClick={() => this.handleMenuClick(elem.name)}
      >
        <span>{elem.name}</span>
        <p>{langs.services.subj_add_info}</p>
        <RightArrowIcon />
      </NavLink>
    ));

    return (
      <Fragment>
        <div className={classNames(
          s.selector_wrap,
          show ? s.opened : null,
          inSubjInfo ? s.border : null,
        )}
        >
          <div className={s.linksWrap}>
            {selectorElements}
          </div>
          <div className={s.anim_layer} >
            <Animation />
          </div>
        </div>
        <div
          className={classNames(
            s.back_block,
            inSubjInfo ? s.anim_back : null,
          )}
          onClick={history.goBack}
        >
          <LeftArrowIcon />
        </div>
        <div className={classNames(s.mobile_menu, !show ? s.menu_show : null)}>
          <span
            className={s.menu_all}
            onClick={this.handleOpenMenu}
          >
            {langs.services.menu_all}
          </span>
          <span>{current}</span>
          {
            inSubjInfo
              ? (
                <span className={s.menu_add}>
                  <RightArrowIcon />
                  {langs.services.subj_add_info}
                </span>
              ) : null
          }
        </div>
        {
          inSubjInfo
            ? (
              <ButtonWithArrow
                className={classNames(s.menu_back, !show ? s.back_show : null)}
                arrowPosition="left"
                onClick={history.goBack}
              >
                {langs.services.back}
              </ButtonWithArrow>
            ) : null
        }
      </Fragment>
    );
  }
}

export default withRouter(SubjectSelector);
