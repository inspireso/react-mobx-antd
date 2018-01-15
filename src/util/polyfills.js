/*
 * Copyright (c) 2018. Inspireso and/or its affiliates.
 */

import moment from 'moment';
import 'whatwg-fetch'
import QueryString from 'querystring';
import Cookies from 'js-cookie';
import intl from 'react-intl-universal';
import {message} from 'antd';
import {log} from './debug';

Object.assign(Date.prototype, {
  /**
   * 扩展时间方法
   * (new Date()).format(); => '2017-12-01 19:10:00'
   */
  format(formatter = 'YYYY-MM-DD HH:mm:ss') {
    if (formatter)
      return moment(this).format(formatter);
    else
      return moment(this).format()
  },
});


Object.assign(String.prototype, {
  /**
   * 扩展字符串转为日期的方法，
   * '2017-12-01'.toDate()
   */
  toDate(formatter = 'YYYY-MM-DD') {
    if (formatter)
      return moment(this, formatter);
    else
      return moment(this, formatter);
  },

  /**
   * 扩展字符串转为时间的方法，
   * '2017-12-01 19:10:00'.toDateTime()
   */
  toDateTime(formatter = 'YYYY-MM-DD HH:mm:ss') {
    if (formatter)
      return moment(this, formatter);
    else
      return moment(this, formatter);
  },
});

const INCLUDE_COOKIES = {
  credentials: 'same-origin',
};

const X_REQUESTED_WITH = {
  'X-Requested-With': 'XMLHttpRequest',
};

function checkStatus(response) {
  if (response.ok) {
    return response;
  } else {
    let error = new Error(response.statusText);
    error.code = response.status;
    error.response = response;
    throw error;
  }
}

function json(response) {
  if (response.headers
    && response.headers.has('Content-Type')
    && response.headers.get('Content-Type').indexOf('application/json') >= 0) {
    return response.json()
  } else {
    return response;
  }

}

/**
 * 异常处理，统一进行消息提示,
 */
function errorHandle(e) {
  log.error(`${e.message}`);
  if (e.code === 401) {
    window.location.href = `/login`;
  } else {
    message.warn(intl.get(`error.${e.code || e.message}`).defaultMessage(e.message));
  }
  return {};
}

function assign(method, options = {}) {
  let headers = options.headers || {};
  headers = {headers: Object.assign({'X-CSRF-TOKEN': Cookies.get('X-CSRF-TOKEN')}, X_REQUESTED_WITH, headers)};
  return Object.assign(method, INCLUDE_COOKIES, options, headers,);
}

export const BodyTypes = {
  JSON: "application/json;charset=UTF-8",
  URLSearchParams: 'application/x-www-form-urlencoded;charset=UTF-8',
  FormData: 'multipart/form-data',
  String: 'text/plain;charset=UTF-8'
};


export function buildURL(url, data) {
  if (!data) {
    return url;
  }
  if (url.indexOf('?') < 0) {
    url += '?'
  }
  return `${url}${QueryString.encode(data)}`;
}


export function fetchGet(url, options) {
  options = assign({method: 'GET'}, options);
  return fetch(url, options)
    .then(checkStatus)
    .then(json)
    .catch(errorHandle)
    ;
}


export function fetchPost(url, options) {
  options = assign({method: 'POST'}, options);
  return fetch(url, options)
    .then(checkStatus)
    .then(json)
    .catch(errorHandle)
    ;
}

export function fetchPut(url, options) {
  options = assign({method: 'PUT'}, options);
  return fetch(url, options)
    .then(checkStatus)
    .then(json)
    .catch(errorHandle)
    ;
}

export function fetchDelete(url, options) {
  options = assign({method: 'DELETE'}, options);
  return fetch(url, options)
    .then(checkStatus)
    .then(json)
    .catch(errorHandle)
    ;
}

