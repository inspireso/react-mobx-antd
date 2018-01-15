/*
 * Copyright (c) 2018. Inspireso and/or its affiliates.
 */

import React from 'react';
import {matchPath, withRouter} from 'react-router';

// 使用方法参考：http://facebook.github.io/jest/docs/zh-Hans/expect.html#content
it('match', () => {
  const route = {
    path: '/users/:id',
    exact: true,
    strict: false
  };
  expect(matchPath('/user/123', route)).toBeNull();
  expect(matchPath('/users/123', route)).toMatchObject(
    {
      url: '/users/123',
      params: {id: '123'}
    });
});
