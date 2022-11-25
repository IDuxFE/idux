
### IxLayout

布局容器, 其内可放置 `IxLayoutContent`, `IxLayoutFooter`, `IxLayoutHeader` 和 `IxLayoutSider` 等组件。

#### LayoutProps

| 名称 | 说明 | 类型  | 默认值 | 全局配置 | 备注 |
| --- | --- | --- | --- | --- | --- |
| `fixed` | 顶部栏和侧边栏是否固定 | `boolean \| { sider: boolean, header: boolean }` | `false` | - | -  |
| `floatSider` | 漂浮的侧边栏  | `boolean` | `false` | - |  为 `true` 时，侧边栏展开不挤压 `Content` 的位置 |

### IxLayoutContent

内容部分，自带默认样式及基本功能，其下可嵌套任何元素，只能放在 `IxLayout` 中。

### IxLayoutFooter

内容部分，自带默认样式及基本功能，其下可嵌套任何元素，只能放在 `IxLayout` 中。

### IxLayoutHeader

顶部布局，自带默认样式，其下可嵌套任何元素，只能放在 `IxLayout` 中。

### IxLayoutSider

侧边栏，自带默认样式及基本功能，其下可嵌套任何元素，只能放在 `IxLayout` 中。

#### LayoutSiderProps

| 名称 | 说明 | 类型  | 默认值 | 全局配置 | 备注 |
| --- | --- | --- | --- | --- | --- |
| `v-model:collapsed` | 是否折叠状态 | `boolean` | - | - | -  |
| `breakpoint` | 触发折叠状态的断点 | `'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl'` | - | - |  - |
| `pointer` | 通过 `pointer` 进入和离开触发折叠状态的改变 | `boolean` | `false` | - |  - |
| `pointerDelay` | 触发叠状态的改变的延迟时间 |  `number \| [number, number]` | `[0, 100]` | - | 为数组时，第一个元素是延迟显示的时间，第二个元素是延迟隐藏的时间 |
| `onUpdate:collapsed` | 折叠状态改变后的回调 | `(collapsed: boolean, changeType: 'breakpoint' \| 'pointer' \| 'trigger') => void` | - | - | - |

### IxLayoutSiderTrigger

侧边栏折叠状态触发器，可以控制侧边栏的折叠状态，必须在 `IxLayoutSider` 中使用。

#### LayoutSiderTriggerProps

| 名称 | 说明 | 类型  | 默认值 | 全局配置 | 备注 |
| --- | --- | --- | --- | --- | --- |
| `icon` | 自定义折叠图标 | `string \| VNode \| Array<string \| VNode>` | - | - | 默认为 `[menu-fold, menu-unfold]` |

#### LayoutSiderTriggerSlots

| 名称 | 说明 | 参数类型 | 备注 |
| --- | --- | --- | --- |
| `default` | 自定义内容  | - | - |
| `icon` | 自定义图标  | `{ collapsed: boolean }` | - |
