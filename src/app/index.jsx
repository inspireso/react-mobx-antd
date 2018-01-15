/*
 * Copyright (c) 2018. Inspireso and/or its affiliates.
 */
import React from 'react';
import {LocaleProvider, Spin} from 'antd';
import {inject, observer} from '../packages';
import Layout from './Layout';
import ui from './Store/UIState';
import './App.less';

@inject('routing')
@observer
export default class App extends React.Component {

  constructor(props) {
    super(props);
    const {routing} = this.props;
    ui.injectRouting(routing)
  }


  render() {
    if (!ui.isReady) {
      return (
        <div className="loading">
          <Spin size="large"/>;
        </div>
      );
    }

    return (
      <LocaleProvider locale={ui.locale}>
        <Layout/>
      </LocaleProvider>
    )
  }
}

