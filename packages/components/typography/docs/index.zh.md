---
category: components
type: 通用
title: Typography
subtitle: 排版
cover: 
---

文本的基本格式。

## 何时使用

- 当需要展示标题、段落、列表内容时使用，如文章/博客/日志的文本样式。
- 当需要一列基于文本的基础操作时，如拷贝/省略/可编辑。

## API

### `ix-typography`

```typescript
type TypographyType = 'success' | 'warning' | 'error' | 'secondary'

interface TypographyOptions {
  type?: TypographyType
  disabled?: boolean
}

type TypographyConfig = TypographyType | TypographyOptions
```

## 主题变量

| 变量名                                | default 主题                                      | 说明 |
| ------------------------------------- | ------------------------------------------------- | ---- |
| `@typography-default-color`           | `@black`                                          | -    |
| `@typography-secondary-color`         | `@text-secondary-color`                                      | -    |
| `@typography-success-color`           | `@success-color`                                  | -    |
| `@typography-warning-color`           | `@warning-color`                                  | -    |
| `@typography-error-color`             | `@error-color`                                    | -    |
| `@typography-disabled-color`          | `@disabled-color`                                      | -    |
| `@typography-mark-padding`            | 0                                                 | -    |
| `@typography-mark-background-color`   | `@yellow-l50`                                     | -    |
| `@typography-code-margin`             | `0 0.2em`                                         | -    |
| `@typography-code-font-size`          | 85%                                               | -    |
| `@typography-code-background`         | `@grey`                                           | -    |
| `@typography-code-border`             | `@border-width-sm solid @grey-d30`                 | -    |
| `@typography-code-border-radius`      | `@border-radius-md`                               | -    |
| `@typography-kbd-margin`              | `0 0.2em`                                         | -    |
| `@typography-kbd-padding`             | `0.15em 0.4em 0.1em`                              | -    |
| `@typography-kbd-font-size`           | 90%                                               | -    |
| `@typography-kbd-background`          | `@grey`                                           | -    |
| `@typography-kbd-border-style`        | `solid`                                           | -    |
| `@typography-kbd-border-color`        | `@grey-d30`                                       | -    |
| `@typography-kbd-border-width`        | `@border-width-sm @border-width-sm @border-width-md` | -    |
| `@typography-kbd-border-radius`       | `@border-radius-ms`                               | -    |
| `@typography-strong-font-weight`      | `@font-weight-lg`                                 | -    |
| `@typography-a-color`                 | `@primary-color`                                  | -    |
| `@typography-a-outline`               | `none`                                            | -    |
| `@typography-a-cursor`                | `pointer`                                         | -    |
| `@typography-a-transition`            | `color 0.3s`                                      | -    |
| `@typography-a-color-hover-focus`     | `@blue-l30`                                       | -    |
| `@typography-a-color-active`          | `@blue-d30`                                       | -    |
| `@typography-title-margin-top`        | `1.2em`                                           | -    |
| `@typography-title-1-margin-bottom`   | `0.5em`                                           | -    |
| `@typography-title-1-color`           | `@grey-l10`                                      | -    |
| `@typography-title-1-font-weight`     | `@font-weight-lg`                                 | -    |
| `@typography-title-1-font-size`       | `@font-size-base + 24`                            | -    |
| `@typography-title-1-line-height`     | 1.23                                              | -    |
| `@typography-title-2-margin-bottom`   | `0.5em`                                           | -    |
| `@typography-title-2-color`           | `@grey-l10`                                      | -    |
| `@typography-title-2-font-weight`     | `@font-weight-lg`                                 | -    |
| `@typography-title-2-font-size`       | `@font-size-2xl + 4`                              | -    |
| `@typography-title-2-line-height`     | 1.35                                              | -    |
| `@typography-title-3-margin-bottom`   | `0.5em`                                           | -    |
| `@typography-title-3-color`           | `@grey-l10`                                      | -    |
| `@typography-title-3-font-weight`     | `@font-weight-lg`                                 | -    |
| `@typography-title-3-font-size`       | `@font-size-xl + 2`                               | -    |
| `@typography-title-3-line-height`     | 1.35                                              | -    |
| `@typography-title-4-margin-bottom`   | `0.5em`                                           | -    |
| `@typography-title-4-color`           | `@grey-l10`                                      | -    |
| `@typography-title-4-font-weight`     | `@font-weight-lg`                                 | -    |
| `@typography-title-4-font-size`       | `@font-size-lg + 2`                               | -    |
| `@typography-title-4-line-height`     | 1.4                                               | -    |
| `@typography-title-5-margin-bottom`   | `0.5em`                                           | -    |
| `@typography-title-5-color`           | `@grey-l10`                                      | -    |
| `@typography-title-5-font-weight`     | `@font-weight-lg`                                 | -    |
| `@typography-title-5-font-size`       | `@font-size-md`                                   | -    |
| `@typography-title-5-line-height`     | 1.5                                               | -    |
| `@typography-paragraph-margin-bottom` | `1em`                                             | -    |
| `@typography-list-margin`             | `0 0 1em 0`                                       | -    |
| `@typography-list-padding`            | 0                                                 | -    |
| `@typography-list-item-margin`        | `0 0 0 20px`                                      | -    |
| `@typography-list-item-padding`       | `0 0 0 4px`                                       | -    |
| `@typography-ul-list-style`           | `circle`                                          | -    |
| `@typography-sub-ul-list-style`       | `disc`                                            | -    |
| `@typography-ol-list-style`           | `decimal`                                         | -    |
