/*
 * Copyright (c) 2018. Inspireso and/or its affiliates.
 */

import React from 'react';
import {shallow} from 'enzyme';
import App from './index';
import Toast from '../components/Toast';

// 使用方法参考：http://facebook.github.io/jest/docs/zh-Hans/expect.html#content
it('renders without crashing', () => {
  const wrapper = shallow(<App/>);
  expect(wrapper.props.current).toBeFalsy();
});
