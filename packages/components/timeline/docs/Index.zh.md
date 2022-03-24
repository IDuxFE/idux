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
| `pending` | 设置幽灵节点 | `boolean\|string\|#pending` | `false` | - | - |
| `pendingDot` | 幽灵节点存在时的时间轴点 | `string\|#pendingDot` | `undefined` | - |- |
| `reverse` | 时间节点是否倒叙 | `boolean` | `false` | - |- |
| `placement` | 时间节点内容相对于时间轴的位置 | `'start'\| 'end' \| 'alternate'` | `'end'` | - |- |
| `both` | 设置标签和内容是否分开 | `boolean` | `false` | - |- |

### IxTimelineItem

#### TimelineItemProps

| 名称 | 说明 | 类型  | 默认值 | 全局配置 | 备注 |
| --- | --- | --- | --- | --- | --- |
| `color` | 时间节点颜色 | `PresetColor \| StatusColor \| string` | `primary` | - |- |
| `dot` | 时间轴点 | `string\|#dot` | `undefined` | - |- |
| `label` | 设置标签 | `string\|#label` | `undefined` | - |- |
| `placement` | 时间节点内容相对于时间轴的位置 | `'start' \| 'end'` | - | - | 仅当`Timeline`组件的`placement`为 `alternate` 时生效|

``` ts
export const presetColors = [
  'red',
  'orange',
  'brown',
  'yellow',
  'canary',
  'bud',
  'green',
  'turquoise',
  'cyan',
  'glacier',
  'blue',
  'indigo',
  'purple',
  'magenta',
] as const

export const statusColors = ['primary', 'info', 'pending', 'success', 'warning', 'error'] as const

```

<!--- insert less variable begin  --->
## 主题变量

| 名称 | `default` | `dark` | 备注 |
| --- | --- | --- | --- |
| `@timeline-font-size` | `@font-size-sm` | - | - |
| `@timeline-line-height` | `1.25` | - | - |
| `@timeline-item-timeline-width` | `@timeline-dot-size + @timeline-dot-border-width + 8` | - | - |
| `@timeline-item-timeline-top` | `(@timeline-font-size * @timeline-line-height / 2 - @timeline-dot-size / 2)` | - | - |
| `@timeline-dot-size` | `12px` | - | - |
| `@timeline-dot-border-width` | `2px` | - | - |
| `@timeline-dot-border` | `@timeline-dot-border-width solid transparent` | - | - |
| `@timeline-dot-font-size` | `@timeline-dot-size + @timeline-dot-border-width` | - | - |
| `@timeline-custom-dot-gap` | `(@timeline-dot-size / 2)` | - | - |
| `@timeline-content-gap` | `@timeline-item-timeline-width` | - | - |
| `@timeline-content-color` | `@text-color` | - | - |
| `@timeline-content-label-color` | `@color-graphite` | - | - |
| `@timeline-line-gap` | `((@timeline-dot-size - @timeline-dot-border-width) / 2)` | - | - |
| `@timeline-line-width` | `2px` | - | - |
| `@timeline-line-background-color` | `@color-graphite-l30` | - | - |
| `@timeline-pending-item-content-min-height` | `40px` | - | - |
| `@timeline-content-margin-bottom` | `20px` | - | - |
| `@timeline-dotted-line-background` | `linear-gradient(to bottom, @timeline-line-background-color, @timeline-line-background-color 50%, transparent 50%, transparent)` | - | - |
| `@timeline-dotted-line-background-size` | `100% 10px` | - | - |
<!--- insert less variable end  --->