---
category: cdk
type:
title: Platform
subtitle: 平台
cover:
---

一组用于判断当前浏览器环境的工具

## 何时使用

需要对不同环境做兼容性处理时

## API

| 属性 | 说明 | 类型 |
| --- | --- | --- |
| `isBrowser` | 是否为浏览器环境  | `boolean` |
| `isEdge` | 是否为 `Microsoft Edge` 浏览器  | `boolean` |
| `isTrident` | 是否为 `Microsoft Trident` 渲染引擎  | `boolean` |
| `isBlink` | 是否为 `Blink` 渲染引擎  | `boolean` |
| `isWebKit` | 是否为 `WebKit` 渲染引擎  | `boolean` |
| `isFirefox` | 是否为 `Firefox` 浏览器  | `boolean` |
| `isSafari` | 是否为 `Safari` 浏览器  | `boolean` |
| `isIOS` | 是否为 `IOS` 平台  | `boolean` |
| `isAndroid` | 是否为 `Android` 平台  | `boolean` |
