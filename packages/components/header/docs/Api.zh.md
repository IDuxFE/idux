## API

### IxHeader

#### HeaderProps

| 名称 | 说明 | 类型  | 默认值 | 全局配置 | 备注 |
| --- | --- | --- | --- | --- | --- |
| `avatar` | 自定义头像 | `string \| AvatarProps \| #avatar` | - | - | 传入 `string` 时，为头像的图标  |
| `description` | 标题下方的说明文字 | `string \| #description` | - | - | - |
| `disabled` | 是否禁用 | `boolean` | `false` | - | - |
| `prefix` | 标题前缀图标 | `string \| VNode \| #prefix` | - | - | - |
| `size` | 标题大小 | `'xl' \| 'lg' \| 'md' \| 'sm'` | `'md'` | - | - |
| `showBar` | 是否显示标题前的竖条 | `boolean` | `false` | - | - |
| `subTitle` | 二级标题文字 | `string \| #subTitle` | - | - | - |
| `suffix` | 标题后缀图标 | `string \| VNode \| #suffix` | - | - | 通常用于额外操作 |
| `title` | 标题文字 | `string \| #default` | - | - | - |
| `onPrefixClick` | 前缀图标被点击 | `(evt: MouseEvent) => void` | - | - | - |
| `onSuffixClick` | 后缀图标被点击 | `(evt: MouseEvent) => void` | - | - | - |
