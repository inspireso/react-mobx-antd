# RMA

集成react、mobx、antd框架，提供使用react快速开发应用的脚手架



## 快速开始

```sh
git clone https://github.com/inspireso/react-mobx-antd.git

yarn install

yarn start
```



## 目录结构

```bash
├── /build/           # 项目输出目录
├── /config/          # 项目配置目录,由create-react-app生成
├── /public/          # 公共文件，编译时copy至dist目录
├── /scripts/         # 启动、构建脚本，由create-react-app生成
├── /src/             # 项目源码目录
│ ├── /__tests__/     # 测试目录
│ ├── /app/   		  # 应用界面框架模板
│ │ ├── /Layout/ 	   # 应用布局
│ │ └── /locale/       # 国际化资源
│ │ └── /Store/        # 状态存储
│ │ | └── UIState.js   # 界面状态定义
│ │ | └── TabStore.js  # Tab模式的状态定义
│ │ └── index.js       # 路由入口
│ │ └── App.less       # 路由入口
│ │ └── App.test.js    # 测试用例
│ ├── /module1/        # 模块1
│ ├── /todo/           # todo模块
│ ├── /utils/          # 工具函数
│ ├── index.js         # 入口文件
│ ├── index.less       # 全局样式
│ ├── locale.js        # 国际化文件汇总
│ ├── packages.js      # 导出常用的包
│ ├── routes.js        # 路由配置
│ ├── serviceWorker.js # service worker
│ ├── setupTests.js    # 测试配置
├── /theme/            # 项目样式
├── .editorconfig      # 编辑器配置
├── .env.development   # 开发环境变量
├── .env.production    # 生产环境变量
├── .env.test          # 测试环境变量
├── package.json       # 项目信息

```



## FAQ
- less的版本必须小于3.X.X
