/*
 * Copyright (c) 2018. Inspireso and/or its affiliates.
 */

import React from 'react';
import {Breadcrumb, Icon} from 'antd';
import {inject, matchPath, observer} from '../../packages';
import locale from '../locale';

const Item = Breadcrumb.Item;

/**
 * 定义面包屑导航
 */
@inject('routing')
@observer
export default class Bread extends React.Component {

  render() {
    const {routing} = this.props;
    const itemArray = this.buildBreadcrumbItem(routing.routes, routing.location);

    return (
      <Breadcrumb className="breadcrumb">
        <Item key="systemHome" href="/"><Icon type="home"/>{locale.home()}</Item>
        {itemArray}
      </Breadcrumb>
    );
  }

  buildBreadcrumbItem(routes, location) {
    const itemArray = [];

    const addItem = item => {
      if (item.icon) {
        itemArray.push(<Item key={item.path}><Icon type={item.icon}/> {locale.get(item.title)}
        </Item>);  // 有图标的话带上图标
      } else {
        itemArray.push(<Item key={item.path}>{locale.get(item.title)}</Item>);
      }
    };

    const browseRoute = item => {
      if (matchPath(location.pathname, item)) {
        addItem(item);
        if (item.routes) {
          item.routes.forEach(browseRoute);
        }
      }

    };
    routes.forEach(browseRoute);

    return itemArray;
  }
}
