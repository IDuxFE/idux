## API

### IxSkeleton

#### SkeletonProps

| 名称 | 说明 | 类型  | 默认值 | 全局配置 | 备注 |
| --- | --- | --- | --- | --- | --- |
| `animated` | 是否开启动画 | `boolean` | `true` | ✅ | - |
| `loading` | 是否显示加载结束后的UI | `boolean` | `true` | - | - |
| `repeat` | 骨架的重复次数 | `number` | `1` | - | - |
| `type` | 骨架的类型 | `'text' \| 'rect' \| 'round' \| 'circle'` | `text` | - | - |
| `width` | 骨架的宽度 | `string \| number` | - | - | - |
| `height` | 骨架的高度 | `string \| number` | - | - | - |

#### SkeletonSlots

| 名称 | 说明 | 参数类型 | 备注 |
| --- | --- | --- | --- |
| `default` | 展示加载结束后的UI | - | - |
