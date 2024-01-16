
### IxCascader

#### CascaderProps

| 名称 | 说明 | 类型  | 默认值 | 全局配置 | 备注 |
| --- | --- | --- | --- | --- | --- |
| `control` | 控件控制器 | `string \| number \| (string \| number)[] \| AbstractControl` | - | - | 配合 `@idux/cdk/forms` 使用, 参考 [Form](/components/form/zh) |
| `v-model:value` | 当前选中的的值 | `any \| any[] \| any[][]` | - | - | 使用 `control` 时，此配置无效 |
| `v-model:expandedKeys` | 展开节点的 `key` 数组 | `VKey[]` | - | - | - |
| `v-model:loadedKeys` | 已经加载完毕的节点的 `key` | `VKey[]` | - | - | - |
| `v-model:open` | 下拉菜单是否展开 | `boolean` | - | - | - |
| `autocomplete` | 设置选择器的 `autocomplete` | `string` | `off` | - | - |
| `autofocus` | 默认获取焦点 | `boolean` | `false` | - | - |
| `borderless` | 是否无边框 | `boolean` | `false` | ✅ | - |
| `childrenKey` | 替代[CascaderData](#CascaderData)中的`children`字段 | `string` | `children` | ✅ | - |
| `clearable` | 是否显示清除图标 | `boolean` | `false` | - | - |
| `clearIcon` | 设置清除图标 | `string \| #clearIcon` | `'close-circle'` | ✅ | - |
| `customAdditional` | 自定义下拉选项的额外属性 | `CascaderCustomAdditional` | - | - | 例如 `class`, 或者原生事件 |
| `dataSource` | 树型数据数组,参见[CascaderData](#CascaderData) | `CascaderData[]` | `[]` | - | - |
| `disabled` | 禁用选择器 | `boolean` | - | - | - |
| `disableData` | 动态禁用某些项 | `(data: CascaderData) => boolean` | - | - | - |
| `empty` | 空数据时的内容 | `'default' \| 'simple' \| EmptyProps` | `'simple'` | - | - |
| `expandIcon` | 展开图标 | `string \| #expandIcon="{key: VKey, expanded: boolean, data: CascaderData}"` | `right` | ✅ | - |
| `expandTrigger` | 触发展开的方式 | `'click' \| 'hover'` | `click` | - | - |
| `fullPath` | 选中后的值是否包含全部路径 | `boolean` | `true` | ✅ | 会影响值的类型，参见 [基本使用](#components-cascader-demo-Basic) 和 [多选模式](#components-cascader-demo-Multiple) |
| `getKey` | 获取数据的唯一标识 | `string \| (data: CascaderData) => VKey` | `key` | ✅ | - |
| `labelKey` | 替代[CascaderData](#CascaderData)中的`label`字段 | `string` | `label` | ✅ | -
| `loadChildren` | 加载子节点数据 | `(data: CascaderData) => Promise<CascaderData[]>` | - | - | - |
| `maxLabel` | 最多显示多少个标签 | `number \| 'responsive'` | - | - | 响应式模式会对性能产生损耗 |
| `multiple` | 多选模式 | `boolean` | `false` | - | - |
| `multipleLimit` | 最多选中多少项 | `number` | - | - | - |
| `overlayClassName` | 下拉菜单的 `class`  | `string` | - | - | - |
| `overlayContainer` | 自定义浮层容器节点  | `string \| HTMLElement \| (trigger?: Element) => string \| HTMLElement` | - | ✅ | - |
| `overlayMatchWidth` | 下拉菜单和选择器同宽  | `boolean` | `false` | ✅ | - |
| `overlayRender` | 自定义下拉菜单内容的渲染  | `(children: VNode[]) => VNodeChild` | - | - | - |
| `placeholder` | 选择框默认文本 | `string \| #placeholder` | - | - | - |
| `readonly` | 只读模式 | `boolean` | - | - | - |
| `searchable` | 是否可搜索 | `boolean \| 'overlay'` | `false` | - | 当为 `true` 时搜索功能集成在选择器上，当为 `overlay` 时，搜索功能集成在悬浮层上 |
| `searchFn` | 根据搜索的文本进行筛选 | `boolean \| SelectSearchFn` | `true` | - | 为 `true` 时使用默认的搜索规则, 如果使用远程搜索，应该设置为 `false` |
| `separator` | 设置分割符 | `string` | `/` | - | - |
| `searchPlaceholder` | 下拉菜单搜索框的默认文本 | `string` | - | - | - |
| `size` | 设置选择器大小 | `'sm' \| 'md' \| 'lg'` | `md` | ✅ | - |
| `status` | 手动指定校验状态 | `valid \| invalid \| validating` | - | - | - |
| `strategy` | 设置级联策略 | `'all' \| 'parent' \| 'child' \| 'off'` | `'all'` | - | 具体用法参见 [级联策略](#components-cascader-demo-Strategy) |
| `suffix` | 设置后缀图标 | `string \| #suffix` | `down` | ✅ | - |
| `virtual` | 是否开启虚拟滚动 | `boolean` | `false` | - | 需要设置 `height` |
| `virtualScrollMode` | 虚拟滚动的滚动模式 | `'native' \| 'simulated'` | `'native'` | - | - |
| `onChange` | 选中值发生改变后的回调 | `(value: any, oldValue: any) => void` | - | - | - |
| `onClear` | 清除图标被点击后的回调 | `(evt: MouseEvent) => void` | - | - | - |
| `onExpand` | 点击展开图标时触发 | `(expanded: boolean, data: CascaderData) => void` | - | - | - |
| `onExpandedChange` | 展开状态发生变化时触发 | `(expendedKeys: VKey[], expendedData: CascaderData[]) => void` | - | - | - |
| `onLoaded` | 子节点加载完毕时触发 | `(loadedKeys: VKey[], data: CascaderData) => void` | - | - | - |
| `onSearch` | 开启搜索功能后，输入后的回调 | `(searchValue: string) => void` | - | - | 通常用于服务端搜索 |

##### CascaderData

| 名称 | 说明 | 类型  | 默认值 | 全局配置 | 备注 |
| --- | --- | --- | --- | --- | --- |
| `children` | 子节点数据 | `CascaderData[]` | - | - | - |
| `disabled` | 禁用节点 | `boolean` | - | - | - |
| `isLeaf` | 设置为叶子节点 | `boolean` | - | - | 不为 `true` 且设置了 `loadChildren` 时会强制将其作为父节点  |
| `key` | 节点的唯一标识 | `VKey` | - | - | - |
| `label` | 节点的文本 | `string` | - | - | - |

#### CascaderSlots

| 名称 | 说明 | 参数类型 | 备注 |
| --- | --- | --- | --- |
|  `empty` | 自定义空状态 | - | - |
|  `selectedItem` | 自定义选中项 | `data: SelectedItemProps` | 使用该插槽后`selectedLabel`将无效 |
|  `selectedLabel` | 自定义选中的标签 | `data: CascaderData` | - |
|  `overflowedLabel` | 自定义超出最多显示多少个标签的内容 | `data: CascaderData[]` | 参数为超出的数组 |
|  `optionLabel` | 自定义选项的文本 | `data: SelectOption` | - |

```ts
interface SelectedItemProps {
  disabled: boolean
  key: VKey
  prefixCls: string
  removable: boolean
  label: string
  value: unknown
  onRemove: (key: VKey) => void
}
```

#### CascaderMethods

| 名称 | 说明 | 参数类型 | 备注 |
| --- | --- | --- | --- |
| `blur` | 失去焦点 | - | - |
| `focus` | 获取焦点 | - | - |

### IxCascaderPanel

级联选择面板

#### CascaderPanelProps

| 名称 | 说明 | 类型  | 默认值 | 全局配置 | 备注 |
| --- | --- | --- | --- | --- | --- |
| `v-model:selectedKeys` | 当前选中的的值 | `any \| any[] \| any[][]` | - | - | - |
| `v-model:expandedKeys` | 展开节点的 `key` 数组 | `VKey[]` | - | - | - |
| `v-model:loadedKeys` | 已经加载完毕的节点的 `key` | `VKey[]` | - | - | - |
| `childrenKey` | 替代[CascaderData](#CascaderData)中的`children`字段 | `string` | `children` | ✅ | - |
| `customAdditional` | 自定义下拉选项的额外属性 | `CascaderCustomAdditional` | - | - | 例如 `class`, 或者原生事件 |
| `dataSource` | 树型数据数组,参见[CascaderData](#CascaderData) | `CascaderData[]` | `[]` | - | - |
| `disabled` | 禁用选择器 | `boolean` | - | - | - |
| `disableData` | 动态禁用某些项 | `(data: CascaderData) => boolean` | - | - | - |
| `empty` | 空数据时的内容 | `'default' \| 'simple' \| EmptyProps` | `'simple'` | - | - |
| `expandIcon` | 展开图标 | `string \| #expandIcon="{key: VKey, expanded: boolean, data: CascaderData}"` | `right` | ✅ | - |
| `expandTrigger` | 触发展开的方式 | `'click' \| 'hover'` | `click` | - | - |
| `fullPath` | 选中后的值是否包含全部路径 | `boolean` | `true` | ✅ | 会影响值的类型，参见 [基本使用](#components-cascader-demo-Basic) 和 [多选模式](#components-cascader-demo-Multiple) |
| `getKey` | 获取数据的唯一标识 | `string \| (data: CascaderData) => VKey` | `key` | ✅ | - |
| `labelKey` | 替代[CascaderData](#CascaderData)中的`label`字段 | `string` | `label` | ✅ | -
| `loadChildren` | 加载子节点数据 | `(data: CascaderData) => Promise<CascaderData[]>` | - | - | - |
| `maxLabel` | 最多显示多少个标签 | `number \| 'responsive'` | - | - | 响应式模式会对性能产生损耗 |
| `multiple` | 多选模式 | `boolean` | `false` | - | - |
| `multipleLimit` | 最多选中多少项 | `number` | - | - | - |
| `searchable` | 是否可搜索 | `boolean \| 'overlay'` | `false` | - | 当为 `true` 时搜索功能集成在选择器上，当为 `overlay` 时，搜索功能集成在悬浮层上 |
| `searchFn` | 根据搜索的文本进行筛选 | `boolean \| SelectSearchFn` | `true` | - | 为 `true` 时使用默认的搜索规则, 如果使用远程搜索，应该设置为 `false` |
| `separator` | 设置分割符 | `string` | `/` | - | - |
| `strategy` | 设置级联策略 | `'all' \| 'parent' \| 'child' \| 'off'` | `'all'` | - | 具体用法参见 [级联策略](#components-cascader-demo-Strategy) |
| `virtual` | 是否开启虚拟滚动 | `boolean` | `false` | - | 需要设置 `height` |
| `virtualScrollMode` | 虚拟滚动的滚动模式 | `'native' \| 'simulated'` | `'native'` | - | - |
| `onSelect` | 选中值触发 | `(option: CascaderData, oldValue: any) => void` | - | - | - |
| `onExpand` | 点击展开图标时触发 | `(expanded: boolean, isSelected: boolean) => void` | - | - | - |
| `onExpandedChange` | 展开状态发生变化时触发 | `(expendedKeys: VKey[], expendedData: CascaderData[]) => void` | - | - | - |
| `onLoaded` | 子节点加载完毕时触发 | `(loadedKeys: VKey[], data: CascaderData) => void` | - | - | - |
| `onSearch` | 开启搜索功能后，输入后的回调 | `(searchValue: string) => void` | - | - | 通常用于服务端搜索 |

#### CascaderPanelSlots

| 名称 | 说明 | 参数类型 | 备注 |
| --- | --- | --- | --- |
|  `empty` | 自定义空状态 | - | - |
|  `optionLabel` | 自定义选项的文本 | `data: SelectOption` | - |
