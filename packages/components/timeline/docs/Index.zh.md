---
category: components
type: 数据展示
title: Timeline
subtitle: 时间轴
order: 0
---

## API

### IxTimeline

#### TimelineProps

| 名称 | 说明 | 类型  | 默认值 | 全局配置 | 备注 |
| --- | --- | --- | --- | --- | --- |
| `pending` | 设置幽灵节点 | `boolean\|string\|#pending` | `false` | - |- |
| `pendingDot` | 幽灵节点存在时的时间轴点 | `string\|#pendingDot` | `undefined` | - |- |
| `reverse` | 时间节点是否倒叙 | `boolean` | `false` | - |- |
| `position` | 时间轴和内容的相对位置 | `left\|alternate\|right` | `right` | - |- |

### IxTimelineItem

#### TimelineItemProps

| 名称 | 说明 | 类型  | 默认值 | 全局配置 | 备注 |
| --- | --- | --- | --- | --- | --- |
| `color` | 时间节点颜色 | `PresetColor \| StatusColor \| string` | `primary` | - |- |
| `dot` | 时间轴点 | `string\|#dot` | `undefined` | - |- |
| `position` | 时间节点内容的位置 | `left\|right` | `undefined` | - |- |

<!--- insert less variable begin  --->
## 主题变量

| 名称 | `default` | `dark` | 备注 |
| --- | --- | --- | --- |
| `@timeline-size` | `@font-size-base` | - | - |
| `@timeline-item-minheight` | `20px` | - | - |
| `@timeline-dot-dia` | `10px` | - | - |
| `@timeline-dot-border` | `@border-width-md solid transparent` | - | - |
| `@timeline-custom-dot-top` | `5px` | - | - |
| `@timeline-custom-dot-padding` | `1px 0` | - | - |
| `@timeline-custom-dot-gap` | `(@timeline-dot-dia / 2)` | - | - |
| `@timeline-content-gap` | `18px` | - | - |
| `@timeline-content-line-height` | `20px` | - | - |
| `@timeline-content-top` | `-5px` | - | - |
| `@timeline-dotted-content-min-height` | `48px` | - | - |
| `@timeline-line-gap` | `((@timeline-dot-dia - @border-width-md) / 2)` | - | - |
| `@timeline-line-border` | `@border-width-md solid #e8e8e8` | - | - |
| `@timeline-reverse-pending-dot-line-top` | `14px` | - | - |
<!--- insert less variable end  --->