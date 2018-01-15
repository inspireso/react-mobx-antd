/*
 * Copyright (c) 2018. Inspireso and/or its affiliates.
 */
import React from 'react';
import locale from './locale';

const Child = ({match}) => (
  <div>
    <h1>{locale.welcome()}</h1>
  </div>
);

/**
 * 定义当前模块的路由
 */
export default [
  {
    title: 'Home',
    path: '/',
    icon: 'home',
    exact: true,
    routes: [
      {
        title: 'favorite1',
        icon: 'star',
        path: '/todo/feature1',
        component: Child,
      },
      {
        title: 'favorite2',
        icon: 'star',
        path: '/module1/bar-chart',
        component: Child,
      },
    ],
  },
]
;
