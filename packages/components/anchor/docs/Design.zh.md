## 组件定义

通过锚点可快速找到信息内容在当前页面的位置。

## 使用场景

当页面内容较多（超出两屏），且内容有明确分类时，可帮助用户快速定位。

## 组件构成

| 名称 | 说明  |
| --- | ---  |
| 轴线 | 与右侧文字区域高度一致，并标记当前选中标题。 |
| 文字 | 展示内容层级标题，点击可帮助快速定位内容（层级建议不超过2级，最多支持3级）。 |

### 内容超出样式

标题文字建议不超过6个字，文本超出最大宽度则末尾用“…”，指针hover显示全称。

### 主题变量

| 名称 | `default` | `dark` | 备注 |
| --- | --- | --- | --- |
| `@anchor-background-color` | `@background-color-component` | - | - |
| `@anchor-wrapper-margin-left` | `-@spacing-xs` | - | - |
| `@anchor-wrapper-padding-left` | `@spacing-xs` | - | - |
| `@anchor-color` | `@text-color` | - | - |
| `@anchor-border-width` | `@border-width-md` | - | - |
| `@anchor-border-color` | `@border-color` | - | - |
| `@anchor-ink-ball-width` | `1px` | - | - |
| `@anchor-ink-ball-height` | `16px` | - | - |
| `@anchor-ink-ball-radius` | `2px` | - | - |
| `@anchor-ink-ball-border-width` | `@border-width-sm` | - | - |
| `@anchor-ink-line-border-width` | `@border-width-md` | - | - |
| `@anchor-link-margin` | `@spacing-md 0 @spacing-md @spacing-lg` | - | - |
| `@anchor-link-font-size` | `@font-size-md` | - | - |
| `@anchor-link-line-height` | `1` | - | - |
| `@anchor-link-active-color` | `@color-primary` | - | - |
