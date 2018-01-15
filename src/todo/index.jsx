/*
 * Copyright (c) 2018. Inspireso and/or its affiliates.
 */

import {asyncComponent} from '../packages';

/**
 * 定义当前模块的路由
 */
export default [
  {
    title: 'todo',
    path: '/todo',
    routes: [
      {
        title: 'feature1',
        icon: 'star',
        path: '/todo/feature1',
        component: asyncComponent(() => import('./TodoList')),
      },
      {
        title: 'feature2',
        icon: 'star',
        path: '/todo/feature2',
        component: asyncComponent(() => import('./TodoList')),
      },
    ],
  },
];
