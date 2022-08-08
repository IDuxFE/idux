## API

### IxIcon

#### IconProps

| 名称 | 说明 | 类型  | 默认值 | 全局配置 | 备注 |
| --- | --- | --- | --- | --- | --- |
| `name`| 图标名称 | `string` | - | - | - |
| `color` | 图标颜色 | `string` | - | - | - |
| `iconfont` | 图标是否来自 `iconfont` | `boolean` | - | - | - |
| `rotate` | 图标旋转角度 | `boolean \| number` | `false` | - |  为 `true` 时会循环旋转 |
| `size` | 图标大小 | `number \| string` | - | - | - |

### 辅助函数

| 名称 | 说明 | 参数类型 | 备注 |
| --- | --- | --- | --- |
| `addIconDefinitions` | 用于静态引入图标 | `(icons: IconDefinition[]) => void` | - |
| `fetchIconFormScript` | 用于从 [iconfont](https://www.iconfont.cn) 获取图标资源文件 | `(url: string \| string[])=> void` | - |
