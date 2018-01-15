/*
 * Copyright (c) 2018. Inspireso and/or its affiliates.
 */

import {action, observable} from 'mobx';
import {computed, matchPath} from "../packages";
import ctx from './Context';

/**
 * 存储路由相关的信息
 */
export default class RouterStore {
  allRoutes;
  history;
  unsubscribeFromHistory;

  /**
   * 当前路径
   */
  @observable location;

  /**
   * 指示是否已经初始化完毕
   */
  @computed
  get isReady() {
    return ctx.ready;
  }


  /**
   * 获取当前的路由表；可以扩展为按照功能列表过滤路由表
   * @returns {route[]}
   */
  @computed
  get routes() {
    return this.allRoutes;
    // const filterFn = (item) => {
    //   if (item.path === '/') {
    //     return true
    //   } else if (!ctx.functionList || ctx.functionList.length === 0) {
    //     return false;
    //   } else {
    //     return ctx.functionList.some(fun => matchPath(fun.url, item));
    //   }
    // };
    //
    // const mapFn = (item) => {
    //   if (item.routes) {
    //     item.routes = item.routes.filter(filterFn).map(mapFn);
    //     return item;
    //   } else {
    //     return item;
    //   }
    // };
    //
    // return Array.from(
    //   this.allRoutes
    //     .filter(filterFn)
    //     .map(mapFn)
    // );
  }

  /**
   * 获取当前激活的路由条目
   * @returns {route}
   */
  @computed
  get activeRoute() {
    const matchRoute = this.matchRoutes;
    if (matchRoute.length > 0) {
      return matchRoute[0];
    } else {
      return null;
    }
  }

  @computed
  get matchRoutes() {
    return this.routes.filter(route => matchPath(this.location.pathname, route))
  };

  constructor(routes, history) {
    this.allRoutes = routes;
    if (history) {
      this.injectHistory(history);
    }
  }

  /**
   * 注入 {history} 对象，比如浏览器的 {history} 对象
   */
  @action
  injectHistory(history) {
    this.history = history;
    this.location = history.location;
    this.unsubscribeFromHistory = history.listen((location, action) => {
      this.updateLocation(location);
    });
  }

  /**
   * 更新当前 {location} 信息
   * @param newState 新的{location}信息
   */
  @action
  updateLocation(newState) {
    this.location = Object.assign(this.location, newState);
  }

  /*
   * History 相关方法
   */
  push = (location) => {
    this.history.push(location);
  };

  replace = (location) => {
    this.history.replace(location);
  };

  go = (n) => {
    this.history.go(n);
  };

  goBack = () => {
    this.history.goBack();
  };

  goForward = () => {
    this.history.goForward();
  }
}
