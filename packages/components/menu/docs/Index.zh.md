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
| `overlayClassName` | 悬浮层的自定义 `class` | `string` | - | - | `inline` 模式时无效 |
| `mode` | 菜单模式，现在支持垂直、水平和内嵌 | `'vertical' \| 'horizontal' \| 'inline'` | `'vertical'` | - | - |
| `multiple` | 是否支持多选 | `boolean` | `false` | - | - |
| `selectable` | 是否允许选中 | `boolean` | - | - | 在 `IxDropdown` 中默认为 `false`, 其他情况默认为 `true` |
| `target` | 自定义菜单容器节点 | `string \| HTMLElement \| () => string \| HTMLElement` | - | ✅ | `inline` 模式时无效 |
| `theme` | 主题颜色 | `'light' \| 'dark'` | `'light'` | ✅ | - |
| `onClick` | 点击菜单后的回调 | `(options: MenuClickOptions) => void>` | - | - |

```ts
export type MenuData = MenuItemProps | MenuItemGroupProps | MenuSubProps | MenuDividerProps

export interface MenuClickOptions {
  event: Event
  key: VKey
  type: 'item' | 'itemGroup' | 'sub'
}
```

#### MenuCommonProps

`MenuData` 的通用属性

| 名称 | 说明 | 类型  | 默认值 | 全局配置 | 备注 |
| --- | --- | --- | --- | --- | --- |
| `type` | 菜单类型 | `'item' \| 'itemGroup' \| 'sub' \| 'divider'` | `'item'` | - | - |
| `key` | 唯一标识 | `VKey` | - | - | 必传 |
| `additional` | 菜单的额外配置 | `object` | - | - | 可以传入 `class`, `style` 等原生 DOM 属性 |

#### MenuItemProps

菜单项的配置，继承自 `MenuCommonProps`

| 名称 | 说明 | 类型  | 默认值 | 全局配置 | 备注 |
| --- | --- | --- | --- | --- | --- |
| `type` | 菜单类型 | `'item'` | `'item'` | - | - |
| `disabled` | 是否禁用 | `boolean` | - | - | - |
| `icon` | 菜单图标| `string  \| VNode` | - | - |
| `label` | 菜单文本 | `string`  | - | - |
| `slots` | 自定义菜单内容 | `MenuItemSlots`  | - | - |

```ts
export interface MenuItemSlots {
  /**
   * 如果类型为 `string`, 会根据该字符串去 `IxMenu` 的插槽中获取
   */
  icon?: string | ((data: MenuItem & { selected: boolean }) => VNodeChild)
  label?: string | ((data: MenuItem & { selected: boolean }) => VNodeChild)
}
```

#### MenuItemGroupProps

菜单组的配置，继承自 `MenuCommonProps`

| 名称 | 说明 | 类型  | 默认值 | 全局配置 | 备注 |
| --- | --- | --- | --- | --- | --- |
| `type` | 菜单类型 | `'itemGroup'` | - | - | 必传 |
| `children` | 子菜单数据 | `MenuData[]` | - | - | - |
| `icon` | 菜单图标| `string \| VNode \| #icon` | - | - |
| `label` | 菜单文本 | `string \| #label`  | - | - |
| `slots` | 自定义菜单内容 | `MenuItemGroupSlots`  | - | - |

```ts
export interface MenuItemGroupSlots {
  icon?: string | ((data: MenuItemGroupProps) => VNodeChild)
  label?: string | ((data: MenuItemGroupProps) => VNodeChild)
}
```

#### MenuSubProps

子菜单的配置，继承自 `MenuCommonProps`

| 名称 | 说明 | 类型  | 默认值 | 全局配置 | 备注 |
| --- | --- | --- | --- | --- | --- |
| `type` | 菜单类型 | `'sub'` | - | - | 必传 |
| `children` | 子菜单数据 | `MenuData[]` | - | - | - |
| `disabled` | 是否禁用 | `boolean` | - | - | - |
| `icon` | 菜单图标| `string \| VNode` | - | - |
| `label` | 菜单文本 | `string`  | - | - |
| `offset` | 浮层偏移量 | `[number, number]` | `[0, 8]` | ✅ | `inline` 模式时无效 |
| `suffix` | 后缀图标 | `string` | `right` | ✅ | - |
| `slots` | 自定义菜单内容 | `MenuSubSlots`  | - | - |

```ts
export interface MenuSubSlots {
  icon?: string | ((data: MenuSubProps & { expanded: boolean; selected: boolean }) => VNodeChild)
  label?: string | ((data: MenuSubProps & { expanded: boolean; selected: boolean }) => VNodeChild)
  suffix?: string | ((data: MenuSubProps & { expanded: boolean; selected: boolean }) => VNodeChild)
}
```

#### MenuDividerProps

| 名称 | 说明 | 类型  | 默认值 | 全局配置 | 备注 |
| --- | --- | --- | --- | --- | --- |
| `key` | 唯一标识 | `VKey` | - | - | 必传 |
| `children` | 子菜单数据 | `MenuData[] \| #default` | - | - | - |
| `icon` | 菜单图标| `string \| VNode \| #icon` | - | - |
| `label` | 菜单文本 | `string \| #label`  | - | - |

### IxMenuItem

在 `template` 中设置 `MenuItemProps`。

### IxMenuSub

在 `template` 中设置 `MenuSubProps`。

### IxMenuItemGroup

在 `template` 中设置 `MenuItemGroupProps`。

### IxMenuDivider

在 `template` 中设置 `MenuDividerProps`。
