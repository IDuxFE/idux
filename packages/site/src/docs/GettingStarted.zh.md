---
category: docs
title: 快速上手
order: 1
---

`@idux` 致力于提供给程序员**愉悦**的开发体验。

> 在开始之前，推荐先学习 [Vue 3.x](https://v3.vuejs.org) 和 [ES2015](https://babeljs.io/docs/en/learn)，并正确安装和配置了 [Node.js](https://nodejs.org) v12 或以上。官方指南假设你已了解关于 HTML、CSS 和 JavaScript 的中级知识，并且已经完全掌握了 Vue 3.x 及配套设施的正确开发方式。如果你刚开始学习前端或者 Vue，将 UI 框架作为你的第一步可能不是最好的主意。

## 在线演示

最简单的使用方式参照以下 CodeSandbox 或者 StackBlitz 演示，也推荐 Fork 示例来进行 `Bug Report`，也可以将其下载下来作为项目初始化模板。

- [CodeSandbox: idux-starter](https://codesandbox.io/s/idux-starter-7o9lv)
- [StackBlitz: idux-starter](https://stackblitz.com/edit/idux-starter)

## 使用 vite

实际项目开发中，你会需要对 Vue 和 TypeScript 代码的构建、调试、代理、打包部署等一系列工程化的需求。

我们强烈建议使用 [vite](https://vitejs.dev) 及其工具链辅助进行开发，下面我们用一个简单的实例来说明。

### 创建一个项目

> 如果你想了解更多 vite 及其工具链的功能和命令，建议访问  [vite](https://vitejs.dev) 了解更多。

执行以下命令并跟随提示操作，`vite` 会在当前目录下新建一个名称为 `vite-project` （如果你没有指定的话）的文件夹。

```bash
npm create vite@latest

cd vite-project

npm install
```

### 安装组件

根据你的需求决定是否需要安装 `@idux/pro`。

```bash
npm install @idux/cdk @idux/components @idux/pro
```

### 初始化配置

参考下面的代码，新建一个 `idux.ts` 文件，对 `@idux` 进行初始化配置，包括引入国际化文件，导入模块，引入样式文件等工作。

```ts
// idux.ts
import { type App } from "vue";

// 导入 cdk 样式，注意是 `index`, 因为 cdk 不会区分主题
import "@idux/cdk/index.min.css";

// 如果不需要 reset 全局样式，移除下一行代码，但是这可能导致部分组件样式异常，需要提供一些必须的全局样式
// 参见：https://github.com/IDuxFE/idux/issues/1194
import "@idux/components/style/core/reset.default.min.css";
// 如果不需要 reset 滚动条样式，移除下一行代码
import "@idux/components/style/core/reset-scroll.default.min.css";

// 如果需要 css 按需加载，移除下面 2 行代码
import "@idux/components/default.min.css";
import "@idux/pro/default.min.css";

// 如果需要 js 按需加载，移除下面 3 行代码
import IduxCdk from "@idux/cdk";
import IduxComponents from "@idux/components";
import IduxPro from "@idux/pro";

import { createGlobalConfig } from "@idux/components/config";
import { IDUX_ICON_DEPENDENCIES, addIconDefinitions } from "@idux/components/icon";
// import { enUS } from "@idux/components/locales";

// 静态加载: `IDUX_ICON_DEPENDENCIES` 是 `@idux` 的部分组件默认所使用到图标，建议在此时静态引入。
addIconDefinitions(IDUX_ICON_DEPENDENCIES);

// 动态加载：不会被打包，可以减小包体积，需要加载的时候时候 http 请求加载
// 注意：请确认图标的 svg 资源被正确放入到 `public/idux-icons` 目录中, 可以参考下面的 vite 配置
const loadIconDynamically = (iconName: string) => {
  return fetch(`/idux-icons/${iconName}.svg`).then((res) => res.text());
};

const globalConfig = createGlobalConfig({
  // 默认为中文，可以打开注释设置为其他语言
  // locale: enUS,
  icon: { loadIconDynamically },
});

const install = (app: App): void => {
  app.use(IduxCdk).use(IduxComponents).use(IduxPro).use(globalConfig);
};

export default { install };
```

在 `main.ts` 中引入 `idux.ts`

```ts
// main.ts
import { createApp } from "vue";
import Idux from "./idux";

import App from "./App.vue";

createApp(App).use(Idux).mount("#app");
```

修改 `vite.config.ts`, 以支持图标资源的动态加载，如果你不需要用到动态加载图标，无需配置此项。

```ts
// vite.config.ts
import { viteStaticCopy } from "vite-plugin-static-copy";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    ...
    viteStaticCopy({
      targets: [
        {
          src: "./node_modules/@idux/components/icon/assets/*.svg",
          dest: "idux-icons",
        },
      ],
    }),
  ],
});
```

### 类型提示

我们提供了所有组件的类型定义，你可以参考下面的代码进行导入类型声明。

```ts
// vite-env.d.ts
/// <reference types="vite/client" />
/// <reference types="@idux/cdk/types" />
/// <reference types="@idux/components/types" />
/// <reference types="@idux/pro/types" />

declare module "*.vue" {
  import type { DefineComponent } from "vue";
  const component: DefineComponent<{}, {}, any>;
  export default component;
}
```

### 文档提示

我们开发一套在 IDE（VSCode/Webstorm）中提供组件文档提示的扩展——[iDux-Coder](https://github.com/IDuxFE/idux-coder/releases)

用于提供代码即文档的开发体验，实现在 IDE 中组件参数即查即用，而无需组件文档网站与 IDE 的来回切换，并支持高度自由的数据配置定制，是 iDux-Coder 但不仅仅只是 iDux。

### 开发调试

一键启动调试，运行成功后显示欢迎页面。

```bash
npm run dev
```

然后你可以将此文档中的任意示例复制到 `App.vue` 中，他们都可以正常运行。

## 使用 @vue/cli

除了创建项目的步骤外，其他步骤与使用 `vite` 没有任何不同，建议访问  [Vue CLI](https://cli.vuejs.org) 了解更多。

## 按需加载

当你只用到 `@idux` 的部分组件且比较在意包体积大小时，可以只加载用到的组件。

推荐仅按需加载 js 代码，css 代码无需按需加载, 首先你需要修改 `idux.ts` 中的代码。

```diff
- import IduxCdk from "@idux/cdk";
- import IduxComponents from "@idux/components";
- import IduxPro from "@idux/pro";

const install = (app: App): void => {
-  app.use(IduxCdk).use(IduxComponents).use(IduxPro).use(globalConfig);
+  app.use(globalConfig)
};
```

然后可以选择以下任意一种方式进行加载组件代码。

- Vite:

```ts
// vite.config
import { IduxResolver } from 'unplugin-vue-components/resolvers'
import Components from 'unplugin-vue-components/vite'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    /* ... */
    Components({
      resolvers: [IduxResolver()],
      // 可以通过指定 `importStyle` 来按需加载 css 或 less 代码
      // 别忘了移除掉 idux.ts 中的样式导入代码
      // resolvers: [IduxResolver({ importStyle: 'css' })],
    }),
  ]
})
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
      resolvers: [IduxResolver()],
    }),
  ]
}
```

- 手动加载

```ts
// App.vue or other components
import { IxButton } from "@idux/components/button"
import "@idux/components/button/style/themes/default_css"
```

## 其他

- [全局配置](/docs/global-config/zh)
- [国际化配置](/docs/i18n/zh)
- [定制主题](/docs/customize-theme/zh)
- [使用图标](/components/icon/zh#FAQ)
