
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
