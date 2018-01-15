/*
 * Copyright (c) 2018. Inspireso and/or its affiliates.
 */

import React from 'react';
import {Menu} from 'antd';
import {inject, Link, observer, Route} from '../../packages';
import locale from '../locale';

@inject('routing')
@observer
export default class ModuleMenu extends React.Component {

  render() {
    const {routing} = this.props;
    const selectedKeys = routing.matchRoutes.map(route => route.path);
    return (
      <Menu
        theme={this.props.theme ? this.props.theme : 'dark'}
        className="header-menu"
        mode="horizontal"
        selectedKeys={selectedKeys}>
        {
          routing.routes.map((menu, index) => this.buildSubMenu(menu, index))
        }
      </Menu>
    );
  }

  buildSubMenu = (menu, subIndex) => {
    return (
      <Menu.Item key={menu.path} className={menu.className}>
        <Route path={menu.path} children={({match}) => (
          <Link to={menu.path}> <span>{locale.get(menu.title)}</span></Link>
        )}/>
      </Menu.Item>
    );
  };
}
