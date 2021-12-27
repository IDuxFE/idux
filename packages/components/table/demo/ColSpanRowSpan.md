---
title:
  zh: 行/列合并
  en: Merge row and column
order: 10
---

## zh

表头只支持列合并，通过 `TableColumn` 中的 `titleColSpan` 进行设置。

表格内容支持行/列合并，通过 `TableColumn` 中的 `colSpan` 和 `rowSpan` 进行设置。当返回 `0`时，该单元格不会被渲染。

## en

Table column title only support column merges, set by `titleColSpan` in `TableColumn`.

Table cell support row/column merging, set by `colSpan` and `rowSpan` in `TableColumn`. When `0` is returned, the cell is not rendered.
