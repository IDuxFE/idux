---
category: components
type: 数据录入
title: Slider
subtitle: 滑动输入条
order: 0
---

## API

### IxSlider

#### SliderProps

| 名称 | 说明 | 类型  | 默认值 | 全局配置 | 备注 |
| --- | --- | --- | --- | --- | --- |
| `v-model:value` | 绑定值 | `number \| [number, number]` | `0 \| [0, 0]` | - | 使用 `control` 时，此配置无效 |
| `control` | 控件控制器 | `string \| number \| AbstractControl` | - | - | 配合 `@idux/cdk/forms` 使用, 参考 [Form](/components/form/zh) |
| `disabled` | 设置禁用状态 | `boolean` | `false` | - | 使用 `control` 时，此配置无效 |
| `dots` | 显示间断点 | `boolean` | `false` | - | `marks` 间断点会始终显示 |
|`marks`|刻度标记，`key` 的类型必须为 `number` 且取值在闭区间 `[min, max]` 内，每个标签可以单独设置样式|`object`|-|-|`{ number: string \| VNode } or { number: { style: object, label: string \| VNode } } or { number: () => VNode }` |
| `keyboard` | 启用键盘行为 | `boolean` | `true` | - | - |
| `max` | 最大值 | `number` | `100` | - | - |
| `min` | 最小值 | `number` | `0` | - | - |
| `range` | 设置范围选择模式 | `boolean` | `false` | - | 双滑块模式 |
| `reverse` | 设置反向坐标轴 | `boolean` | `false` | - | - |
| `step` | 步长 | `number` | `1` | - | 要大于0 |
| `tooltipFormatter` | 格式化 `tooltip` 内容 | `(value: number) => VNode \| string \| number` | - | - | - |
| `tooltipPlacement` | 设置 `tooltip` 显示位置 | `string` | `auto` | - | 参考 [Tooltip](/components/tooltip/) |
| `tooltipVisible` | 设置 `tooltip` 显示状态 | `boolean` | - | - | `tooltip` 默认为 `hover` 和拖拽时显示，`tooltipVisible` 设置为 `true` 则始终显示，反之则始终不显示 |
| `vertical` | 设置垂直状态 | `boolean` | `false` | - | - |
| `onInput` | 拖动滑块时触发 | `(value: number) => void` | - | - | - |
| `onChange` | `Slider` 的值改变后触发(`mouseup` 阶段触发) | `(value: number) => void` | - | - | - |
| `onFocus` | 获取焦点时触发的回调 | `(evt: FocusEvent) => void` | - | - | - |
| `onBlur` | 失去焦点时触发的回调 | `(evt: FocusEvent) => void` | - | - | - |

<!--- insert less variable begin  --->
## 主题变量

| 名称 | default | seer | 备注 |
| --- | --- | --- | --- |
| `@slider-marks-label-color` | `rgba(0, 0, 0, 0.451)` | - | - |
| `@slider-rail-background-color` | `@color-graphite-l30` | - | - |
| `@slider-track-background-color` | `@color-primary` | - | - |
| `@slider-thumb-background-color` | `@color-white` | - | - |
| `@slider-dot-background-color` | `@color-white` | - | - |
| `@slider-dot-border` | `2px solid @color-primary` | `2px solid @color-graphite-l30` | - |
| `@slider-thumb-border` | `2px solid @color-primary` | - | - |
| `@slider-rail-hover-background-color` | `@color-graphite-l30` | - | - |
| `@slider-track-hover-background-color` | `@color-primary` | - | - |
| `@slider-thumb-hover-border-color` | `@color-primary` | - | - |
| `@slider-thumb-focus-border-color` | `@color-primary` | - | - |
| `@slider-thumb-focus-box-shadow` | `0 0 0 5px fade(#46a6ff, 12%)` | - | - |
| `@slider-dot-active-border-color` | `@color-primary` | - | - |
| `@slider-marks-label-active-color` | `rgba(0, 0, 0, 0.851)` | - | - |
| `@slider-track-disabled-background-color` | `rgba(0, 0, 0, 0.251)` | `@color-graphite` | - |
| `@slider-thumb-disabled-background-color` | `@color-white` | - | - |
| `@slider-thumb-disabled-border-color` | `rgba(0, 0, 0, 0.251)` | `@color-graphite` | - |
| `@slider-dot-disabled-active-border-color` | `rgba(0, 0, 0, 0.251)` | `@color-graphite` | - |
| `@slider-thumb-width` | `10px` | - | - |
| `@slider-thumb-height` | `10px` | - | - |
| `@slider-thumb-margin-top` | `-3px` | - | - |
| `@slider-thumb-vertical-margin-left` | `-4px` | - | - |
| `@slider-thumb-vertical-margin-top` | `-6px` | - | - |
| `@slider-height` | `2px` | - | - |
| `@slider-width` | `2px` | - | - |
<!--- insert less variable end  --->