
### IxPopover

#### PopoverProps

| 名称 | 说明 | 类型  | 默认值 | 全局配置 | 备注 |
| --- | --- | --- | --- | --- | --- |
| `closable` | 是否可关闭 | `boolean` | `false` | - | 仅在 `header` 配置不为空时生效 |
| `closeIcon` | 关闭按钮图标 | `string` | `close` | - | - |
| `content` | 浮层内容 | `string \| #content` | - | - | - |
| `header` | 浮层的头部配置 | `string \| HeaderProps` | - | - | 具体请查看[Header](/components/header/zh#HeaderProps) |

更多属性请参考 [Tooltip](/components/tooltip/zh#TooltipProps).

#### PopconfirmSlots

| 名称 | 说明 | 参数类型 | 备注 |
| --- | --- | --- | --- |
| `default` | 触发浮层的节点 | - |必须为一个有效的单根节点 |
| `content` | 自定义内容 | - | - |
| `header` | 自定义头部 - | - |
