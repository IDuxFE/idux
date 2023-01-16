---
order: 10
title:
  zh: 可调整列宽
  en: Resizable column
---

## zh

可以通过配置 `resizable`，开启拖拽调整列宽，请尽可能的给一个非百分比初始的宽度(`column.width`)，还可以配置 `maxWidth` `minWidth` 来限制列宽的范围。  
如果发现设置 `scroll.width` 后无法出现横向滚动条，拖拽一列后导致其他列变得过窄，请对未设置 `width` 的列设置一个 `minWidth`.

## en

You can enable drag and drop to adjust column width by setting `resizable`, giving a non-percentage initial column width as much as possible . You can also setting `maxWidth` and `minWidth` to limit the range of column width.  
If you find that setting `scroll.width` does not allow horizontal scrollbar to appear, and dragging one column causes the other columns to become too narrow, set a `minWidth` for the column that is not set `width`.
