/*
 * Copyright (c) 2018. Inspireso and/or its affiliates.
 */
import RouterStore from './util/RouterStore';
import homeRoutes from './home';
import todo from './todo';
import module1 from './module1';

/**
 * 定义所有模块的入口
 */
const routes = [
    ...homeRoutes,
    ...todo,
    ...module1,
  ]
;

const routing = new RouterStore(routes);

export function injectHistory(history) {
  routing.injectHistory(history);
  return routing;
}

export {routing};
export default routes;
