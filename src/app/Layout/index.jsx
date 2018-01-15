/*
 * Copyright (c) 2018. Inspireso and/or its affiliates.
 */

import React from 'react';
import {Col, Layout, Row} from 'antd';
import {observer} from '../../packages';
import ModuleMenu from './ModuleMenu';
import SideMenu from './SideMenu';
import RightMenu from './RightMenu';
import ContentContainer from './ContentContainer';
import TabContainer from './TabContainer';
import ui from '../Store/UIState';

const {Header, Sider} = Layout;

@observer
export default class AppLayout extends React.Component {

  render() {
    return (
      <Layout className="app">
        {/*顶部*/}
        <Header className="header">
          <Row>
            <Col span={3}>
              <div className="logo">
                <span>RMA</span>
              </div>
            </Col>
            <Col span={16}>
              <ModuleMenu lang={ui.lang}/>
            </Col>
            <Col span={5}>
              <RightMenu/>
            </Col>
          </Row>
        </Header>
        <Layout>
          {/*侧边栏*/}
          {
            ui.sider.enabled
              ? <Sider collapsible
                       reverseArrow={false}
                       collapsed={ui.sider.collapsed}
                       collapsedWidth={40}
                       onCollapse={this.onCollapse}>
                <SideMenu/>
              </Sider>
              : null
          }

          {/*主体内容*/}
          {
            ui.tabs.enabled
              ? <TabContainer/>
              : <ContentContainer/>
          }
        </Layout>
      </Layout>
    );
  }

  onCollapse = (collapsed) => {
    ui.sider.collapsed = collapsed;
  };

}
