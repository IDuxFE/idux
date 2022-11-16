## 使用场景

需要对不同环境做兼容性处理时使用

`@idux/cdk/platform` 提供了一组用于判断当前浏览器环境的工具

| 属性 | 说明 | 类型 |  备注 |
| --- | --- | --- | --- |
| `isBrowser` | 是否为浏览器环境  | `boolean` | - |
| `isEdge` | 是否为 `Microsoft Edge` 浏览器  | `boolean` | - |
| `isTrident` | 是否为 `Microsoft Trident` 渲染引擎  | `boolean` | - |
| `isBlink` | 是否为 `Blink` 渲染引擎  | `boolean` | - |
| `isWebKit` | 是否为 `WebKit` 渲染引擎  | `boolean` | - |
| `isFirefox` | 是否为 `Firefox` 浏览器  | `boolean` | - |
| `isSafari` | 是否为 `Safari` 浏览器  | `boolean` | - |
| `isIOS` | 是否为 `IOS` 平台  | `boolean` | - |
| `isAndroid` | 是否为 `Android` 平台  | `boolean` | - |
| `supportsFlexGap` | 检查用户的浏览器是否支持 flex 的 gap 配置  | `() => boolean` | 参见[gap](https://developer.mozilla.org/zh-CN/docs/Web/CSS/gap#%E6%B5%8F%E8%A7%88%E5%99%A8%E5%85%BC%E5%AE%B9%E6%80%A7) |
| `supportsPassiveEventListeners` | 检查用户的浏览器是否支持被动事件侦听器  | `() => boolean` | 参见 [https://github.com/WICG/EventListenerOptions/blob/gh-pages/explainer.md](https://github.com/WICG/EventListenerOptions/blob/gh-pages/explainer.md) |
