---
category: components
type: 其他
title: BackTop
subtitle: 回到顶部
cover: 
---

返回页面顶部的操作按钮

## 何时使用

- 当页面内容区域比较长时。
- 当用户需要频繁返回顶部查看相关内容时。

## API

### `ix-back-top`

#### Props

| 参数 | 说明 | 类型 | 默认值 | 全局配置 | 备注 |
| -- | -- | -- | --  | -- | -- |
| `target` | 需要监听其滚动事件的元素 | `string \| HTMLElement` | `window` | - | 传入 string 类型，会在 mounted 的时候使用 querySelector 来获取元素 |
| `duration` | 回到顶部所需时间（ms） | `number` | `450` |  ✅  | - |
| `visibility-height` | 滚动高度达到此参数值才出现 | `number` | `400`  |  ✅  | - |

#### Slots

| 名称 | 说明 | 参数类型 | 备注 |
|  -- | -- | -- | -- |
|  `default` | 自定义显示内容 | - | - |

#### Emits

| 名称 | 说明 | 参数类型 | 备注 |
| -- | -- | -- | -- |
| `click` | 点击按钮触发的事件 | `event` | - |
