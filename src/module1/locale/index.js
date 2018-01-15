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
export class Resources extends ResourceManager {

  welcome() {
    return intl.get('welcome').defaultMessage('Welcome');
  }
}

const RS = new Resources();
export default RS;


