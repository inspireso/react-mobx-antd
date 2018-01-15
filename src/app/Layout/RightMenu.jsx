/*
 * Copyright (c) 2018. Inspireso and/or its affiliates.
 */

import React from 'react';
import {Icon, Menu} from 'antd';
import {observer} from '../../packages';
import ui from '../Store/UIState';
import locale from '../locale';

const SubMenu = Menu.SubMenu;
const langMenuItemStyle = {textAlign: 'center'};

@observer
export default class RightMenu extends React.Component {

  render() {
    return (
      <Menu
        theme={this.props.theme ? this.props.theme : 'dark'}
        className="header-menu right"
        mode="horizontal">
        {this.globalMenu()}
        {this.loginMenu()}
      </Menu>
    );
  }


  globalMenu() {
    return (
      <SubMenu
        title={<span><Icon type="global"/>{locale.lang(ui.lang)}<Icon type="down"/></span>}>
        <Menu.Item style={langMenuItemStyle}>
          <a id="zh-CN" onClick={this.onLangChange}>{locale.lang('zh-CN')}</a>
        </Menu.Item>
        <Menu.Item style={langMenuItemStyle}>
          <a id="en-US" onClick={this.onLangChange}>{locale.lang('en-US')}</a>
        </Menu.Item>
      </SubMenu>
    );
  }

  loginMenu() {
    if (ui.authenticated) {
      return (
        <SubMenu title={<span><Icon type="user"/>{ui.identity.name}</span>}>
          <Menu.Item style={langMenuItemStyle}>
            <a href="/logout"><Icon type="logout"/>{locale.logout()}</a>
          </Menu.Item>
        </SubMenu>
      );
    } else {
      return (
        <Menu.Item style={langMenuItemStyle}>
          <a href="/login"><Icon type="login"/>{locale.login()}</a>
        </Menu.Item>
      );
    }

  }

  onLangChange = (e) => {
    let lang = e.currentTarget.id;
    if (lang && ui.currentLocale !== lang) {
      ui.saveCurrentLocale(lang);
    }
  };
}
