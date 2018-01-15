/*
 * Copyright (c) 2018. Inspireso and/or its affiliates.
 */

import {isPathWhitelisted} from 'sw-precache/lib/functions';

const whitelist = ["^(?!((\\/login)|(\\/logout)|(\\/api))).*?$"];
it('isPathWhitelisted', () => {

  // 使用方法参考：http://facebook.github.io/jest/docs/zh-Hans/expect.html#content
  expect(isPathWhitelisted(whitelist, 'https://localhost/login')).toEqual(false);
  expect(isPathWhitelisted(whitelist, 'https://localhost:8080/testlogintestxxx')).toEqual(true);
  expect(isPathWhitelisted(whitelist, 'https://localhost/login?redirect_url=xxxxx')).toEqual(false);
  expect(isPathWhitelisted(whitelist, 'https://localhost:8080/logout')).toEqual(false);
  expect(isPathWhitelisted(whitelist, 'https://localhost:8080/testlogout')).toEqual(true);
  expect(isPathWhitelisted(whitelist, 'https://localhost:8080/api/api1')).toEqual(false);
  expect(isPathWhitelisted(whitelist, 'https://localhost:8080/static/api1')).toEqual(true);
});
