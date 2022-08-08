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
