---
category: docs
title: 定制主题
order: 5
---

我们所有的组件都支持一定程度的样式定制，以满足业务和品牌上多样化的视觉需求，包括但不限于主色、圆角、边框和部分组件的视觉定制。

我们使用了 [Less](https://lesscss.org/) 作为开发语言，并定义了一系列全局/组件的样式变量，你可以根据需求进行相应调整，在每个组件的文档中都会有说明哪些变量支持定制。

## 官方主题

我们提供了 2 种官方主题，欢迎在项目中试用，并且给我们提供反馈。

- `default`: 默认主题
- `seer`: 安全主题

### 方式一: 使用 CSS

如果项目不使用 Less，可在入口的 CSS 文件(如：`style.css`)或者 ts 文件(如：`idux.ts`/`main.ts`)中，全量引入主题样式文件。

CSS 文件中引入：

```css
/* 默认主题*/
@import "@idux/components/default.min.css";
@import "@idux/pro/default.min.css";

/* 安全主题 */
/* @import "@idux/components/seer.min.css" */
/* @import "@idux/pro/seer.min.css" */
```

ts 文件中引入：

```ts
// 默认主题
import "@idux/components/default.min.css";
import "@idux/pro/default.min.css";

// 安全主题
// import "@idux/components/seer.min.css"
// import "@idux/pro/seer.min.css"
```

### 方式二：使用 Less

可在入口的 Less 文件(如：`style.less`)或者 ts 文件(如：`idux.ts`/`main.ts`)中，全量引入主题样式文件, 同时还需要在构建工具中配置 less。

Less 文件中引入：

```less
/* 默认主题*/
@import "@idux/components/default.less";
@import "@idux/pro/default.less";

/* 安全主题 */
/* @import "@idux/components/seer.less" */
/* @import "@idux/pro/seer.less" */
```

ts 文件中引入：

```ts
// 默认主题
import "@idux/components/default.less";
import "@idux/pro/default.less";

// 安全主题
// import "@idux/components/seer.less"
// import "@idux/pro/seer.less"
```

配置 less, 以 vite 为例，修改 `vite.config.ts`:

```ts
// https://vitejs.dev/config/
export default defineConfig({
  ...
  css: {
    preprocessorOptions: {
      less: {
        javascriptEnabled: true,
      },
    },
  },
});

```

## 自定义主题

### 方式一：在 Less 文件中覆盖主题变量

在 `styles.less` 里引入官方主题文件，再根据实际需求自定义覆盖主题样式变量的参数。

例如，在以下样例中通过修改 `@primary-color` 的数值将预定义默认主题的基础色修改为 `#f5222d`：

```less
// -------- 引入官方提供的 less 样式入口文件 -----------
@import "@idux/components/default.less";
@import "@idux/pro/default.less";

// -------- 自定义参数覆盖 -----------
@primary-color: #f5222d;
...
```

### 方式二：构建工具中覆盖主题变量

以 vite 为例，修改 `vite.config.ts`:

```ts
// https://vitejs.dev/config/
export default defineConfig({
  ...
  css: {
    preprocessorOptions: {
      less: {
        javascriptEnabled: true,
        modifyVars: {
          'primary-color': '#f5222d',
          ...
        },
      },
    },
  },
});

```

## 动态切换主题

TODO: 待补充
