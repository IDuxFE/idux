
### IxCheckbox

#### CheckboxProps

除以下表格之外还支持原生 `<input type="checkbox" />` 元素的所有属性。

| 名称 | 说明 |  类型  | 默认值 | 全局配置 | 备注 |
| --- | --- | --- | --- | --- | --- |
| `control` | 控件控制器 | `string \| number \| (string \| number)[] \| AbstractControl` | - | - | 配合 `@idux/cdk/forms` 使用, 参考 [Form](/components/form/zh) |
| `v-model:checked` | 指定当前勾选框是否选中 |  `boolean \| string \| number`  | - | - | 使用 `control` 时，此配置无效 |
| `autofocus` | 是否以自动聚焦 | `boolean` | `false` | - | - |.
| `buttoned` | 是否以按钮显示 | `boolean` | - | - | - |
| `disabled` | 禁用状态 |`boolean`| - | - | 使用 `control` 时，此配置无效 |
| `indeterminate` | 是否处于不确定状态 | `boolean` | `false`| - | 当值为`true`时，按钮样式处于半选状态，且不受`checked`影响 |
| `label` | 勾选框的文本 | `string \| #default` | - | - | - |
| `trueValue` | 选中时返回的值 |  `boolean \| string \| number`  | `true`| - | - |
| `falseValue` | 不选中时返回的值 | `boolean \| string \| number` | `false`| - | - |
| `value` | 设置勾选框的值，与 `IxCheckboxGroup` 配合使用 | `any`| - | - | 不传时使用 `key` 作为 `value` |
| `size` | 按钮大小 | `'sm' \| 'md' \| 'lg'` | `md` | - | 仅`buttoned`为`true`时生效 |
| `onChange` | 选中状态发生变化后的回调 | `(newChecked: boolean \| string \| number, oldChecked: boolean \| string \| number) => void`| - | - | - |
| `waveless` | 是否关闭按钮点击时波纹动画 | `boolean` | `false` | ✅ | 存在[浏览器兼容性](https://developer.mozilla.org/zh-CN/docs/Web/API/Web_Animations_API/Keyframe_Formats#%E6%B5%8F%E8%A7%88%E5%99%A8%E5%85%BC%E5%AE%B9%E6%80%A7) |

#### CheckboxMethods

| 名称 | 说明 | 参数类型 | 备注 |
| --- | --- | --- | --- |
| `focus` | 获取焦点 | - | - |
| `blur` | 移除焦点 | - | - |

### IxCheckboxGroup

#### CheckboxGroupProps

> 除以下表格之外还支持 `Space` 组件的[所有属性](/components/space/zh?tab=api#SpaceProps)。

| 名称 | 说明 | 类型  | 默认值 | 全局配置 | 备注 |
| --- | --- | --- | --- | --- | --- |
| `control` | 控件控制器 | `string \| number \| (string \| number)[] \| AbstractControl` | - | - | 配合 `@idux/cdk/forms` 使用, 参考 [Form](/components/form/zh) |
| `v-model:value` | 指定当前勾选框是否选中 |  `any[]`  | - | - | 使用 `control` 时，此配置无效 |
| `buttoned` | 设置组内 `IxCheckbox` 的 `buttoned` 属性 | `boolean` | `false` | - | - |
| `dataSource` | 勾选框组数据源 | `CheckboxData[]` | - | - | 优先级高于 `default` 插槽 |
| `disabled` | 设置组内 `IxCheckbox` 的 `disabled` 属性 | `boolean` | `false` | - | 使用 `control` 时，此配置无效 |
| `gap` | 设置勾选框组的 gap 配置 | `number \| string` | - | - | 也就是 `Space` 的 `size`, 默认为 `8`, 为按钮组时默认为 `0` |
| `name` | 设置组内 `IxCheckbox` 的 `name` 属性 | `string` | - | - |- |
| `size` | 设置组内 `IxCheckbox` 的 `size` 属性 | `'sm' \| 'md' \| 'lg'`| - | - | - |
| `onChange` | 选中值发生变化后的回调 | `(newValue: any[], oldValue: any[]) => void`| - | - | - |

```ts
// key 与 value 二者必传其一。
export interface CheckboxData extends CheckboxProps {
  // 不传时使用 value 作为 key
  key?: VKey
}
```
