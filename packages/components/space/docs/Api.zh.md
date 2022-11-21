
### IxSpace

#### SpaceProps

| 属性 | 说明 | 类型 | 默认值 | 全局配置 | 备注 |
| --- | --- | --- | --- | --- | --- |
| `align` | 设置对齐方式, `align-items` | `'start' \| 'center' \| 'end' \| 'baseline' \| 'stretch'` | - | - | 参见[MDN](https://developer.mozilla.org/zh-CN/docs/Web/CSS/align-items) |
| `block` | 将内容宽度调整为自适应其父元素的宽度 | `boolean` | - | - | - |
| `justify` | 设置对齐方式, `justify-content` | `'start' \| 'center' \| 'end' \| 'space-around' \| 'space-between'` | - | - |  参见[MDN](https://developer.mozilla.org/zh-CN/docs/Web/CSS/justify-content) |
| `size` | 间距大小 | `'sm' \| 'md' \| 'lg' \| number \| string \| [number \| string, number \| string]` | `sm` | ✅  | 如果传入一个数组，那么分别表示 `[垂直间距, 水平间距]` |
| `separator` | 设置间隔分割符 | `string \| #separator` | - | - | - |
| `vertical` | 是否为垂直方向 | `boolean` | - | - | - |
| `wrap` | 是否自动换行 | `boolean` | `true` | ✅ | - |

#### SpaceSlots

| 属性 | 说明 | 参数类型 | 备注 |
| --- | --- | --- | --- |
| `default` | 需要被间隔的内容 | - | - |
