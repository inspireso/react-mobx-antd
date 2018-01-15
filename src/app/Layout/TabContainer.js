/*
 * Copyright (c) 2018. Inspireso and/or its affiliates.
 */

import React from 'react';
import {Icon, Layout, Tabs} from 'antd';
import {inject, observer} from '../../packages';
import ui, {TabStore} from '../Store';
import locale from '../locale';

const {Content} = Layout;
const TabPane = Tabs.TabPane;

@inject('routing')
@observer
export default class TabContainer extends React.Component {

  constructor(props) {
    super(props);
    const {routing} = this.props;
    this.store = new TabStore(routing)
  }

  render() {
    const {routing} = this.props;

    let content = null;
    if (this.store.tabs.length > 0) {
      content =
        <Tabs hideAdd={true}
              type="editable-card"
              animated={ui.tabs.animated}
              activeKey={this.store.activeKey}
              onEdit={this.onTabRemove}
              onChange={this.onTabChange}>
          {
            this.store.tabs.map(route => {
                const title = (route.icon)
                  ? (<span><Icon type={route.icon}/>{locale.get(route.title)}</span>)
                  : (<span>{locale.get(route.title)}</span>);
                const RouteComponent = route.pureComponent;
                return (
                  <TabPane tab={title}
                           key={route.key}
                           closable={true}>
                    <RouteComponent
                      lang={ui.lang}
                      location={routing.location}
                      history={routing.history}
                      match={route.match}
                      current={ui}
                    />
                  </TabPane>
                )
              }
            )
          }
        </Tabs>;
    }

    return (
      <Content className="card-container">
        {content}
      </Content>
    );
  }

  onTabChange = (key) => {
    this.store.active(key)
  };

  onTabRemove = (targetKey) => {
    this.store.active(targetKey)
    this.store.remove(targetKey);
  };
}

