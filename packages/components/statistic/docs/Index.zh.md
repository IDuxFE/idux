---
category: components
type: 数据展示
title: Statistic
subtitle: 统计数值
order: 0
---

## API

### IxStatistic

#### StatisticProps

| 名称 | 说明 | 类型  | 默认值 | 全局配置 | 备注 |
| --- | --- | --- | --- | --- | --- |
| `formatter`        | 自定义数值展示   | v-slot \| `(value, precision) => { value: string, int: string, decimal: string }` | ✅|返回值为一个对象，对象的value值表示格式化后的完整字符串，int为整数部分，decimal为小数部分，若格式化后的字符串不是合法的数字字符串，请将int和decimal设置为空字符串|
| `precision`        | 数值精度         | number                          | -      |✅||
| `prefix`           | 设置数值的前缀   | string \| v-slot                | -      |||
| `suffix`           | 设置数值的后缀   | string \| v-slot                | -      |||
| `title`            | 数值的标题       | string \| v-slot                | -      |||
| `value`            | 数值内容         | string \| number                | -      |||

### StatisticSlots

| 名称 | 说明 | 参数类型 | 备注 |
| --- | --- | --- | --- |
| `title` | 自定义标题 | - | - |
| `defalut` | 自定义内容 | - | - |
| `prefix`   | 自定义前缀 | - | - |
| `suffix`   | 自定义后缀 | - | - |

<!--- insert less variable begin  --->
## 主题变量

| 名称 | `default` | `dark` | 备注 |
| --- | --- | --- | --- |
| `@statistic-font-size-sm` | `@font-size-md` | - | - |
| `@statistic-font-size-md` | `@font-size-md` | - | - |
| `@statistic-font-size-lg` | `@font-size-xl` | - | - |
| `@statistic-font-size-xl` | `@font-size-2xl` | - | - |
| `@statistic-line-height` | `@line-height-base` | - | - |
| `@statistic-color` | `@color-black` | - | - |
| `@statistic-title-margin` | `@space-margin-lg` | - | - |
| `@statistic-prefix-margin` | `@spacing-xs` | - | - |
| `@statistic-suffix-margin` | `@spacing-xs` | - | - |
<!--- insert less variable end  --->