/*
 * Copyright (c) 2018. Inspireso and/or its affiliates.
 */

import ResourceManager, {addResourceLoader, intl} from '../../util/ResourceManager';

addResourceLoader({
  'en-US': () => import('./en_US'),
  'zh-CN': () => import('./zh_CN')
});


/**
 * 定义国际化资源
 */
class Resources extends ResourceManager {

  title() {
    return intl.get('app.title').defaultMessage('RAM');
  }

  home() {
    return intl.get('app.home').defaultMessage('Home');
  }

  lang(locale) {
    return intl.get(`app.${locale}`).defaultMessage(locale);
  }

  login() {
    return intl.get(`app.login`).defaultMessage('Login');
  }

  logout() {
    return intl.get(`app.logout`).defaultMessage('Logout');
  }
}


const RS = new Resources();
export default RS;


