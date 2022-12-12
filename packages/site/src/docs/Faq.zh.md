---
category: docs
title: 常见问题
order: 10
---

## 本地和官方文档的样式不一致？

请确认是否正确引入了组件样式，请参考: [快速上手](/docs/getting-started/zh) 和 [定制主题](/docs/customize-theme/zh) 进行一些必要的配置。

需要强调的是，在没有特殊需求的情况下，请使用组件库提供的 reset 样式，`"@idux/components/style/core/reset.default.min.css"`。如果没有引入它，务必确认是否提供了必要的全局样式，参见[#1194](https://github.com/IDuxFE/idux/issues/1194)。

## 无法通过 `useModal` 创建弹窗组件？(`useMessage`, `useDrawer`...)

如果你想通过 useModal 来创建对话框，则你需要把组件包裹在 `IxModalProvider` 内部，因为这样才不会丢失应用的上下文信息, 参见[IxModalProvider](/components/modal/zh?tab=api#IxModalProvider)。

其他通过 `useXxx` 创建的组件也是如此。

## 在组件外(如：`ts` 文件/`setup` 函数外)单独使用 `useModal`, `useMessage`, `useDrawer`...

`useXxx` 的实现原理是利用 `provide/inject` 来拿到 `XxxProvider` 组件提供的方法来创建组件，理论上它只能在组件的 `setup` 中使用。

但是我们可以通过 `ref` 将 `XxxProvider` 的实例引用给保存起来，给到外部使用，可以参考：[iduxProviders.ts](https://github.com/IDuxFE/idux-setup/blob/main/src/utils/iduxProviders.ts), 然后就可以 `import { Modal } from '@utils'` 来使用了。

## Modal 和 Drawer 组件在 Chrome 版本 < 87 时，无法正常显示？

如果遇到该问题：请检查一下 `.ix-modal-wrapper` 的样式，是不是被压缩成了 `inset: 0`, 参见[#1038](https://github.com/IDuxFE/idux/issues/1038)。

## 在浮层组件中打开另一个浮层组件，导致原浮层消失？(如：`Select`, `Dropdown`, `Popover`...)

可以通过设置 `overlayContainer` 来解决，把浮层插入到当前的 `DOM` 内，而不是默认的 `body` 上。  
例如你可以设置 `<IxSelect :overlayContainer='trigger => trigger.parentElement' />` 在 Popover 中渲染下拉框组件。  
你也可以通过在全局配置中设置来进行全局覆盖，例如：

```ts
// 也可以在初始化的时候，使用 createGlobalConfig
// 需要特别注意的是，这里的 `trigger` 可能为空，因为该配置对于 `Modal, Drawer` 等组件同样生效，此类组件不存在 `trigger` 元素。
useGlobalConfig('common', { overlayContainer: trigger => trigger?.parentElement })
```

## 如何自定义控制浮层的 `z-index`? 通常在与其他组件库混用，或者使用了微前端框架的情况下需要。

首先我们大多数浮层组件都提供了 `zIndex` 的配置（如果没有，可以给我们提供 issue 或者直接 PR），你可以精确的控制它们。  
如果你觉得控制每一个组件的 `zIndex` 比较麻烦，我们也提供了全局配置以便于你进行全局统一管理，例如：

```ts
const initZIndex = 1000
const indexCount = 0
const customGetZIndex = () => initZIndex + indexCount++
// 也可以在初始化的时候，使用 createGlobalConfig
useGlobalConfig('common', { overlayZIndex: customGetZIndex })
```

## 图标不显示？如何更新图标？

请务必花几分钟时间仔细阅读[快速上手](/docs/getting-started/zh) 和 [图标的动态加载与静态加载](/components/icon/zh?tab=api#FAQ) 进行一些必要的配置。

如果你使用了动态加载，可以使用 `vite-plugin-static-copy` 或者 `CopyWebpackPlugin` 来自动更新图标。

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
          dest: "idux-icons", // `loadIconDynamically` 设置的目录名称
        },
      ],
    }),
  ],
});
```

## `useFormGroup` 怎么使用, 如何自定义验证器？(`useFormControl`, `useFormArray`)

请花一点时间仔细阅读 [Forms 表单](https://idux.site/cdk/forms/zh?tab=overview) 的**概要说明**文档。

## 表单输入类组件的 `value` 和 `disabled` 设置不生效？

请确认是否使用了 `control` 来接管了 `value` 和 `disabled` 的控制，此时这两个 API 无效，请使用 `FormControl` 提供的 `setValue`, `getValue`, `watchValue`, `enable`, `disable` 等一系列方法来操作和访问状态。

## 缺少 TypeScript 的类型定义？或者虽然定义了但是没有 export？

为了给用户提供最佳的使用体验，我们为此付出了诸多努力，基本上能提供的类型我们都提供了，可能会有一些遗漏，欢迎给我们提 issue 或者直接 PR 帮助我们完善。

## 文档中没有提供的 API 我可以使用吗？

不推荐使用，我们不会对文档中没有公开的 API 保证稳定性，它很可能在某个版本中被移除或者修改。

如果你确实需要使用，可以给我们提 issue 让我们开放出来，否则在版本升级后，请自行验证确保升级后隐藏的接口依旧可用。

## 业务中怎么调试 `@idux` 的源码?

我们每个组件都会打包成一个单独基于 `esm` 的 `js` 文件, 而且是未经压缩的，是具有可读性的代码，所以只需要像调试业务代码一样就好了。

- 打开控制台，切换到源码面板。
- 按 `ctrl` + `p` 搜索你想要调试的组件，例如输入：`@idux/components/forms/index` 就能调试 `IxForm` 和 `IxFormItem` 组件以及提供的一些函数。
