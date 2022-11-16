
### IxRow

#### RowProps

| 名称 | 说明 | 类型  | 默认值 | 全局配置 | 备注 |
| --- | --- | --- | --- | --- | --- |
| `align` | 垂直对齐方式 | `'start' \| 'center' \| 'end' \| 'baseline' \| 'stretch'` | - | - | - |
| `justify` | 水平对齐方式 | `'start' \| 'center' \| 'end' \| 'space-around' \| 'space-between'` | - | - | - |
| `gutter` | 栅格间隔, 支持配置数字, 对象和数组 | `number \| object \| array` | `0` | - | 对象结构形如 `{ xs: 8, sm: 16 }`, 数组结构同时设置 `[垂直间距, 水平间距]` 形如 `[8, 8]` 或 `[{ xs: 8 }, { xs: 8}]` |
| `wrap` | 是否自动换行 | `boolean` | `true` | ✅ | - |

### IxCol

#### ColProps

| 名称 | 说明 | 类型  | 默认值 | 全局配置 | 备注 |
| --- | --- | --- | --- | --- | --- |
| `flex` | flex 属性 | `string \| number` | - | - | - |
| `offset` | 栅格左侧的间隔格数，间隔内不可以有栅格 | `number` | - | - | - |
| `order` | 栅格顺序 | `number` | - | - | - |
| `pull` | 栅格向左移动格数 | `number` | - | - | - |
| `push` | 栅格向右移动格数 | `number` | - | - | - |
| `span` | 栅格占位格数 | `number` | - | -  | - |
| `xs` | 响应式栅格，可为栅格数或一个包含其他属性的对象 | `number \| object` | - | -  | - |
| `sm` | 响应式栅格，同上 | `number \| object` | - | -  | - |
| `md` | 响应式栅格，同上 | `number \| object` | - | -  | - |
| `lg` | 响应式栅格，同上 | `number \| object` | - | -  | - |
| `xl` | 响应式栅格，同上 | `number \| object` | - | -  | - |

响应式栅格请参考[断点](/cdk/breakpoint/zh), 如果你修改默认的断点，请同步修改相关的 `less` 变量。
