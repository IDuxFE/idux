## API

### IxProLayout

#### ProLayoutProps

| 名称 | 说明 | 类型  | 默认值 | 全局配置 | 备注 |
| --- | --- | --- | --- | --- | --- |
| `v-model:activeKey` | 当前激活的菜单 | `VKey` | `menus`第一个叶子节点 | - | - |
| `v-model:collapsed` | 左侧菜单折叠收起 | `boolean` | `false` | - | 仅对于侧边菜单生效 |
| `fixed` | 固定 | `boolean \| {sider: boolean, header: boolean}` | `false` | - | - |
| `headerMenu` | 顶部菜单组件的更多配置 | `MenuProps` | - | - | 例如：`getKey` |
| `menus` | 菜单数据 | `MenuData[]` | `[]` | - | - |
| `compress` | 展开侧边栏是否压缩右侧内容区域 | `boolean` | `true` | - | 设置为 `false`时必须设置 `IxProLayout` 高度 |
| `sider` | 侧边栏的更多配置 | `LayoutSiderProps` | - | - | 例如：可以配置响应式断点：`breakpoint` |
| `siderHover` | 鼠标悬浮侧边栏时展开 | `boolean \| SiderHover` | `-` | - | `delay`单位为 `ms` |
| `siderMenu` | 侧边栏菜单组件的更多配置 | `MenuProps` | - | - | 例如：`getKey`, `indent` 和 `mode` |
| `theme` | 主题 | `light \| dark \| {sider: light \| dark, header: light \| dark}` | `light` | - | - |
| `type` | 布局类型 | `'header' \| 'sider' \| 'both' \| 'mixin'` | `mixin` | - | 参见示例：[布局类型](#pro-layout-demo-Type) |
| `onMenuClick` | 点击菜单回调 | `(options: MenuClickOptions) => void`| - | -  | - |

#### ProLayoutSlots

| 名称 | 说明 | 参数类型 | 备注 |
| --- | --- | --- | --- |
| `default` | 页面内容区域  | - | - |
| `logo` | 顶部左侧区域 | - | 一般用于展示 logo 和标题  |
| `headerContent` | 顶部中间区域 | `MenuProps` | 默认会渲染一个 `IxMenu` 组件 |
| `headerExtra` | 顶部右侧区域 | -  | 一般用于展示登录状态、系统消息等  |
| `siderHeader` | 侧边栏顶部区域 | -| 一般用于展示模块名称或者折叠触发器，当 `type=sider` 时，也可以用于展示 logo   |
| `siderContent` | 侧边栏中间区域 | `MenuProps`  | 默认会渲染一个 `IxMenu` 组件 |
| `siderFooter` | 侧边栏底部区域 | -  | 一般用于显示工具类按钮，例如：折叠触发器 |

> 为了便于自定义导航菜单，除了上面表格中列举出来的插槽外，还支持 `IxMenu` 的全部插槽，参见 [MenuSlots](/components/menu/zh#MenuSlots).  
> 默认会将 `IxProLayout` 的所有插槽传递给内部的 `IxMenu` 组件，参考示例中的 `itemLabel` 插槽。

```ts
interface SiderHover {
  delay: number
}
```

### IxProLayoutSiderTrigger

侧边栏折叠状态触发器，可以控制侧边栏的折叠状态，可以放在 `IxProLayout` 中的任意位置。

#### ProLayoutSiderTriggerProps

| 名称 | 说明 | 类型  | 默认值 | 全局配置 | 备注 |
| --- | --- | --- | --- | --- | --- |
| `icon` | 自定义折叠图标 | `Array<string \| VNode> \| #default={collapsed: boolean}` | - | - | 默认为 `[menu-fold, menu-unfold]` |
