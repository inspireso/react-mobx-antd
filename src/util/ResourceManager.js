/*
 * Copyright (c) 2018. Inspireso and/or its affiliates.
 */
import intl from 'react-intl-universal';
import moment from 'moment';

/**
 * 国际化文件加载器
 * @type {object}
 */
const localeLoaders = {};


export {intl, localeLoaders}

/**
 * 资源加载器，异步加载
 * @param localeLoaders {'en-US': () => import('./en_US'), 'zh-CN': () => import('./zh_CN')}}
 */
export function addResourceLoader(loaders) {
  Object.keys(loaders).forEach((key) => {
    let ll = localeLoaders[key] || [];
    ll.push(loaders[key]);
    localeLoaders[key] = ll;
  });
}

/**
 * 资源管理
 */
export default class ResourceManager {

  /**
   * 获取国际化文本
   * @param {string} key
   * @param {Object} variables Variables in message
   * @returns {string} message
   */
  get(key, variables) {
    return intl.get(key, variables).defaultMessage(key);
  }

  /**
   * 获取全局默认格式，可以通过资源文件定义
   * 使用方法：
   *
   * import locale from '../locale';
   *
   * <DatePicker defaultValue={locale.moment('2015/01/01')} format={locale.dateFormat()} />
   *
   */
  dateFormat() {
    return intl.get('global.format.date').defaultMessage('YYYY-MM-DD HH:mm:ss');
  }

  /**
   * 从服务端的数据传递给组件时候格式化。
   * @param string 服务d端返回的时间字符串。
   * @returns {*|moment.Moment} 返回 DatePicker、MonthPicker、RangePicker 可以识别的value值。
   */
  moment(string) {
    return moment(string, this.dateFormat())
  }

  reset() {
    return this.get('reset').defaultMessage('Reset');
  }

  add() {
    return this.get('add').defaultMessage('Add');
  }

  delete() {
    return this.get('delete').defaultMessage('Delete');
  }

  save() {
    return this.get('save').defaultMessage('Save');
  }

  search() {
    return this.get('search').defaultMessage('Search');
  }

  refresh() {
    return this.get('refresh').defaultMessage('Refresh');
  }
}


