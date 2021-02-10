---
category: components
type: 通用
title: Timeline
subtitle: 时间轴
cover:
---

垂直展示的时间流信息。

## 何时使用

当有一系列信息需按时间排列时，可正序和倒序。

需要有一条时间轴进行视觉上的串联时。

## API

### ix-timeline

#### Props

| 名称 | 说明 | 类型  | 默认值 | 全局配置 | 备注 |
| --- | --- | --- | --- | --- | --- |
| `pending` | 设置幽灵节点 | `boolean\|string` | `false` | - |- |
| `pendingDot` | 幽灵节点存在时的时间轴点 | `string` | `undefined` | - |- |
| `reverse` | 时间节点是否倒叙 | `boolean` | `false` | - |- |
| `mode` | 时间轴和内容的相对位置 | `left\|alternate \|right` | `right` | - |- |

#### Slots

| 名称 | 说明 | 参数类型 | 备注 |
| --- | --- | --- | --- |
| `pending` | 设置幽灵节点 | - | 优先级比props高 |
| `pendingDot`   | 幽灵节点存在时的时间轴点 | - | 优先级比props高 |

### ix-timeline-item

#### Props

| 名称 | 说明 | 类型  | 默认值 | 全局配置 | 备注 |
| --- | --- | --- | --- | --- | --- |
| `color` | 时间节点颜色 | `string` | `#1890ff` | - |- |
| `dot` | 时间轴点 | `string` | `undefined` | - |- |
| `position` | 时间节点内容的位置 | `left\|right` | `undefined` | - |- |

#### Slots

| 名称 | 说明 | 参数类型 | 备注 |
| --- | --- | --- | --- |
| `dot` | 时间轴点 | - | 优先级比props高 |

