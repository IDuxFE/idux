---
category: components
type: 反馈
title: Skeleton
subtitle: 骨架屏
order: 0
---

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

<!--- insert less variable begin  --->
## 主题变量

| 名称 | default | seer | 备注 |
| --- | --- | --- | --- |
| `@skeleton-margin-bottom` | `@spacing-sm` | - | - |
| `@skeleton-loader-margin-bottom` | `@spacing-xs` | - | - |
| `@skeleton-start-color` | `@color-grey-l20` | - | - |
| `@skeleton-end-color` | `@color-grey-l30` | - | - |
<!--- insert less variable end  --->