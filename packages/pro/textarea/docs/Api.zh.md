## API

### IxProTextarea

#### ProTextareaProps

| 名称 | 说明 | 类型  | 默认值 | 全局配置 | 备注 |
| --- | --- | --- | --- | --- | --- |
| `v-model:value` | 控件值 | `string` | - | - | 使用 `control` 时，此配置无效 |
| `control` | 控件控制器 | `string \| number \| AbstractControl` | - | - | 配合 `@idux/cdk/forms` 使用, 参考 [Form](/components/form/zh) |
| `clearable` | 是否显示清除图标 | `boolean` | `false` | ✅ | - |
| `clearIcon` | 设置清除图标 | `string \| #clearIcon` | `'close-circle'` | ✅ | - |
| `computeCount` | 自定义计算字符数的函数 | `(value: string) => string` | - | ✅ | 优先级高于 `maxCount` |
| `errors` | 错误信息 | `TextareaError[]` | - | - | - |
| `disabled` | 是否禁用状态 | `boolean` | `false` | - | 使用 `control` 时，此配置无效 |
| `maxCount` | 数字提示显示的最大值 | `number` | - | ✅ | 仅用于提示，不做校验控制 |
| `readonly` | 是否只读状态 | `boolean` | `false` | - | - |
| `resize` | 缩放方向 | `none \| both \| horizontal \| vertical` | `none` | ✅ | - |
| `showCount` | 是否展示字符数 | `boolean` | `false` | ✅ | - |
| `size` | 设置大小 | `'sm' \| 'md' \| 'lg'` | `'md'` | ✅ | - |
| `trim` | 失去焦点后自动去除前后空格  | `boolean` | `false` | - | - |
| `onChange` | 值发生改变后的回调 | `(value: string, oldValue: string) => void` | - | - | - |
| `onClear` | 清除图标被点击后的回调 | `(evt: MouseEvent) => void` | - | - | - |
| `onKeyDown` | `keydown` 事件回调 | `(evt: KeyboardEvent) => void` | - | - | - |

```ts
export interface TextareaError {
  index: number // 行号
  message?: string // 错误信息
}
```

#### ProTextareaSlots

| 名称 | 说明 | 参数类型 | 备注 |
| --- | --- | --- | --- |
| `clearIcon` | 清除按钮 | - | - |

#### ProTextareaMethods

| 名称 | 说明 | 参数类型 | 备注 |
| --- | --- | --- | --- |
| `blur` | 失去焦点 | - | - |
| `focus` | 获取焦点 | - | - |
