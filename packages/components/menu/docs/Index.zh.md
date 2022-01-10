---
category: components
type: 导航
title: Menu
subtitle: 导航菜单
order: 0
---

## API

### IxMenu

#### MenuProps

| 名称 | 说明 | 类型  | 默认值 | 全局配置 | 备注 |
| --- | --- | --- | --- | --- | --- |
| `v-model:expandedKeys` | 当前展开的 `IxMenuSub` 的 `key` 数组 | `VKey[]` | - | - | - |
| `v-model:selectedKeys` | 当前选中的 `IxMenuItem` 的 `key` 数组 | `VKey[]` | - | - | - |
| `collapsed` | 菜单收起状态 | `boolean` | `false` | - | - |
| `dataSource` | 菜单数据数组 | `MenuData[]` | - | - | 优先级高于 `default` 插槽 |
| `indent` | `inline` 模式时的菜单缩进宽度 | `string \| number` | `24` | ✅ | 仅支持 `inline` 模式 |
| `overlayClassName` | 悬浮层的自定义 `class` | `string` | - | - | - |
| `mode` | 菜单模式，现在支持垂直、水平和内嵌 | `'vertical' \| 'horizontal' \| 'inline'` | `'vertical'` | - | - |
| `multiple` | 是否支持多选 | `boolean` | `false` | - | - |
| `selectable` | 是否允许选中 | `boolean` | - | - | 在 `IxDropdown` 中默认为 `false`, 其他情况默认为 `true` |
| `target` | 自定义菜单容器节点 | `string \| HTMLElement \| () => string \| HTMLElement` | - | ✅ | `inline` 模式时无效 |
| `theme` | 主题颜色 | `'light' \| 'dark'` | `'light'` | ✅ | - |
| `onClick` | 点击 `IxMenuItem` 或 `IxMenuSub` 后的回调 | `(options: MenuClickOptions) => void>` | - | - |

```ts
export type MenuData = MenuItem | MenuItemGroup | MenuSub | MenuDivider

export interface MenuCommon {
  type?: 'item' | 'itemGroup' | 'sub' | 'divider'
  additional?: {
    class?: any
    style?: any
    [key: string]: unknown
  }
  key: VKey
  slots?: unknown
}

export interface MenuItemSlots {
  icon?: string | ((data: MenuItem & { selected: boolean }) => VNodeChild)
  label?: string | ((data: MenuItem & { selected: boolean }) => VNodeChild)
}
export interface MenuItem extends MenuItemPublicProps, MenuCommon {
  type?: 'item'
  slots?: MenuItemSlots
}

export interface MenuItemGroupSlots {
  icon?: string | ((data: MenuItemGroup) => VNodeChild)
  label?: string | ((data: MenuItemGroup) => VNodeChild)
}
export interface MenuItemGroup extends MenuItemGroupPublicProps, MenuCommon {
  type: 'itemGroup'
  slots?: MenuItemGroupSlots
}

export interface MenuSubSlots {
  icon?: string | ((data: MenuSub & { expanded: boolean; selected: boolean }) => VNodeChild)
  label?: string | ((data: MenuSub & { expanded: boolean; selected: boolean }) => VNodeChild)
  suffix?: string | ((data: MenuSub & { expanded: boolean; selected: boolean }) => VNodeChild)
}
export interface MenuSub extends MenuSubPublicProps, MenuCommon {
  type: 'sub'
  additional?: {
    class?: any
    style?: any
    [key: string]: unknown
  }
  slots?: MenuSubSlots
}

export interface MenuDivider {
  type: 'divider'
  additional?: {
    class?: any
    style?: any
    [key: string]: unknown
  }
  key?: VKey
}
```

### IxMenuItem

#### MenuItemProps

| 名称 | 说明 | 类型  | 默认值 | 全局配置 | 备注 |
| --- | --- | --- | --- | --- | --- |
| `key` | 唯一标识 | `VKey` | - | - | 必传 |
| `disabled` | 是否禁用 | `boolean` | `false` | - | - |
| `icon` | 菜单图标| `string  \| VNode \| #icon` | - | - |
| `label` | 菜单文本 | `string \| #label`  | - | - |

### IxMenuSub

#### MenuSubProps

| 名称 | 说明 | 类型  | 默认值 | 全局配置 | 备注 |
| --- | --- | --- | --- | --- | --- |
| `key` | 唯一标识 | `VKey` | - | - | 必传 |
| `children` | 子菜单数据 | `MenuData[] \| #default` | - | - | - |
| `disabled` | 是否禁用 | `boolean` | `false` | - | - |
| `icon` | 菜单图标| `string \| VNode \| #icon` | - | - | - |
| `label` | 菜单文本 | `string \| #label`  | - | - |
| `suffix` | 后缀图标 | `string \| #suffix` | `right` | ✅ | - |

### IxMenuItemGroup

#### MenuItemGroupProps

| 名称 | 说明 | 类型  | 默认值 | 全局配置 | 备注 |
| --- | --- | --- | --- | --- | --- |
| `key` | 唯一标识 | `VKey` | - | - | 必传 |
| `children` | 子菜单数据 | `MenuData[] \| #default` | - | - | - |
| `icon` | 菜单图标| `string \| VNode \| #icon` | - | - |
| `label` | 菜单文本 | `string \| #label`  | - | - |

### IxMenuDivider

菜单分割线。
