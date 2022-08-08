## API

### IxBackTop

#### Props

| 参数 | 说明 | 类型 | 默认值 | 全局配置 | 备注 |
| -- | -- | -- | --  | -- | -- |
| `duration` | 回到顶部所需时间（ms） | `number` | `450` |  ✅  | - |
| `target` | 需要监听其滚动事件的元素 | `string \| HTMLElement \| () => string \| HTMLElement` | `window` | - | - |
| `visibilityHeight` | 滚动高度达到此参数值才出现 | `number` | `400`  |  ✅  | - |
| `onClick` | 点击回调事件 | `(evt: MouseEvent) => void` | - | - | - |

#### Slots

| 名称 | 说明 | 参数类型 | 备注 |
|  -- | -- | -- | -- |
|  `default` | 自定义显示内容 | - | - |
