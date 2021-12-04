---
category: docs
order: 0
title: 介绍
---

`@idux` 是一套企业级中后台 UI 组件库, 致力于提供高效愉悦的开发体验。

基于 Vue 3.x + TypeScript 开发, 全部代码开源并遵循 MIT 协议，任何企业、组织及个人均可免费使用。

<div class="introduce-badges">

[![Build Status](https://dev.azure.com/iduxfeteam/IduxFE/_apis/build/status/IduxFE.idux?branchName=main)](https://dev.azure.com/iduxfeteam/IduxFE/_build/latest?definitionId=2&branchName=main)
[![Codecov](https://codecov.io/gh/IDuxFE/idux/branch/main/graph/badge.svg?token=PGAUXP06V3)](https://codecov.io/gh/IDuxFE/idux)
[![Npm version](https://img.shields.io/npm/v/@idux/components)](https://www.npmjs.com/package/@idux/components)
[![Release Date](https://img.shields.io/github/release-date/IDuxFE/idux)](https://github.com/IDuxFE/idux/releases)

[![CodeFactor](https://www.codefactor.io/repository/github/iduxfe/idux/badge)](https://www.codefactor.io/repository/github/iduxfe/idux)
[![Code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4)](https://github.com/prettier/prettier)
[![GitHub contributors](https://img.shields.io/github/contributors/IDuxFE/idux)](https://github.com/IDuxFE/idux/contributors)
[![GitHub license](https://img.shields.io/github/license/IDuxFE/idux)](https://github.com/IDuxFE/idux/blob/main/LICENSE)

</div>

## ✨ 特性

- Monorepo 管理模式：`cdk`, `components`, `pro`
- 全面拥抱 Composition Api，从源码到文档
- 完全使用 TypeScript 开发，提供完整的类型定义
- 开箱即用的 Tree Shaking
- 国际化语言支持
- 灵活的全局配置
- 深入细节的主题定制能力

## 🖥 支持环境

- Vue `^3.0.0` [![vue-next](https://img.shields.io/npm/v/vue/next.svg)](https://www.npmjs.com/package/vue/v/next)

| <img src="https://cdn.jsdelivr.net/npm/@browser-logos/edge/edge_32x32.png" alt="Edge"/><br />Edge | <img src="https://cdn.jsdelivr.net/npm/@browser-logos/chrome/chrome_32x32.png" alt="Chrome"/><br />Chrome | <img src="https://cdn.jsdelivr.net/npm/@browser-logos/firefox/firefox_32x32.png" alt="Firefox"/><br />Firefox | <img src="https://cdn.jsdelivr.net/npm/@browser-logos/safari/safari_32x32.png" alt="Safari"/><br />Safari | <img src="https://cdn.jsdelivr.net/npm/@browser-logos/electron/electron_32x32.png" alt="Electron"/><br />Electron |
| --------- | --------- | --------- | --------- | --------- |
| 79 + | 79 + | 72 + | 13.1 + | 10 + |

## 📦 安装

```bash
npm install --save @idux/cdk @idux/components
```

## 🔨 使用

- **按需加载**：当你只用到 `@idux` 的部分组件且比较在意包体积大小时，可以使用以下方式只加载用到的组件。

  - Vite:

    ```ts
    // vite.config
    import { IduxResolver } from 'unplugin-vue-components/resolvers'
    import Components from 'unplugin-vue-components/vite'

    export default {
      plugins: [
        /* ... */
        Components({
        // 如果不指定 `importStyle`（推荐用法）
        // 依旧需要在 main.ts 中 `import "@idux/components/index.css"`
        resolvers: [IduxResolver({ importStyle: 'css' })],
        }),
      ]
    }
    ```

  - Webpack:

    ```ts
    // webpack.config
    import { IduxResolver } from 'unplugin-vue-components/resolvers'
    import Components from 'unplugin-vue-components/webpack'

    module.exports = {
      plugins: [
        /* ... */
        Components({
        // 如果不指定 `importStyle`（推荐用法）
        // 依旧需要在 main.ts 中 `import "@idux/components/index.css"`
        resolvers: [IduxResolver({ importStyle: 'css' })],
        }),
      ]
    }
    ```

  - 手动加载

    ```ts
    // App.vue or other components
    import { IxButton } from "@idux/components/button"
    import "@idux/components/button/style/css"
    ```

- **全量加载**：当你会用到 `@idux` 的大部分组件或者对包体积不敏感时，可以使用全量加载。

    ```ts
    // main.ts
    import iduxComponents from "@idux/components"
    // or import "@idux/components/index.less"
    import "@idux/components/index.css" 

    createApp(App).use(iduxComponents).mount('#app')
    ```

## 🔗 链接

## ⌨️ 开发

```bash
npm install

npm start
```

使用浏览器访问：`http://localhost:3000`

## 🤝 如何贡献

[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](https://github.com/IDuxFE/idux/pulls)

在任何形式的参与前，请先阅读 [贡献者文档](https://github.com/IDuxFE/idux/blob/main/packages/site/src/docs/Contributing.zh.md)。如果你希望参与贡献，欢迎 [Pull Request](https://github.com/IDuxFE/idux/pulls)，或给我们 [报告 Bug](https://github.com/IDuxFE/idux/issues)。

> 强烈推荐阅读 [《提问的智慧》](https://github.com/ryanhanwu/How-To-Ask-Questions-The-Smart-Way)、[《如何向开源社区提问题》](https://github.com/seajs/seajs/issues/545) 和 [《如何有效地报告 Bug》](http://www.chiark.greenend.org.uk/%7Esgtatham/bugs-cn.html)、[《如何向开源项目提交无法解答的问题》](https://zhuanlan.zhihu.com/p/25795393)，更好的问题更容易获得帮助。

## 💖 特别感谢

部分功能的灵感来自于以下优秀的开源项目。  

- [@angular](https://github.com/angular)
- [ant-design](https://github.com/ant-design)
- [NG-ZORRO](https://github.com/NG-ZORRO)

## ☀️ 授权协议

[MIT](https://github.com/IDuxFE/idux/blob/main/LICENSE) © 2020-present IDuxFE
