---
title:
  zh: 固定头和列
  en: Fix header and columns
order: 50
---

## zh

适合同时展示有大量数据和数据列。

> 若列头与内容不对齐或出现列重复，请指定固定列的宽度 width。
> 如果指定 width 不生效或出现白色垂直空隙，请尝试建议留一列不设宽度以适应弹性布局，或者检查是否有超长连续字段破坏布局, [参考 antd issue](https://github.com/ant-design/ant-design/issues/13825#issuecomment-449889241)。
>
> 建议指定 scroll.width 为大于表格宽度的固定值或百分比。注意，且非固定列宽度之和不要超过 scroll.width。

## en

A Solution for displaying large amounts of data with long columns.

> Specify the width of columns if header and cell do not align properly.
> If specified width is not working or have gutter between columns, please try to leave one column at least without width to fit fluid layout, or make sure no long word to break table layout, [see antd issue](https://github.com/ant-design/ant-design/issues/13825#issuecomment-449889241).
>
> A fixed value which is greater than table width for `scroll.width` is recommended. The sum of unfixed columns should not greater than `scroll.width`.
