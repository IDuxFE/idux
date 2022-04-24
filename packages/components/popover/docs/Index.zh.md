---
category: components
type: 数据展示
title: Popover
subtitle: 气泡卡片
order: 0
---

## API

### IxPopover

#### PopoverProps

| 名称 | 说明 | 类型  | 默认值 | 全局配置 | 备注 |
| --- | --- | --- | --- | --- | --- |
| `content` | 浮层内容 | `string \| #content` | - | - | - |
| `target` | 浮层容器节点 | `string \| HTMLElement` | `ix-popover-container` | ✅ | - |
| `showArrow` | 是否显示箭头 | `boolean` | `true` | ✅ | - |
| `header` | 浮层的头部配置 | `string \| #header \| HeaderProp` | - | - | 具体请查看[Header](/components/header/zh#HeaderProps) |
| `closable` | 是否可关闭 | `boolean` | `false` | - | 仅在header配置不为空时生效 |
| `closeIcon` | 关闭按钮图标 | `string` | `close` | - | - |

更多属性请参考 [Tooltip](/components/tooltip/zh#TooltipProps).

<!--- insert less variable begin  --->
## 主题变量

| 名称 | default | seer | 备注 |
| --- | --- | --- | --- |
| `@popover-zindex` | `@zindex-l4-2` | - | - |
| `@popover-font-size` | `@font-size-md` | `@font-size-sm` | - |
| `@popover-color` | `@text-color` | `@color-graphite-d10` | - |
| `@popover-background-color` | `@background-color-component` | - | - |
| `@popover-border-radius` | `@border-radius-sm` | - | - |
| `@popover-box-shadow` | `@shadow-bottom-md` | `@shadow-bottom-sm` | - |
| `@popover-wrapper-min-width` | `192px` | `240px` | - |
| `@popover-wrapper-padding` | `@spacing-xs @spacing-sm` | - | - |
| `@popover-wrapper-with-header-padding` | `@spacing-sm @spacing-sm @spacing-sm @spacing-md` | - | - |
| `@popover-header-padding` | `0 0 @spacing-xs 0` | - | - |
| `@popover-header-height` | `24px` | - | - |
| `@popover-content-padding` | `@spacing-xs 0` | `0` | - |
| `@popover-content-line-height` | `20px` | - | - |
| `@popover-close-icon-hover-color` | `@color-primary-d10` | - | - |
| `@popover-close-icon-active-color` | `@color-primary-l10` | - | - |
| `@popover-border-color` | - | `@color-graphite-l30` | - |
<!--- insert less variable end  --->