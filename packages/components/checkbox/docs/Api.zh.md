## API

### IxCheckbox

#### CheckboxProps

除以下表格之外还支持原生 `<input type="checkbox" />` 元素的所有属性。

| 名称 | 说明 |  类型  | 默认值 | 全局配置 | 备注 |
| --- | --- | --- | --- | --- | --- |
| `control` | 控件控制器 | `string \| number \| AbstractControl` | - | - | 配合 `@idux/cdk/forms` 使用, 参考 [Form](/components/form/zh) |
| `v-model:checked` | 指定当前勾选框是否选中 |  `boolean \| string \| number`  | - | - | 使用 `control` 时，此配置无效 |
| `autofocus` | 是否以自动聚焦 | `boolean` | `false` | - | - |.
| `buttoned` | 是否以按钮显示 | `boolean` | - | - | - |
| `disabled` | 禁用状态 |`boolean`| - | - | 使用 `control` 时，此配置无效 |
| `indeterminate` | 是否处于不确定状态 | `boolean` | `false`| - | 当值为`true`时，按钮样式处于半选状态，且不受`checked`影响 |
| `label` | 勾选框的文本 | `string \| #default` | - | - | - |
| `trueValue` | 选中时返回的值 |  `boolean \| string \| number`  | `true`| - | - |
| `falseValue` | 不选中时返回的值 | `boolean \| string \| number` | `false`| - | - |
| `value` | 设置勾选框的值，与 `IxCheckboxGroup` 配合使用 | `any`| - | - | 不传时使用 `key` 作为 `value` |
| `size` | 按钮大小 | `'sm' \| 'md' \| 'lg'` | - | `'md'` | 仅`buttoned`为`true`时生效 |
| `onChange` | 选中状态发生变化后的回调 | `(newChecked: boolean \| string \| number, oldChecked: boolean \| string \| number) => void`| - | - | - |

#### CheckboxMethods

| 名称 | 说明 | 参数类型 | 备注 |
| --- | --- | --- | --- |
| `focus` | 获取焦点 | - | - |
| `blur` | 移除焦点 | - | - |

### IxCheckboxGroup

#### CheckboxGroupProps

| 名称 | 说明 | 类型  | 默认值 | 全局配置 | 备注 |
| --- | --- | --- | --- | --- | --- |
| `control` | 控件控制器 | `string \| number \| AbstractControl` | - | - | 配合 `@idux/cdk/forms` 使用, 参考 [Form](/components/form/zh) |
| `v-model:value` | 指定当前勾选框是否选中 |  `any[]`  | - | - | 使用 `control` 时，此配置无效 |
| `buttoned` | 设置组内 `IxCheckbox` 的 `buttoned` 属性 | `boolean` | `false` | - | - |
| `dataSource` | 勾选框组数据源 | `CheckboxData[]` | - | - | 优先级高于 `default` 插槽 |
| `disabled` | 设置组内 `IxCheckbox` 的 `disabled` 属性 | `boolean` | `false` | - | 使用 `control` 时，此配置无效 |
| `gap` | 设置组内 `IxCheckbox` 的间隔 | `number \| string` | - | - | - |
| `name` | 设置组内 `IxCheckbox` 的 `name` 属性 | `string` | - | - |- |
| `size` | 设置组内 `IxCheckbox` 的 `size` 属性 | `'sm' \| 'md' \| 'lg'`| `'md'` | - | - |
| `vertical` | 设置组内排列方向 | `boolean` | - | - | 默认为水平排列方向，可设`true`为垂直排列 |
| `onChange` | 选中值发生变化后的回调 | `(newValue: any[], oldValue: any[]) => void`| - | - | - |

```ts
// key 与 value 二者必传其一。
export interface CheckboxData extends CheckboxProps {
  // 不传时使用 value 作为 key
  key?: VKey
}
```
