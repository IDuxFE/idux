### IxText

#### TextProps

| 名称 | 说明 | 类型  | 默认值 | 全局配置 | 备注 |
| --- | --- | --- | --- | --- | --- |
| `v-model:expanded` | 文字展开状态 | `boolean` | - | - | - |
| `copyable` | 点击图标可复制文本 | `boolean` | `false` | - | 仅支持普通文本 |
| `copyIcon` | 复制按钮图标 | `string | TextCopyIconRenderer | [string, string]` | ✅ | - |
| `copyTooltip` | 复制浮层配置 | `boolean | [string, string] | [TooltipProps, TooltipProps] | TooltipProps` | - | 提供字符串数字时，分别为未复制和复制之后的文字 |
| `expandIcon` | 展开收起图标 | `string | TextExpandIconRenderer | [string, string]` | ✅ | - |
| `ellipsis` | 文字省略配置 | `boolean | TextEllipsis` | - | 可以实现多行省略，以及展开收起 |
| `tag` | 渲染的标签名 | `string \| Component` | `span` | - | - |
| `tooltip` | 浮层配置 | `boolean \| 'native' \| TooltipProps` | `true` | - | 为 `native` 时展示原生提示，此时的提示内容仅支持普通文本 |
| `onCopy` | 复制回调 | `(success: boolean, text: string) => void` | - | - |

```ts
interface TextEllipsis {
  rows?: number
  expandable?: boolean
}
type TextCopyIconRenderer = (options: { copied: boolean }) => VNodeChild | string
type TextExpandIconRenderer = (options: { expanded: boolean }) => VNodeChild | string
```

#### TextSlots

| 名称 | 说明 | 参数类型 | 备注 |
| --- | --- | --- | --- |
| `title` | 自定义提示的内容 | - | - |
| `ellipsis` | 省略号 | - | - |
| `suffix` | 后缀 | - | - |
| `copyIcon` | 自定义复制图表 | `{ copied: boolean }` | - |
| `expandIcon` | 自定义展开收起图标 | `{ expanded: boolean }` | - |
