/*
 * Copyright (c) 2018. Inspireso and/or its affiliates.
 */

import React from 'react';
import {Icon, Menu} from 'antd';
import {inject, Link, matchPath, observer, Route} from '../../packages';
import ui from '../Store';
import locale from '../locale';

const SubMenu = Menu.SubMenu;

@observer
class RouteMenu extends React.Component {
  render() {
    const {route, location} = this.props;
    const subRoutes = route.routes || [];
    const selectedKeys = this.findSelectedKeys(location.pathname, subRoutes);
    let defaultOpenKeys = this.findOpenKeys(location.pathname, subRoutes);
    if (defaultOpenKeys.length === 0 && subRoutes.length > 0) {
      defaultOpenKeys = [subRoutes[0].path];
    }
    return (
      <Menu theme="dark"
            mode="inline"
            selectedKeys={selectedKeys}
            defaultOpenKeys={defaultOpenKeys}
            className={route.className}>
        {this.props.children}
      </Menu>
    );
  }

  findSelectedKeys(pathname, routes) {
    const reduceFn = (previousValue, currentValue) =>
      currentValue.routes ? previousValue.concat(currentValue.routes) : previousValue.concat([currentValue]);

    return routes
      .reduce(reduceFn, [])
      .filter(route => matchPath(pathname, route))
      .map(route => route.path);
  }

  findOpenKeys(pathname, routes) {
    return routes
      .filter(route => matchPath(pathname, route))
      .map(route => route.path)
      ;
  }

}

@inject('routing')
@observer
export default class SiderMenu extends React.Component {

  render() {
    const {routing} = this.props;

    const activeRoute = routing.activeRoute;
    if (activeRoute) {
      return (
        <RouteMenu location={routing.location}
                   route={activeRoute}
                   lang={ui.lang}
                   collapsed={ui.sider.collapsed}>
          {activeRoute.routes.map(this.browseChildren)}
        </RouteMenu>
      );
    } else {
      return null;
    }

  }

  browseChildren = (child) => {
    const menuItem = (item) => (
      <Menu.Item key={item.path} className={item.className}>
        <Route path={item.path} children={({match}) => (
          <Link to={item.path}>
            <Icon type={item.icon || 'bars'} className={'ant-menu-subColor'}/>
            <span className={'ant-menu-subColor'}>{locale.get(item.title)}</span>
          </Link>
        )}/>
      </Menu.Item>
    );

    if (child.routes) {
      return (
        <SubMenu key={child.path}
                 className={child.className}
                 title={<span>
                     <Icon type={child.icon || 'folder'} className={'ant-menu-subColor'}/>
                     <span className={'ant-menu-subColor'}>{locale.get(child.title)}</span>
                   </span>}>
          {child.routes.map(menuItem)}
        </SubMenu>
      )

    } else {
      return menuItem(child);
    }
  };


}
