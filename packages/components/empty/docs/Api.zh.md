## API

### IxEmpty

#### EmptyProps

| 名称 | 说明 | 类型  | 默认值 | 全局配置 | 备注 |
| --- | --- | --- | --- | --- | --- |
| `description` | 自定义描述内容 | `string \| #description` | - | - | - |
| `icon` | 设置自定义图标 | `string` | `empty` | ✅ | - |
| `image` | 设置自定义图片地址 | `string \| #image` | - | ✅ | 优先级高于 `icon` |

#### EmptySlots

| 名称 | 说明 | 参数类型 | 备注 |
| --- | --- | --- | --- |
| `default` | 自定义 `content` 区域内容 | - | - |
