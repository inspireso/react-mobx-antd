/*
 * Copyright (c) 2018. Inspireso and/or its affiliates.
 */

import moment from 'moment';
import Cookies from 'js-cookie';
import {action, computed, ctx, log, observable, runInAction} from '../../packages';
import {intl, localeLoaders} from '../../util/ResourceManager';
import 'moment/locale/zh-cn';

const intlOptions = {
  urlLocaleKey: "lang",
  cookieLocaleKey: "lang"
};

//国际化资源zh-CN: {}
const locales = {};

class TabState {
  enabled = false;  // 是否开启tab模式
  animated = false; //是否开启TAB切换的动画
}

class SiderState {
  enabled = true;  // 是否开启侧边栏模式
  @observable  collapsed = false; //默认是否展开侧边栏
}


class UIState {
  routing;

  // Tab布局选项
  tabs = new TabState();

  //侧边栏选项
  sider = new SiderState();

  /**
   * 存放客户端全局变量，可用于全局传递数据。
   */
  @observable session = new Map();

  @observable env = 'development';
  @observable currentLocale = 'zh-CN';

  @observable ready = false;

  /**
   * antd语言包
   */
  @computed
  get locale() {
    return require(`antd/lib/locale-provider/${this.currentLocale.replace('-', '_')}`);
  }

  /**
   * 语言包名称
   * @returns {string} 返回语言代码,比如：zh-cn, en-us
   */
  @computed
  get lang() {
    return this.currentLocale.replace('_', '-');
  }

  /**
   * 当前用户身份信息
   */
  @computed
  get identity() {
    return ctx.identity;
  }

  /**
   * 指示是否已经初始化完毕
   * @returns {boolean}
   */
  @computed
  get isReady() {
    return this.ready
      && this.routing
      && this.routing.isReady
      && this.authenticated;
  }

  /**
   * 是否显示开发工具，正式环境关闭
   * @returns {boolean}
   */
  @computed
  get showDevTools() {
    return this.env === 'development';
  }

  /**
   * 是否已经登录
   * @returns {boolean}
   */
  @computed
  get authenticated() {
    return this.identity && this.identity.authenticated;
  }

  @action
  pending() {
    return new Promise(() => this.increment())
  }

  @action
  injectRouting(routing) {
    this.routing = routing;
  }


  /**
   * 保存当前语言环境
   * @param currentLocale zh-cn, en-us
   */
  @action
  saveCurrentLocale(currentLocale) {
    moment.locale(currentLocale);

    let ll = localeLoaders[currentLocale] || [];
    //重新加载所有的资源
    Promise.all(ll.map((loader) => loader()))
      .then((loaders) => {
        let locale = locales[currentLocale] || {};
        loaders.map(loader => Object.assign(locale, loader.default));
        locales[currentLocale] = locale;
        //重新初始化国际化资源
        intl.init({
          'currentLocale': currentLocale,
          'locales': locales
        });
      })
      .then(() => {
        Cookies.set(intlOptions.cookieLocaleKey, currentLocale);
        runInAction(() => {
          this.currentLocale = currentLocale;
          this.ready = true;
        });
      })
      .catch((e) => {
        log.error(e.message);
      });
  }

  constructor() {
    let locale = intl.determineLocale(intlOptions);
    if (!locale) {
      locale = 'zh-CN';
    }
    this.saveCurrentLocale(locale);
  }

}

export default new UIState();
