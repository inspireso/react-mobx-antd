/*
 * Copyright (c) 2018. Inspireso and/or its affiliates.
 */

/**
 * 用于导出常用的class，function; 所有组件引入该接口，可以为后面扩展提供支持。
 */

// 导出工具集
export * from './util';

// 导出路由
export {Router, Route, Switch, Redirect, withRouter, matchPath} from 'react-router';
// 导出web端的路由函数
export {Link} from 'react-router-dom';

// 导出mobx
export {action, observe, autorun, computed, observable, runInAction} from 'mobx';
export {inject, observer} from 'mobx-react';





