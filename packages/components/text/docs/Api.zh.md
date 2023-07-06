### IxText

#### TextProps

| 名称 | 说明 | 类型  | 默认值 | 全局配置 | 备注 |
| --- | --- | --- | --- | --- | --- |
| `copyable` | 点击图标可复制文本 | `boolean` | `false` | - | 仅支持普通文本 |
| `expandable` | 点击可展开文本 | `boolean` | `false` | - | 建议搭配 `lineClamp` 一起使用 |
| `lineClamp` | 多行省略 | `string \| number` | - | - | 基于 `-webkit-line-clamp` 的多行省略，兼容性参见 [caniuse](https://caniuse.com/?search=line-clamp) |
| `tag` | 渲染的标签名 | `string \| Component` | `span` | - | - |
| `tooltip` | 浮层配置 | `boolean \| 'native' \| TooltipProps` | `true` | - | 为 `native` 时展示原生提示，此时的提示内容仅支持普通文本 |

#### TextSlots

| 名称 | 说明 | 参数类型 | 备注 |
| --- | --- | --- | --- |
| `title` | 自定义提示的内容 | - | - |
| `copyIcon` | 自定义复制图表 | `{ copied: boolean }` | - |
