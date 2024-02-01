---
category: docs
title: 从 V1 到 V2
order: 10
---

这个文档可以帮助你快速从 `1.x` 版本升级到 `2.x` 版本。

## 2.0 的变化

### typography 被移除

由于 `typography` 是我们早期开发的组件，其功能甚是简陋，且不符合设计规范的，我们在 `2.0` 的初期将它移除了，请不要再使用。

后续我们可能会根据设计需要提供更完整的 `typography` 支持，但是暂时没有计划。

### 设计规范被重新整理

在 `1.x` 版本的开发期间，我们很无奈得经历了一阶段没有设计师参与的开发，因此导致我们的设计并不规范。

在我们得到了设计师的支持之后，设计规范逐渐产生，我们也在那之后提供了一套名为 `seer` 的主题，但原本的默认主题并没有设计规范支持。

在 `2.0` 之后，我们彻底放弃了原先 `default` 主题的支持，并将 `seer` 作为当前的默认主题，全局配置中暴露的 `seerConfig` 也被移除并归并到了默认配置。

并且，我们根据设计规范产出了完整的设计token, 基于这些token对组件库的样式进行了大规模的重构，这也是 `2.0` 发布的最大原因。

### 新的动态主题机制

在 `1.x` 和 `0.x` 版本的初期，我们支持了一套以 `less` 变量为基础的主题变量，但是这些变量的定义太过于随意以至于并不能真正实现主题自定义而最终无法维护。

在 `1.x` 的后面阶段，我们初步整理了少量的 `css` 变量作为主题支持，但是受限于技术债务，并没有能够让其真正发挥作用。

在 `2.0` 版本中，我们支持了整套的基于设计token的动态主题方案，使用 `ThemeProvider` 替代了原先的 `less` 和 `css` 变量，并将原先 `css` 变量彻底移除，`less` 变量大部分移除并不推荐使用。

受益于新的主题机制，动态的主题切换不再需要手动替换 `css` 文件，更不需要前期的主题打包，一切都通过 `javascript` 变量来控制，并且我们建立了相对完整的主题变量派生逻辑，使得替换基础变量就可以达到自定义新主题的效果。

另外，在新的主题机制中，我们使主题的嵌套和局部覆盖变成了可能。

总结：

- 原有的 `css` 变量被全部移除，`less` 变量被大部分移除并不推荐使用。
- 需要在项目中引入 `IxThemeProvider` 并包裹项目根组件

### 样式入口改变

由于不需要原有的主题方案，原有的 `@idux/components/{default,seer}.css`、`@idux/components/{default,seer}.full.css`、 `*/style/themes` 下的内容被全部移除，`pro` 组件同理。

现在样式的入口改为 `@idux/components/index.css` 和 `@idux/components/index.full.css`，`pro` 组件同理。

组件按需引入的样式入口改为了 `*/style/index.js` 和 `*/style/index_css.js`。

为了兼容某些不希望使用 `IxThemeProvider` 的场景，我们将全部的主题变量预先打包了，并放在了项目中，详情请参考 [定制主题](/docs/customize-theme/zh#FAQ)

## 升级准备

### 移除废弃的API支持

在 1.x 的开发过程中，我们逐渐发现一些 API 的定义并不合理，我们将这些 API 标记为了 `deprecated`，这些 API 在 `2.0` 的正式版将不再支持，请替换成推荐的 API。

注意： 2.0 的正式版之前我们暂时不会移除这些 API，只有 `IxTag` 的 `color` 被移除了，因为它影响了后面的设计。

以下是废弃的内容：

- __cdk/click-outside__: `clickOutside` 指令已经废弃，替换使用 `vClickOutside`
- __cdk/scroll__: `itemHeight` 已经废弃，替换使用 `rowHeight`
- __cdk/scroll__: `itemRender` 已经废弃，替换使用 `rowRender`
- __cdk/scroll__: scrollTo 方法的参数 `align` 已经废弃，替换使用 `verticalAlign`
- __cdk/scroll__: scrollTo 方法的参数 `offset` 已经废弃，替换使用 `verticalOffset`
- __cdk/scroll__: scrollTo 方法的参数 `key` 已经废弃，替换使用 `rowKey`
- __cdk/scroll__: scrollTo 方法的参数 `index` 已经废弃，替换使用 `rowIndex`
- __components/badge__: `color` 已经废弃，替换使用css变量 `--ix-badge-background-color`
- __components/badge__: `dot` 全局配置已经废弃，请不要再使用
- __components/empty__: `icon` 全局配置已经废弃，请不要再使用
- __components/modal__: `width` 全局配置已经废弃，请不要再使用
- __components/tabs__: `onTabClick` 事件已经废弃，请不要再使用
- __components/text__: `expandable` 已经废弃，替换使用 `ellipsis.expandable`
- __components/text__: `lineClamp` 已经废弃，替换使用 `ellipsis.rows`
- __pro/layout__: `IxProLayoutSiderTrigger` 已经废弃，替换使用 `IxLayoutSiderTrigger`
- __pro/layout__: `compress` 已经废弃，请不要再使用
- __pro/layout__: `siderHover` 已经废弃，替代使用 `sider.pointer`
- __pro/table__: `columnIndexable` 全局配置已经废弃，请使用 components 下的 `columnIndexable` 全局配置
- __pro/search__: `searchField` 配置 `quickSelectSearchable` 已经废弃，替换使用 `quickSelect.searchable`


## 开始升级

### 保存现在的代码

由于升级过程中可能会遇到问题，请用 `git` 保留现有的代码，避免代码丢失。

### 升级组件库

升级到最新的 `2.0` 组件库

### 去除less变量的引用

除了 `@idux-prefix`，请去掉所有的 `less` 变量的引用。

### 去除原有css变量的引用

原有的 `css` 变量已经被全部移除，如果需要使用新的主题变量，请参考 [定制主题](/docs/customize-theme/zh)

### 修改样式入口

根据上述的描述替换样式入口文件。

### 引入 IxThemeProvider

使用 `IxThemeProvider` 包裹项目根组件。

### 根据需要定制主题

如果新的默认主题不符合项目的设计规范，请根据 [定制主题](/docs/customize-theme/zh) 中的 token 列表修改主题变量

需要注意的是，基础token中的 `fontSize` 仅作为字体大小梯度变量生成的token，实际的字体大小会使用 `fontSizeSm`，这一点可能会在后期更改，例如提供一个 `fontSizeText` token。

### 修改手动按需引入的代码

如果是通过 `unplugin-vue-components`，则无需更改。

### 测试

请不要忽略升级之后的测试环节！请不要忽略升级之后的测试环节！请不要忽略升级之后的测试环节！

我们在 `2.0` 的发布阶段经过了相对完整的测试，但由于项目中的复杂场景以及升级过程中的问题，仍可能出现bug，请不要让组件库的升级导致实际的损失！
