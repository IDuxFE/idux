---
category: components
type: 数据录入
title: Checkbox
subtitle: 多选框
cover:
---

## 何时使用

单独使用可以表示两种状态之间的切换
在一组可选项中进行多项选择

## API

### `ix-checkbox`

#### Props

除以下表格之外还支持原生 `<input type="checkbox" />` 元素的所有属性。

| 名称 | 说明 |  类型  | 默认值 | 全局配置 | 备注 |
| --- | --- | --- | --- | --- | --- |
| `v-model:checked` | 指定当前勾选框是否选中 |  `boolean`  | `false` | - | - |
| `disabled` | 禁用状态 |`boolean`| `false` | - | - |
| `readonly` | 只读状态 |`boolean`| `false` | - | - |
| `indeterminate` | 是否处于不确定状态 | `boolean` | `false`| - | 当值为true时，按钮样式处于半选状态，且不受checked影响 |
| `trueValue` | 勾选框选中时返回的值 |  `string \| number`  | `true`| - | - |
| `falseValue` | 勾选框不选中时返回的值 | `string \| number` | `false`| - | - |

#### Slots

|名称 | 说明 | 参数类型 | 备注 |
| --- | --- | --- | --- |
|`default` | 文本区域 | - | - |

#### Emits

| 名称 | 说明 | 参数类型 | 备注 |
| --- | --- | --- | --- |
| `change` | 点击勾选框时触发 | `Function(checkValue:boolean \| string \| number)` | - |

### `ix-checkbox-group`

#### Group Props

| 名称 | 说明 | 类型  | 默认值 | 全局配置 | 备注 |
| --- | --- | --- | --- | --- | --- |
| `v-model:value` | 指定当前勾选框是否选中 |  `boolean`  | `false` | - | - |
| `disabled` | 子`ix-checkbox`禁用状态 | `boolean` | `false` | - |- |
| `readonly` | 子`ix-checkbox`只读状态 | `boolean` | `false` | - |- |
| `name` | 子`ix-checkbox` 的 name 属性 | `string` | - | - |- |

#### Group Slots

|名称 | 说明 | 参数类型 | 备注 |
| --- | --- | --- | --- |
|`default` | `ix-checkbox`区域 | - | - |

#### Group Emits

| 名称 | 说明 | 参数类型 | 备注 |
| --- | --- | --- | --- |
| `change` | `value`变化时的回调函数 | `Function(checkValue:string[])` | - |

#### Methods

| 名称 | 说明 | 参数类型 | 备注 |
| --- | --- | --- | --- |
| `focus` | 获取焦点 | - | - |
| `blur` | 移除焦点 | - | - |

### 主题变量

|@checkbox-inner-zindex| @zindex-l1-1|-|
|@checkbox-line-height| 1|-|
|@checkbox-border-color| @grey-d10|-|
|@checkbox-border-style| @border-width-sm solid @grey-d10|-|
|@checkbox-border-radius| @border-radius-sm|-|
|@checkbox-bg-color| @white|-|
|@checkbox-tick-border-style| @border-width-md solid @white|-|
|@checkbox-tick-width| (@checkbox-width / @font-size-base)*5px | - |
|@checkbox-tick-height| (@checkbox-height / @font-size-base)*8px | - |
|@checkbox-bg-indeterminate-color| @primary|-|
|@checkbox-indeterminate-width| 8px|-|
|@checkbox-indeterminate-height| 8px|-|
|@checkbox-border-checked-color| @primary|-|
|@checkbox-border-hover-color| @primary|-|
|@checkbox-border-focus-color| @blue-d30|-|
|@checkbox-bg-checked-color| @primary|-|
|@checkbox-border-disabled-color| @grey|-|
|@checkbox-tick-disabled-color| @grey|-|
|@checkbox-bg-disabled-color| @white|-|
|@checkbox-bg-indeterminate-disabled-color| @grey|-|
|@checkbox-label-disabled-color| @grey|-|
|@checkbox-font-size| @font-size-lg|-|
|@checkbox-height| 16px|-|
|@checkbox-width| 16px|-|
|@checkbox-group-line-height| @line-height-base|-|
|@checkbox-group-checkbox-margin-right| @margin-sm|-|
|@checkbox-label-padding| 0 @spacing-gutter|-|
|@checkbox-transition-duration| @transition-duration-base|-|
