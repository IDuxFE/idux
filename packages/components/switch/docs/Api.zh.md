## API

### IxSwitch

#### SwitchProps

| 名称 | 说明 | 类型  | 默认值 | 全局配置 | 备注 |
| --- | --- | --- | --- | --- | --- |
| `control` | 控件控制器 | `string \| number \| AbstractControl` | - | - | 配合 `@idux/cdk/forms` 使用, 参考 [Form](/components/form/zh) |
| `v-model:checked` | 是否开启 | `boolean` | `false` | - | 使用 `control` 时，此配置无效 |
| `autofocus` | 自动获取焦点 | `boolean` | `false` | - | - |
| `disabled` | 是否禁止操作 | `boolean` | `false`| - | 使用 `control` 时，此配置无效 |
| `labels` | 开关的文案 | `string[] \| #label={checked}` | - | - | 当传入一个数组时，第 1 个元素为开启的文案，第 2 个元素为未开启时的文案 |
| `loading` | 是否处于加载中 | `boolean` | `false` | - | 加载时不允许改变当前状态 |
| `size` | 切换器的大小 | `'sm' \| 'md' \| 'lg'` | `'md'` | ✅ | - |
| `onChange` | 开关状态发生改变后的回调 | `(checked: boolean) => void`| - | - | - |
| `onFocus` | 获取焦点后触发的回调 | `(evt: FocusEvent) => void`| - | - | - |
| `onBlur` | 失去焦点后触发的回调 | `(evt: FocusEvent) => void`| - | - | - |

#### SwitchMethods

| 名称 | 说明 | 参数类型 | 备注 |
| --- | --- | --- | --- |
| `blur()` | 失去焦点 | - | - |
| `focus()` | 获得焦点 | - | - |
