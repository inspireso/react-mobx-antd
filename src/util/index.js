/*
 * Copyright (c) 2018. Inspireso and/or its affiliates.
 */

export * from './polyfills';
export * from './antds';
export * from './reacts';

export {default as ctx} from './Context';
export {default as debug, log} from './debug';


/**
 * 检查是否是对象
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
 * @example
 *
 * _.isObjectLike({});
 * // => true
 *
 * _.isObjectLike([1, 2, 3]);
 * // => true
 *
 * _.isObjectLike(_.noop);
 * // => false
 *
 * _.isObjectLike(null);
 * // => false
 */
export function isObject(value) {
  return !!value && typeof value === 'object';
}

export function isFunction(value) {
  return !!value && typeof value === 'function';
}

const units = ['bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];

export function niceBytes(x) {
  let l = 0, n = parseInt(x, 10) || 0;
  while (n >= 1024) {
    n = n / 1024;
    l++;
  }
  return (n.toFixed(n >= 10 || l < 1 ? 0 : 1) + ' ' + units[l]);
}

