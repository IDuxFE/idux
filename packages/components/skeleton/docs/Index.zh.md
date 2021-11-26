---
category: components
type: 反馈
title: Skeleton
subtitle: 骨架屏
order: 0
---

在需要等待加载数据的UI位置提供一个占位图。

### 什么情况下使用？

- 网络较慢，需要长时间等待加载处理的情况下。
- 图文信息内容较多的列表/卡片中。
- 只在第一次加载数据的时候使用。

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
| default | 展示加载结束后的UI | - | - |
