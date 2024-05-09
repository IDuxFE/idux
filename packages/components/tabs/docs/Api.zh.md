
### IxTabs

#### IxTabsProps

| 名称 | 说明 | 类型  | 默认值 | 全局配置 | 备注 |
| --- | --- | --- | --- | --- | --- |
| `v-model:selectedKey` | 选中标签的`key`值 | `VKey`  | - | - | 当没有传此值时，默认选中第一个 |
| `v-model:allTabsPanelOpen` | 所有面板是否展开 | - | - | - |
| `addable` | 显示新增按钮 | `boolean` | `false`| - | - |
| `closable` | 显示关闭按钮 | `boolean` | `false`| - | - |
| `dataSource` | 数据源 | `TabsData[]` | - | - | 优先级高于 `default` 插槽 |
| `forceRender` | 内容被隐藏时是否渲染 DOM 结构 | `boolean` | `false` | - | - |
| `mode` | 当`type`为`segment`时按钮的样式 | `'default' \| 'primary'` | `'default'` | - | - |
| `placement` | 标签的方位 | `'top' \| 'start' \| 'end' \| 'bottom'` | `'top'` | - | 其他类型仅在type为`line`生效 |
| `type` | 标签的类型 | `'card' \| 'line' \| 'segment'` | `'card'`| - | - |
| `size` | 标签页的尺寸 | `'lg' \| 'md'` | `'md'` | ✅ | - |
| `onAdd` | 点击添加按钮后的回调 | `() => void \| boolean \| Promise<boolean>` | - | - |
| `onClose` | 点击关闭按钮后的回调，返回 `false` 或 promise resolve `false` 或 promise reject 会阻止关闭 | `(key: any) => void \| boolean \| Promise<boolean>` | - | - |
| `onBeforeLeave` | 切换标签之前的钩子函数，返回 `false` 或 promise resolve `false` 或 promise reject 会阻止切换 | `(key: VKey, oldKey?: VKey) => boolean \| Promise<boolean>`| - | - | - |

#### IxTabProps

| 名称 | 说明 | 类型  | 默认值 | 全局配置 | 备注 |
| --- | --- | --- | --- | --- | --- |
| `disabled` | 是否禁用当前标签 | `boolean` | `false` | - | - |
| `forceRender` | 内容被隐藏时是否渲染 DOM 结构 | `boolean` | `false` | - | - |
| `key` | 被选中时标签的`key`值 | `boolean` | `false` | - | - |
| `title` | 标签内容 | `string \| #title` | - | - | - |

#### TabsData

```ts
export interface TabsData<K = VKey> extends TabProps {
  key: K
  customContent?: string | ((data: { key: VKey; content?: string; selected?: boolean }) => VNodeChild)
  customTitle?: string | ((data: { key: VKey; disabled?: boolean; selected?: boolean; title?: string; overflowed: boolean }) => VNodeChild)
  [key: string]: any
}
```

#### IxTabsSlots

| 名称 | 说明 | 参数类型 | 备注 |
| --- | --- | --- | --- |
| `title` | 标题插槽 | `{ key:VKey, disabled:boolean, selected:boolean, title: string, overflowed: boolean }` | `overflowed`代表tab溢出且展示在更多tab的浮层中 |
| `allTabsPanelLabel` | 所有面板中的label | `{ key:VKey, disabled:boolean, selected:boolean, title: string }` | 优先使用该插槽，当没有提供时，会使用`title`插槽或者`customTitle` |
| `content` | 内容插槽 | `{key:VKey, content: any, selected: boolean}` | - |
| `addIcon` | 新增图标 | - | 也可以用于自定义其他操作 |

若是通过`dataSource`进行渲染的，可以通过设置`customTitle`和`customContent`字段，自定义插槽进行渲染，[参考](/components/tabs/zh?tab=demo#components-tabs-custom-tab)
