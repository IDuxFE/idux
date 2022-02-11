---
category: components
type: 数据录入
title: Rate
subtitle: 评分
---

## API

### IxRate

| 名称 | 说明 | 类型  | 默认值 | 全局配置 | 备注 |
| --- | --- | --- | --- | --- | --- |
| `v-model:value` | 高亮的数目（分数） | `number` | - | - | 使用 `control` 时，此配置无效 |
| `control` | 控件控制器 | `string \| number \| AbstractControl` | - | - | 配合 `@idux/cdk/forms` 使用, 参考 [Form](/components/form/zh) |
| `allowHalf` | 支持半分（选） | `boolean` | `false` | ✅ | - |
| `clearable` | 二次点击元素后清除选择 | `boolean` | `false` | ✅ |-|
| `count` | 图标数目 | `number` | `5` | ✅ | - |
| `disabled` | 禁用状态 | `boolean` | `false` | - | 使用 `control` 时，此配置无效 |
| `icon` | 自定义图标 | `string \| #icon={disabled, focused, index}` | `'star-filled'` | ✅ | - |
| `size` | 设置大小 | `'sm' \| 'md' \| 'lg'` | `'md'` | ✅ | - |
| `tooltips` | 悬浮提示信息数组 | `string[]` | `[]` | - | - |
| `onChange` | 值发生改变时的回调 | `(value: number) => void` | - | - | - |

<!--- insert less variable begin  --->
## 主题变量

| 名称 | `default` | `dark` | 备注 |
| --- | --- | --- | --- |
| `@rate-placeholder-color` | `@form-placeholder-color` | - | - |
| `@rate-active-color` | `@color-yellow` | - | - |
| `@rate-size-sm` | `14px` | - | - |
| `@rate-size-md` | `20px` | - | - |
| `@rate-size-lg` | `28px` | - | - |
| `@rate-item-margin-right` | `@spacing-sm` | - | - |
| `@rate-item-hover-scale` | `1.1` | - | - |
| `@rate-item-focus-outline` | `1px dashed @rate-active-color` | - | - |
<!--- insert less variable end  --->