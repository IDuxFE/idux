## API

### IxInput

#### InputProps

> 除以下表格之外还支持原生 `input` 元素的[所有属性](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/input)

| 名称 | 说明 | 类型  | 默认值 | 全局配置 | 备注 |
| --- | --- | --- | --- | --- | --- |
| `v-model:value` | 控件值 | `string` | - | - | 使用 `control` 时，此配置无效 |
| `control` | 控件控制器 | `string \| number \| AbstractControl` | - | - | 配合 `@idux/cdk/forms` 使用, 参考 [Form](/components/form/zh) |
| `addonAfter` | 设置后置标签 | `string \| #addonAfter` | - | - | - |
| `addonBefore` | 设置前置标签 | `string \| #addonBefore` | - | - | - |
| `borderless` | 是否显示边框 | `boolean` | `false` | ✅ | - |
| `clearable` | 是否显示清除图标 | `boolean` | `false` | ✅ | - |
| `clearIcon` | 设置清除图标 | `string \| #clearIcon` | `'close-circle'` | ✅ | - |
| `disabled` | 是否禁用状态 | `boolean` | `false` | - | 使用 `control` 时，此配置无效 |
| `prefix` | 设置前缀图标 | `string \| #prefix` | - | - | - |
| `readonly` | 是否只读状态 | `boolean` | `false` | - | - |
| `size` | 设置大小 | `'sm' \| 'md' \| 'lg'` | `'md'` | ✅ | - |
| `suffix` | 设置后缀图标 | `string \| #suffix` | - | - | - |
| `trim` | 失去焦点后自动去除前后空格  | `boolean` | `false` | ✅ | - |
| `onChange` | 值发生改变后的回调 | `(value: string, oldValue: string) => void` | - | - | - |
| `onClear` | 清除图标被点击后的回调 | `(evt: MouseEvent) => void` | - | - | - |
