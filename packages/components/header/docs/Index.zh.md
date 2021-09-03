---
category: components
type: 通用
title: Header
subtitle: 页头
order: 0
---

页头用于各中容器的顶部，起到了内容概览和引导操作的作用。

- 当需要使用户快速理解当前容器是什么以及提供一些快捷操作。

## API

### IxHeader

#### HeaderProps

| 名称 | 说明 | 类型  | 默认值 | 全局配置 | 备注 |
| --- | --- | --- | --- | --- | --- |
| `avatar` | 自定义头像 | `string \| AvatarProps \| #avatar` | - | - | 传入 `string` 时，为头像的图标  |
| `prefix` | 标题前缀图标 | `string \| VNode \| #prefix` | - | - | - |
| `size` | 标题大小 | `xLarge \| large \| medium \| small` | `large` | - | 分别对应 `h1 \| h2 \| h3 \| h4` |
| `showBar` | 是否显示标题前的竖条 | `boolean` | `false` | - | - |
| `subTitle` | 二级标题文字 | `string \| #subTitle` | - | - | - |
| `suffix` | 标题后缀图标 | `string \| VNode \| #suffix` | - | - | 通常用于额外操作 |
| `title` | 标题文字 | `string \| #default` | - | - | - |
| `onPrefixClick` | 前缀图标被点击 | `(evt: MouseEvent) => void` | - | - | - |
| `onSuffixClick` | 后缀图标被点击 | `(evt: MouseEvent) => void` | - | - | - |

#### HeaderSlots

| 名称 | 说明 | 参数类型 | 备注 |
| --- | --- | --- | --- |
| `description` | 标题下方的说明文字 | - | - |
