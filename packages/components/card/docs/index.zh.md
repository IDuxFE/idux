---
category: components
type: 内容展示
title: Card
subtitle: 卡片组件
cover:
---

卡片用于内容展示

## 何时使用

卡片组件

- 支持设置卡片大小
- 支持设置卡片边框的显示
- 支持title自定义
- 支持卡片右上角操作区域自定义
- 支持卡片loading状态
- 支持卡片悬浮效果

## API

### `ix-card`

| 属性 | 说明 | 类型 | 默认值 | 全局配置 | 备注 |
| --- | --- | --- | --- | --- | --- |
| `title` | 卡片标题 | `string\|slot` | - | - | - |
| `extra` | 右上角操作区域 | `string\|slot` | - | - | - |
| `footer` | 卡片底部操作区域 | `slot` | - | - | - |
| `borderless` | 是否有边框 | `booelan` | `false` | `false` | - |
| `hoverable` | 鼠标 hover 时，是否悬浮 | `booelan` | `false` | `false` | - |
| `loading` | 当卡片内容还在加载中时，可以用 loading 展示一个占位 | `booelan` | `false` | `false` | - |
| `size` | 设置按钮大小 | `default\|small` | `default` | - | - |

