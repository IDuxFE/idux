
### IxTooltip

#### TooltipProps

| 名称 | 说明 | 类型  | 默认值 | 全局配置 | 备注 |
| --- | --- | --- | --- | --- | --- |
| `v-model:visible` | 是否显隐 | `boolean` | - | - | - |
| `autoAdjust` | 浮层被遮挡时自动调整位置 | `boolean` | `true` | ✅ | - |
| `closeOnDeactivated` | 是否在 [onDeactivated](https://cn.vuejs.org/api/composition-api-lifecycle.html#ondeactivated) 时关闭 | `boolean` | `true` | - | - |
| `destroyOnHide` | 隐藏时是否销毁浮层 | `boolean` | `false` | ✅ | - |
| `delay` | 浮层显示隐藏延时 | `number \| [number, number]` | `100` | ✅ | - |
| `disabled` | 禁用浮层 | `boolean` | `false` | - | - |
| `offset` | 浮层相对目标元素的偏移量 | `[number, number]` | `[0, 4]` | ✅ | 第一个元素是水平偏移量，第二个元素是垂直偏移量 |
| `overlayContainer` | 自定义容器节点 | `string \| HTMLElement \| (trigger?: Element) => string \| HTMLElement` | - | ✅ | - |
| `placement` | 浮层的对齐方式 | `OverlayPlacement` | `top` | ✅ | - |
| `title` | 浮层的标题 | `string` | - | - | - |
| `trigger` | 浮层触发方式 | `PopperTrigger` | `hover` | ✅ | - |

#### TooltipSlots

| 名称 | 说明 | 参数类型 | 备注 |
| --- | --- | --- | --- |
| `default` | 触发浮层的节点 | - |必须为一个有效的单根节点 |
| `title` | 自定义标题 - | - |
