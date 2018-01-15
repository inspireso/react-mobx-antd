/*
 * Copyright (c) 2018. Inspireso and/or its affiliates.
 */

import {observable, runInAction} from "mobx";

/**
 * 用于统一跳转到登录的方法
 */
export function redirectToLogin() {
  window.location.href = `/login`;
}

/**
 * 安全控制相关的上下文，主要存储当前用户和对应的权限列表。
 */
class SecurityContext {
  @observable ready = false;
  @observable identity;
  @observable functionList;

  constructor() {
    this.init();
  }

  /**
   * 初始化方法
   * 1，加载当前用户数据，如果还没有登录，则重定向到登录页面
   * 2，加载当前用户的功能列表
   */
  init() {
    this.loadIdentity()
      .then(user => {
        this.identity = user;
        if (user.authenticated) {
          return this.loadFunction(user.name);
        } else {
          redirectToLogin();
        }
      })
      .then((funs = []) => {
        runInAction(() => {
          this.functionList = funs;
          this.ready = true;
        });
      })
    ;
  }


  /**
   * 加载当前用户
   * @returns {code: string}
   */
  loadIdentity() {
    return Promise.resolve({
      authenticated: true,
      name: "user"
    });
    // let url = buildURL(`/api/user`);
    // return fetchGet(url);
  }

  /**
   * 加载用户的功能列表
   * @param user 用户代码
   * @returns {function[]}
   */
  loadFunction(user) {
    return Promise.resolve([]);
    // let url = buildURL(`/api/auth/function/${user}`);
    // return fetchGet(url);
  }

}

export default new SecurityContext();
