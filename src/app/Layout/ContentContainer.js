/*
 * Copyright (c) 2018. Inspireso and/or its affiliates.
 */

import React, {createElement} from 'react';
import {Layout} from 'antd';
import {inject, observer, Route, Switch} from '../../packages';
import Breadcrumb from './Breadcrumb';
import ui from '../Store';

const {Content} = Layout;

@inject('routing')
@observer
export default class ContentContainer extends React.Component {

  constructor(props) {
    super(props);
    const {routing} = props;
    this.routeComponents = this.mapRouteToComponent(routing.routes)
  }

  render() {
    return (
      <Layout className="content-container">
        <Breadcrumb/>
        <Content className="content">
          <Switch>
            {this.routeComponents}
          </Switch>
        </Content>
      </Layout>
    );
  }

  /**
   * 子路由放在前面，优先匹配
   */
  mapRouteToComponent(routes) {
    let comps = [];
    const addItem = (item, fn) => {
      if (item.component) {
        fn.call(comps, <Route
          key={item.path}
          path={item.path}
          exact={item.exact}
          render={(props) => createElement(item.component, Object.assign({current: ui}, props))}
        />)
      }
    };
    //子路由放前面，优先匹配
    const browseChildren = item => {
      if (item.component) {
        addItem(item, [].unshift);
      }
    };
    const browseRoute = (item) => {
      if (item.component) {
        addItem(item, [].push);
      }
      if (item.routes) {
        item.routes.forEach(browseChildren);
      }
    };

    routes.forEach(browseRoute);
    return comps;
  }
}
