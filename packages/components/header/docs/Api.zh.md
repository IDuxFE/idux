### IxHeader

#### HeaderProps

| 名称 | 说明 | 类型  | 默认值 | 全局配置 | 备注 |
| --- | --- | --- | --- | --- | --- |
| `avatar` | 设置头像 | `string \| AvatarProps` | - | - | 传入 `string` 时，为头像的图标  |
| `description` | 标题下方的说明文字 | `string` | - | - | - |
| `disabled` | 是否禁用 | `boolean` | `false` | - | - |
| `prefix` | 标题前缀图标 | `string \| VNode` | - | - | - |
| `size` | 标题大小 | `'lg' \| 'md' \| 'sm'` | `'md'` | - | - |
| `showBar` | 是否显示标题前的竖条 | `boolean` | `false` | - | - |
| `suffix` | 标题后缀图标 | `string \| VNode` | - | - | 通常用于额外操作 |
| `title` | 标题文字 | `string \| #default` | - | - | - |
| `onPrefixClick` | 前缀图标被点击 | `(evt: MouseEvent) => void` | - | - | - |
| `onSuffixClick` | 后缀图标被点击 | `(evt: MouseEvent) => void` | - | - | - |

#### HeaderSlots

| 名称 | 说明 | 参数类型 | 备注 |
| --- | --- | --- | --- |
| `avatar` | 自定义头像 | - | - |
| `description` | 自定义说明文字 | - | - |
| `prefix` | 自定义前缀图标 | - | - |
| `suffix` | 自定义后缀图标 | - | - |
| `title` | 自定义标题文字 | - | - |
