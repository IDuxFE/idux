
### IxTag

#### TagProps

| 名称 | 说明 | 类型  | 默认值 | 全局配置 | 备注 |
| --- | --- | --- | --- | --- | --- |
| `bordered` | 是否带边框 | `boolean` | - | - | - |
| `filled` | 是否为填充标签 | `boolean` | - | - | - |
| `icon` | 标签的图标 | `string \| #icon` | - | - | - |
| `number` | 标签数字的值 | `number` | - | - | - |
| `shape` | 标签形状 | `round \| rect`  | - | - | 在 `number` 属性提供的前提下不生效 |
| `status` | 标签状态 | `'normal' \| 'success' \| 'info' \| 'warning' \| 'risk' \| 'error' \| 'fatal'`  | `'normal'` | - | - |

#### TagSlots

| 名称 | 说明 | 参数类型 | 备注 |
| --- | --- | --- | --- |
| `default` | 自定义标签文本 | - | - |
| `icon` | 自定义标签图标 | - | - |

### IxTagGroup

#### TagGroupProps

> 除以下表格之外还支持 `Space` 组件的[所有属性](/components/space/zh?tab=api#SpaceProps)。

| 名称 | 说明 | 类型  | 默认值 | 全局配置 | 备注 |
| --- | --- | --- | --- | --- | --- |
| `v-model:activeKeys` | 激活的标签的key | `VKey` | `[]` | - | - |
| `bordered` | 标签是否带边框 | `boolean` | - | - | - |
| `filled` | 标签是否填充 | `boolean` | - | - | - |
| `clickable` | 标签是否可点击 | `boolean` | `false` | - | - |
| `closable` | 标签是否可关闭 | `boolean` | `false` | - | - |
| `closeIcon` | 标签的关闭图标 | `string \| #closeIcon` | `close` | - | - |
| `dataSource` | 数据源 | `TagData[]` | - | - | 优先级高于 `default` 插槽 |
| `gap` | 每个标签的间隔 | `number \| string` | `8` | ✅ | - |
| `wrap` | 是否自动换行 | `boolean` | `true` | ✅ | - |
| `shape` | 标签形状 | `'round' \| 'rect'` | - | - | - |
| `onClick` | 标签被点击 | `(key:VKey, evt: MouseEvent) => void` | - | - | - |
| `onClose` | 标签的关闭图标被点击 | `(key:VKey) => void \| boolean \| Promise<boolean>` | - | - | 返回 `false` 时将阻止关闭 |

```ts
export interface TagData extends TagProps {
  key?: VKey
  label?: string
}
```

#### TagGroupSlots

| 名称 | 说明 | 参数类型 | 备注 |
| --- | --- | --- | --- |
| `default` | 可以自定义 `<IxTag>` 组件 | - | - |
| `closeIcon` | 自定义关闭图标 | - | - |
