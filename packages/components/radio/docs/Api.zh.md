
### IxRadio

#### RadioProps

| 名称 | 说明 | 类型  | 默认值 | 全局配置 | 备注 |
| --- | --- | --- | --- | --- | --- |
| `control` | 控件控制器 | `string \| number \| AbstractControl` | - | - | 配合 `@idux/cdk/forms` 使用, 参考 [Form](/components/form/zh) |
| `v-model:checked` | 是否选中 | `boolean` | - | - | 使用 `control` 时，此配置无效 |
| `autofocus` | 是否以自动聚焦 | `boolean` | `false` | - | - |
| `buttoned` | 是否以按钮显示 | `boolean` | `false` | - | - |
| `disabled` | 是否为禁用状态 | `boolean` | `false` | - | 使用 `control` 时，此配置无效 |
| `label` | 单选框的文本 | `string \| #default` | `false` | - | - |
| `mode` | 按钮类型 | `'default' \| 'primary'`| `'default'` | - | 仅 `buttoned` 为 `true` 时生效  |
| `size` | 按钮大小 | `'sm' \| 'md' \| 'lg'`| `'md'` | ✅ | 仅 `buttoned` 为 `true` 时生效 |
| `value` | 设置单选框的值，与 `IxRadioGroup` 配合使用 | `any`| - | - | 不传时使用 `key` 作为 `value` |
| `onChange` | 选中状态发生变化后的回调 | `(checked: boolean, oldChecked: boolean) => void`| - | - | - |
| `onBlur` | 失去焦点后触发 | `(evt: FocusEvent) => void`| - | - | - |
| `onFocus` | 获取焦点后触发 | `(evt: FocusEvent) => void`| - | - | - |

#### RadioMethods

| 名称 | 说明 | 参数类型 | 备注 |
| --- | --- | --- | --- |
| `blur` | 移除焦点 | `(options?: FocusOptions) => void` | - |
| `focus` | 获取焦点 | - | - |

### IxRadioGroup

#### RadioGroupProps

 除以下表格之外还支持 `Space` 组件的[所有属性](/components/space/zh?tab=api#SpaceProps)。

| 名称 | 说明 | 类型  | 默认值 | 全局配置 | 备注 |
| --- | --- | --- | --- | --- | --- |
| `control` | 控件控制器 | `string \| number \| AbstractControl` | - | - | 配合 `@idux/cdk/forms` 使用, 参考 [Form](/components/form/zh) |
| `v-model:value` | 当前选中的值 | `any` | - | - | 使用 `control` 时，此配置无效 |
| `buttoned` | 设置单选框组内 `IxRadio` 的 `buttoned` | `boolean` | - | - | - |
| `dataSource` | 以配置形式设置子元素 | `RadioData[]`| - | 优先级高于 `default` 插槽 |  |
| `disabled` | 设置单选框组内 `IxRadio` 的 `disabled` | `boolean` | - | - | 使用 `control` 时，此配置无效 |
| `gap` | 设置单选框组内的 `IxRadio` 的间隔 | `number \| string` | - | - | 也就是 `Space` 的 `size`, 默认为 `8`, 为按钮组时默认为 `0` |
| `name` | 设置单选框组内的 `IxRadio` 的原生 `name` 属性 | `string` | - | - | - |
| `mode` | 设置单选框组内 `IxRadio` 的 `mode` | `'default' \| 'primary'`| - | - | - |
| `size` | 设置单选框组内 `IxRadio` 的 `size` | `'sm' \| 'md' \| 'lg'`| `'md'` | - | - |
| `onChange` | 选中值发生变化后的回调 | `(value: any, oldValue: any) => void`| - | - | - |

```ts
// key 与 value 二者必传其一。
export interface RadioData extends RadioProps {
  // 不传时使用 value 作为 key
  key?: VKey
}
```
