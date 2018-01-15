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
    title: 'module1',
    path: '/module1',
    icon: 'area-chart',
    routes: [
      {
        title: 'pie-chart',
        icon: 'pie-chart',
        path: '/module1/pie-chart',
        component: Child,
      },
      {
        title: 'bar-chart',
        icon: 'bar-chart',
        path: '/module1/bar-chart',
        component: Child,
      },
    ],
  },
]
;
