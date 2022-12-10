
### IxProLayout

#### ProLayoutProps

| 名称 | 说明 | 类型  | 默认值 | 全局配置 | 备注 |
| --- | --- | --- | --- | --- | --- |
| `v-model:activeKey` | 当前激活的菜单 | `VKey` | `menus`第一个叶子节点 | - | - |
| `v-model:collapsed` | 侧边栏折叠状态 | `boolean` | `false` | --- | --- |
| `fixed` | 顶部栏和侧边栏是否固定 | `boolean \| { sider: boolean, header: boolean }` | `true` | - | - |
| `headerMenu` | 顶部菜单组件的更多配置 | `MenuProps` | - | - | 例如：`getKey` |
| `logo` | 自定义 logo | `ProLayoutLogo` | - | - | 一般用于展示 logo, 默认渲染在顶部的左侧区域，当 `type='sider'` 时，渲染在侧边栏的顶部 |
| `menus` | 菜单数据 | `MenuData[]` | `[]` | - | - |
| `sider` | 侧边栏的更多配置 | `LayoutSiderProps` | - | - | 例如：`collapsed`,`breakpoint`, `pointer` 等配置 |
| `siderMenu` | 侧边栏菜单组件的更多配置 | `MenuProps` | - | - | 例如：`getKey`, `indent` 和 `mode` |
| `theme` | 主题 | `'light' \| 'dark' \| { sider: 'light' \| 'dark', header: 'light' \| 'dark' }` | `{ sider: 'light', header: 'dark' }` | - | - |
| `type` | 布局类型 | `'both' \| 'mixin' \| 'header' \| 'sider'` | `both` | - | 参见示例：[布局类型](#pro-layout-demo-Type) |
| `onMenuClick` | 点击菜单回调 | `(options: MenuClickOptions) => void`| - | -  | - |

```ts
interface ProLayoutLogo {
  image: string | VNode
  title: string
  link?: string
}
```

#### ProLayoutSlots

| 名称 | 说明 | 参数类型 | 备注 |
| --- | --- | --- | --- |
| `default` | 页面内容区域  | - | - |
| `logo` | 自定义 logo  | - | 一般用于展示 logo, 默认渲染在顶部的左侧区域，当 `type='sider'` 时，渲染在侧边栏的顶部  |
| `headerContent` | 顶部中间区域 | `MenuProps` | 默认会渲染一个 `IxMenu` 组件 |
| `headerExtra` | 顶部右侧区域 | -  | 一般用于展示登录状态、系统消息等  |
| `siderHeader` | 侧边栏顶部区域 | -| 一般用于展示模块名称或者折叠触发器  |
| `siderContent` | 侧边栏中间区域 | `MenuProps`  | 默认会渲染一个 `IxMenu` 组件 |
| `siderFooter` | 侧边栏底部区域 | -  | 一般用于显示工具类按钮，例如：折叠触发器 |

> 为了便于自定义导航菜单，除了上面表格中列举出来的插槽外，还支持 `IxMenu` 的全部插槽，参见 [MenuSlots](/components/menu/zh#MenuSlots).  
> 默认会将 `IxProLayout` 的所有插槽传递给内部的 `IxMenu` 组件，参考示例中的 `itemLabel` 插槽。
