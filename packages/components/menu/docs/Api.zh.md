## API

### IxMenu

#### MenuProps

| 名称 | 说明 | 类型  | 默认值 | 全局配置 | 备注 |
| --- | --- | --- | --- | --- | --- |
| `v-model:expandedKeys` | 当前展开的 `IxMenuSub` 的 `key` 数组 | `VKey[]` | - | - | - |
| `v-model:selectedKeys` | 当前选中的 `IxMenuItem` 的 `key` 数组 | `VKey[]` | - | - | - |
| `collapsed` | 菜单收起状态 | `boolean` | `false` | - | - |
| `customAdditional` | 自定义下拉选项的额外属性 | `MenuCustomAdditional` | - | - | 例如 `class`, 或者原生事件 |
| `dataSource` | 菜单数据数组 | `MenuData[]` | - | - | 优先级高于 `default` 插槽 |
| `getKey` | 获取数据的唯一标识 | `string \| (data: MenuData) => VKey` | `key` | ✅ | - |
| `indent` | `inline` 模式时的菜单缩进宽度 | `string \| number` | `24` | ✅ | 仅支持 `inline` 模式 |
| `mode` | 菜单模式，现在支持垂直、水平和内嵌 | `'vertical' \| 'horizontal' \| 'inline'` | `'vertical'` | - | - |
| `multiple` | 是否支持多选 | `boolean` | `false` | - | - |
| `overlayClassName` | 悬浮层的自定义 `class` | `string` | - | - | `inline` 模式时无效 |
| `overlayContainer` | 自定义菜单容器节点 | `string \| HTMLElement \| () => string \| HTMLElement` | - | ✅ | `inline` 模式时无效 |
| `selectable` | 是否允许选中 | `boolean` | `true` | - | - |
| `theme` | 主题颜色 | `'light' \| 'dark'` | `'light'` | ✅ | - |
| `onClick` | 点击菜单后的回调 | `(options: MenuClickOptions) => void` | - | - |

```ts
export type MenuData = MenuItemProps | MenuItemGroupProps | MenuSubProps | MenuDividerProps

export interface MenuClickOptions {
  event: Event
  key: VKey
  type: 'item' | 'itemGroup' | 'sub'
}

export type MenuCustomAdditional = (options: { data: MenuData; index: number }) => Record<string, any> | undefined
```

#### MenuItemProps

| 名称 | 说明 | 类型  | 默认值 | 全局配置 | 备注 |
| --- | --- | --- | --- | --- | --- |
| `key` | 唯一标识 | `VKey` | - | - | 必传, 可以通过 `getKey` 指定其他字段 |
| `type` | 菜单类型 | `'item'` | `'item'` | - | - |
| `disabled` | 是否禁用 | `boolean` | - | - | - |
| `icon` | 菜单图标| `string  \| VNode` | - | - |
| `label` | 菜单文本 | `string`  | - | - |
| `customIcon` | 自定义图标 | `string \| ((data: MenuItemProps & { selected: boolean }) => VNodeChild)` | `'itemIcon'` | - | 类型为 `string` 时，对应插槽名 |
| `customLabel` | 自定义文本 | `string \| ((data: MenuItemProps & { selected: boolean }) => VNodeChild)` | `'itemLabel'` | - | 类型为 `string` 时，对应插槽名 |

#### MenuItemGroupProps

| 名称 | 说明 | 类型  | 默认值 | 全局配置 | 备注 |
| --- | --- | --- | --- | --- | --- |
| `key` | 唯一标识 | `VKey` | - | - | 必传, 可以通过 `getKey` 指定其他字段 |
| `type` | 菜单类型 | `'itemGroup'` | - | - | 必传 |
| `children` | 子菜单数据 | `MenuData[]` | - | - | - |
| `icon` | 菜单图标| `string \| VNode` | - | - |
| `label` | 菜单文本 | `string`  | - | - |
| `customIcon` | 自定义图标 | `string \| ((data: MenuItemGroupProps) => VNodeChild)` | `'itemGroupIcon'` | - | 类型为 `string` 时，对应插槽名 |
| `customLabel` | 自定义文本 | `string \| ((data: MenuItemGroupProps) => VNodeChild)` | `'itemGroupLabel'` | - | 类型为 `string` 时，对应插槽名 |

#### MenuSubProps

| 名称 | 说明 | 类型  | 默认值 | 全局配置 | 备注 |
| --- | --- | --- | --- | --- | --- |
| `key` | 唯一标识 | `VKey` | - | - | 必传, 可以通过 `getKey` 指定其他字段 |
| `type` | 菜单类型 | `'sub'` | - | - | 必传 |
| `children` | 子菜单数据 | `MenuData[]` | - | - | - |
| `disabled` | 是否禁用 | `boolean` | - | - | - |
| `icon` | 菜单图标| `string \| VNode` | - | - |
| `label` | 菜单文本 | `string`  | - | - |
| `offset` | 浮层偏移量 | `[number, number]` | `[0, 4]` | ✅ | `inline` 模式时无效 |
| `suffix` | 后缀图标 | `string` | `right` | ✅ | - |
| `customIcon` | 自定义图标 | `string \| ((data: MenuSubProps & { expanded: boolean; selected: boolean }) => VNodeChild)` | `'subIcon'` | - | 类型为 `string` 时，对应插槽名 |
| `customLabel` | 自定义文本 | `string \| ((data: MenuSubProps & { expanded: boolean; selected: boolean }) => VNodeChild)` | `'subLabel'` | - | 类型为 `string` 时，对应插槽名 |
| `customSuffix` | 自定义后缀图标 | `string \| ((data: MenuSubProps & { expanded: boolean; selected: boolean }) => VNodeChild)` | `'subSuffix'` | - | 类型为 `string` 时，对应插槽名 |

#### MenuDividerProps

| 名称 | 说明 | 类型  | 默认值 | 全局配置 | 备注 |
| --- | --- | --- | --- | --- | --- |
| `key` | 唯一标识 | `VKey` | - | - | 必传, 可以通过 `getKey` 指定其他字段 |
| `type` | 菜单类型 | `'divider'` | - | - | 必传 |

### IxMenuItem

在 `template` 中设置 `MenuItemProps`。

### IxMenuSub

在 `template` 中设置 `MenuSubProps`。

### IxMenuItemGroup

在 `template` 中设置 `MenuItemGroupProps`。

### IxMenuDivider

在 `template` 中设置 `MenuDividerProps`。
