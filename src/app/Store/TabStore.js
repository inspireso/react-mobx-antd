/*
 * Copyright (c) 2018. Inspireso and/or its affiliates.
 */

import {action, computed, matchPath, observable, observer} from '../../packages';

export class TabStore {
  @observable tabCount = 0;
  existTabs = [];
  activeTab;

  @computed
  get activeKey() {
    let route = this.findMatchRoute(this.tabMap.values(), this.routing.location);

    if (route.length > 0) {
      route = route[0];
    }
    // 如果 route 有问题, 就直接隐藏所有tab, 这样简单点
    if (route && this.tabMap.has(route.key)) {
      this.activeTab = route.key;
    }
    return this.activeTab;
  }

  @computed
  get tabs() {
    let route = this.findMatchRoute(this.tabMap.values(), this.routing.location);

    if (route.length > 0) {
      route = route[0];
    }
    // 如果 route 有问题, 就直接隐藏所有tab, 这样简单点
    if (!route || !this.tabMap.has(route.key)) {
      return this.existTabs;
    }

    // 更新路由 match 对象
    const currentMatch = matchPath(this.routing.location.pathname, route);
    if (!route.match) {
      route.match = currentMatch;
    } else if (route.match.url !== currentMatch.url) {
      route.match = currentMatch;
    }

    // 当前key对应的tab是否已经在显示了?
    let exist = false;
    for (const item of this.existTabs) {
      if (item.key === route.key) {
        exist = true;
        break;
      }
    }

    // 如果key不存在就要新增一个tabPane
    if (!exist) {
      this.existTabs.push(route);
    }
    return this.existTabs;
  }

  @computed
  get tabMap() {
    return this.mapRouteToTab(this.routing.routes);
  }

  constructor(routing) {
    this.routing = routing;
    this.existTabs = [];
  }


  @action
  active(key) {
    const activeRoute = this.tabMap.get(key);
    this.routing.push(activeRoute.match.url);
  };

  @action
  remove(targetKey) {
    // 如果关闭的是当前tab, 要激活哪个tab?
    // 首先尝试激活左边的, 再尝试激活右边的
    let nextTabKey = this.activeKey;
    if (this.activeKey === targetKey) {
      let currentTabIndex = -1;
      this.existTabs.forEach((pane, i) => {
        if (pane.key === targetKey) {
          currentTabIndex = i;
        }
      });

      // 如果当前tab左边还有tab, 就激活左边的
      if (currentTabIndex > 0) {
        nextTabKey = this.existTabs[currentTabIndex - 1].match.url;
      }
      // 否则就激活右边的tab
      else if (currentTabIndex === 0 && this.existTabs.length > 1) {
        nextTabKey = this.existTabs[currentTabIndex + 1].match.url;
      }
      //找不到默认到首页
      else {
        nextTabKey = '/';
      }
    }

    // 过滤panes
    this.existTabs = this.existTabs.filter(item => item.key !== targetKey);
    this.tabCount = this.existTabs.length;
    if (this.activeKey !== nextTabKey) {
      this.routing.push(nextTabKey);
    }
  };

  mapRouteToTab(routes) {
    const map = new Map();

    const addItem = item => {
      if (item.component) {
        item = Object.assign({
          key: item.path,
          //包装成只有在属性（this.props）发生变化的时候重新渲染的组件
          pureComponent: observer(item.component)
        }, item);
        map.set(item.key, item);
      }
    };
    const browseRoute = item => {
      if (item.component) {
        addItem(item);
      }
      if (item.routes) {
        item.routes.forEach(browseRoute);
      }
    };

    routes.forEach(browseRoute);

    return map;
  }

  findMatchRoute(routes, location) {
    routes = Array.from(routes);
    const bestMatch = routes.filter(route => location.pathname === route.path);
    if (bestMatch.length > 0) {
      return bestMatch;
    }

    return routes.filter(route => matchPath(location.pathname, route))
      .filter(route => !route.routes);

  }
}
