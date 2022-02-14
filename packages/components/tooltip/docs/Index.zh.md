---
category: components
type: 数据展示
title: Tooltip
subtitle: 文字提示
order: 0
---

## API

### IxTooltip

#### TooltipProps

| 名称 | 说明 | 类型  | 默认值 | 全局配置 | 备注 |
| --- | --- | --- | --- | --- | --- |
| `v-model:visible` | 是否显隐 | `boolean` | - | - | - |
| `autoAdjust` | 浮层被遮挡时自动调整位置 | `boolean` | `true` | ✅ | - |
| `destroyOnHide` | 隐藏时是否销毁浮层 | `boolean` | `false` | ✅ | - |
| `delay` | 浮层显示隐藏延时 | `number \| [number, number]` | `100` | ✅ | - |
| `placement` | 浮层的对齐方式 | `OverlayPlacement` | `top` | ✅ | - |
| `target` | 自定义容器节点 | `string \| HTMLElement \| () => string \| HTMLElement` | - | ✅ | - |
| `title` | 浮层的标题 | `string \| #title` | - | - | - |
| `trigger` | 浮层触发方式 | `PopperTrigger` | `hover` | ✅ | - |

#### TooltipSlots

| 名称 | 说明 |
| --- | --- |
| `default` | 触发浮层的 trigger |

<!--- insert less variable begin  --->
## 主题变量

| 名称 | `default` | `dark` | 备注 |
| --- | --- | --- | --- |
| `@tooltip-zindex` | `@zindex-l4-5` | - | - |
| `@tooltip-font-size` | `@font-size-md` | - | - |
| `@tooltip-color` | `@color-white` | - | - |
| `@tooltip-background-color` | `@color-grey-d30` | - | - |
| `@tooltip-border-radius` | `@border-radius-sm` | - | - |
| `@tooltip-box-shadow` | `@shadow-bottom-md` | - | - |
| `@tooltip-wrapper-max-width` | `400px` | - | - |
| `@tooltip-wrapper-min-width` | `24px` | - | - |
| `@tooltip-wrapper-min-height` | `@height-md` | - | - |
| `@tooltip-wrapper-padding` | `@spacing-xs @spacing-sm` | - | - |
<!--- insert less variable end  --->