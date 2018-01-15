/*
 * Copyright (c) 2018. Inspireso and/or its affiliates.
 */

import React from 'react';

/**
 * 封装为一个异步加载的组件，
 * 使用：
 * asyncComponent(() => import('./home/page'))
 * @param {function} importComponent 加载组件的函数
 * @returns {AsyncComponent}
 */
export function asyncComponent(importComponent) {

  class AsyncComponent extends React.Component {
    constructor(props) {
      super(props);

      this.state = {
        component: null
      };
    }

    async componentDidMount() {
      const {default: component} = await importComponent();

      this.setState({
        component: component
      });
    }

    render() {
      const C = this.state.component;

      return C ? <C {...this.props} /> : null;
    }
  }

  return AsyncComponent;
}

/**
 * 封装成一个{React.PureComponent}的组件
 * @param {React.Component} component 要封装的组件
 * @returns {WrappedComponent}
 */
export function wrappedPureComponent(component) {
  class WrappedComponent extends React.PureComponent {
    render() {
      const C = component;
      return <C {...this.props} />;
    }
  }

  WrappedComponent.displayName = `WrappedComponent(${getDisplayName(component)})`;
  return WrappedComponent;
}

function getDisplayName(wrappedComponent) {
  return wrappedComponent.displayName || wrappedComponent.name || 'Component';
}
