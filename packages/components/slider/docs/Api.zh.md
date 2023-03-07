
### IxSlider

#### SliderProps

| 名称 | 说明 | 类型  | 默认值 | 全局配置 | 备注 |
| --- | --- | --- | --- | --- | --- |
| `v-model:value` | 绑定值 | `number \| [number, number]` | `0 \| [0, 0]` | - | 使用 `control` 时，此配置无效 |
| `control` | 控件控制器 | `string \| number \| (string \| number)[] \| AbstractControl` | - | - | 配合 `@idux/cdk/forms` 使用, 参考 [Form](/components/form/zh) |
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
| `onChange` | 值改变后的回调 | `(newValue: number | number[], oldVal: number | number[]) => void` | - | - | - |
| `onFocus` | 获取焦点时触发的回调 | `(evt: FocusEvent) => void` | - | - | - |
| `onBlur` | 失去焦点时触发的回调 | `(evt: FocusEvent) => void` | - | - | - |
