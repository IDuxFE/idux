---
category: components
type: 数据展示
title: Avatar
subtitle: 头像
order: 0
---

## API

### IxAvatar

#### AvatarProps

| 名称 | 说明 | 类型  | 默认值 | 全局配置 | 备注 |
| --- | --- | --- | --- | --- | --- |
| `alt` | 图像无法显示时的替代文本 | `string` | - | - | - |
| `gap` | 字符类型距离左右两侧边界单位像素 | `number` | `4` | ✅ | - |
| `icon` | 设置自定义图标 | `string \| VNode \| #icon` | `user` | ✅ | 如果设置了 `src`, 则作为图片加载失败的 fallback 行为 |
| `shape` | 设置头像的形状 | `'circle' \| 'square'` | `'circle'` | ✅ | - |
| `size` | 设置头像的大小 | `'lg' \| 'md' \| 'sm' \| number \| Record<BreakpointKey, number>` | `'md'` | ✅ | - |
| `src` | 图片类头像的资源地址 | `string` | - | - | - |
| `srcset` | 设置图片类头像响应式资源地址 | `string` | - | - | - |
| `text` | 设置自定义文本 | `string \| #default` | - | - | 优先级高于 `icon`，如果设置了 `src`, 则作为图片加载失败的 fallback 行为 |
| `onError` | 图片加载失败的事件 | `(evt: Event) => boolean \| void` | - | - | 返回 false 会关闭组件默认的 fallback 行为 |

<!--- insert less variable begin  --->
## 主题变量

| 名称 | `default` | `dark` | 备注 |
| --- | --- | --- | --- |
| `@avatar-size-sm` | `@height-sm` | - | - |
| `@avatar-size-md` | `@height-md` | - | - |
| `@avatar-size-lg` | `@height-lg` | - | - |
| `@avatar-font-size-sm` | `@font-size-lg` | - | - |
| `@avatar-font-size-md` | `@font-size-xl` | - | - |
| `@avatar-font-size-lg` | `@font-size-2xl` | - | - |
| `@avatar-color` | `@color-white` | - | - |
| `@avatar-background-color` | `@color-grey` | - | - |
| `@avatar-border-radius-circle` | `@border-radius-full` | - | - |
| `@avatar-border-radius-square` | `@border-radius-sm` | - | - |
<!--- insert less variable end  --->