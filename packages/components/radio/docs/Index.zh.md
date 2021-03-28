---
category: components
type: 数据录入
title: Radio
subtitle: 单选框
---



## 何时使用

- 1.用于在多个备选项中选中单个状态。
- 2.和 Select 的区别是，Radio 所有选项默认可见，方便用户在比较中选择，因此选项不宜过多。

## API

### `ix-radio`|`ix-radio-button`

| 属性 | 说明 | 类型 | 默认值 | 全局配置 |
| --- | --- | --- | --- | --- |
| v-model:checked | 是否选中 | `boolean` | `false` | - |
| value | 设置 `value`，与 `ix-radio-group` 配合使用| `any`| - | - |
| disabled | 设定 `disable` 状态 | `boolean` | `false` | - |
| name | 原生的`name`属性 | `any` | - | - |

### `ix-radio-group`

| 属性 | 说明 | 类型 | 默认值 | 全局配置 |
| --- | --- | --- | --- | --- |
| v-model:value | 指定选中的 `ix-radio` 的 value 值 | `any` | - | - |
| size | 大小，只对按钮样式生效 | `string` | `medium` | `medium` |
| mode | 按钮样式的填充模式 | `string` | `border` | `border` |
| disabled | 设定 `disable` 状态 | `boolean` | `false` |
| color | 按钮样式的填充颜色 | `string` | `#00b27a` | `#00b27a` |

### `Radio Event`

| 事件名称 | 说明 | 回调参数 |
| --- | --- | --- |
| change | 绑定值变化时触发的事件 | `isChecked` |

### `Radio Group Event`

| 事件名称 | 说明 | 回调参数 |
| --- | --- | --- |
| change | 绑定值变化时触发的事件 | 选中的 Radio value 值 |
