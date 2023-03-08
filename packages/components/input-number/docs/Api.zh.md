
### IxInputNumber

#### InputNumberProps

> 除以下表格之外还支持原生 `input` 元素的[所有属性](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/input)

| 名称 | 说明 | 类型  | 默认值 | 全局配置 | 备注 |
| --- | --- | --- | --- | --- | --- |
| `v-model:value` | 控件值 | `number` | - | - | 使用 `control` 时，此配置无效 |
| `control` | 控件控制器 | `string \| number \| (string \| number)[] \| AbstractControl` | - | - | 配合 `@idux/cdk/forms` 使用, 参考 [Form](/components/form/zh) |
| `addonAfter` | 设置后缀 | `string \| #addonAfter` | - | - | - |
| `addonBefore` | 设置前缀 | `string \| #addonBefore` | - | - | - |
| `disabled` | 禁用 | `boolean` | `false` | - | 使用 `control` 时，此配置无效 |
| `keyboard` | 启用键盘行为 | `boolean` | `true` | ✅ | - |
| `max` | 最大值 | `number` | `Infinity` | - | - |
| `min` | 最小值 | `number` | `-Infinity` | - | - |
| `placeholder` | 提示信息 | `string` | - | - | - |
| `precision` | 数值精度 | `number` | - | - | - |
| `readonly` | 只读 | `boolean` | `false` | - | - |
| `size` | 设置大小 | `'sm' \| 'md' \| 'lg'` | `'md'` | ✅ | - |
| `status` | 手动指定校验状态 | `valid \| invalid \| validating` | - | - | - |
| `step` | 步进 | `number` | `1` | - | - |
| `onChange` | 值发生改变时触发的回调 | `(value: number \| null, oldValue: number \| null \| undefined) => void` | - | - | - |
| `onFocus` | 获取焦点时触发的回调 | `(evt: FocusEvent) => void` | - | - | - |
| `onBlur` | 失去焦点时触发的回调 | `(evt: FocusEvent) => void` | - | - | - |
