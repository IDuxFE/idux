---
category: components
type: 通用
title: Statistic
subtitle: 统计数值
order: 0
---

展示统计数值。

## 何时使用

- 当需要突出某个或某组数字时
- 当需要展示带描述的统计类数据时使用

## API

### `ix-statistic`

#### Props

| 名称 | 说明 | 类型  | 默认值 | 全局配置 | 备注 |
| --- | --- | --- | --- | --- | --- |
| `formatter`        | 自定义数值展示   | v-slot \| `(value, precision) => { value: string, int: string, decimal: string }` | ✅|返回值为一个对象，对象的value值表示格式化后的完整字符串，int为整数部分，decimal为小数部分，若格式化后的字符串不是合法的数字字符串，请将int和decimal设置为空字符串|
| `precision`        | 数值精度         | number                          | -      |✅||
| `prefix`           | 设置数值的前缀   | string \| v-slot                | -      |||
| `suffix`           | 设置数值的后缀   | string \| v-slot                | -      |||
| `title`            | 数值的标题       | string \| v-slot                | -      |||
| `value`            | 数值内容         | string \| number                | -      |||

### Slots

| 名称 | 说明 | 参数类型 | 备注 |
| --- | --- | --- | --- |
| `title` | 自定义标题 | - | - |
| `defalut` | 自定义内容 | - | - |
| `prefix`   | 自定义前缀 | - | - |
| `suffix`   | 自定义后缀 | - | - |
