---
category: cdk
type: 
title: Scroll
subtitle: 滚动
order: 0
single: true
---

## API

### IxVirtualList

虚拟滚动：

- 通过仅渲染那些屏幕上可见的条目，来高效的显示大型列表。
- 数据量过多时，用于提升页面渲染性能。

#### VirtualListProps

| 名称 | 说明 | 类型  | 默认值 | 全局配置 | 备注 |
| --- | --- | --- | --- | --- | --- |
| `contentRender` | 自定义列表的容器节点 | `VirtualContentRenderFn \| #content={children}` | - | - | - |
| `dataSource` | 需要渲染的数据列表 | `Array` | `[]` | - | - |
| `fullHeight` | 是否永远使用 `height` 作为容器高度 | `boolean` | `false` | - | 仅在不符合虚拟滚动条件时生效 |
| `height` | 列表的高度 | `number` | `0` | - | 设置为大于 0 时才可以启用虚拟滚动 |
| `itemHeight` | 列表项的高度 | `number` | `0` | - | 设置为大于 0 时才可以启用虚拟滚动 |
| `itemKey` | 列表项的唯一标识 | `string \| (item) => VKey` | - | - | 必须设置 |
| `itemRender` | 列表项的渲染函数 | `VirtualItemRenderFn \| #item={item, index}` | - | - | 必须设置或者提供 `item` 插槽 |
| `onScroll` | 滚动事件 | `(evt: Event) => void` | - | - | - |
| `onScrolledChange` | 滚动的位置发生变化 | `(startIndex: number, endIndex: number, visibleData: any[]) => void` | - | - | - |
| `onScrolledBottom` | 滚动到底部时触发 | `() => void` | - | - | - |

#### VirtualListMethods

| 名称 | 说明 | 参数类型 | 备注 |
| --- | --- | --- | --- |
| `scrollTo` | 手动设置滚动条位置 | `(value?: number \| ScrollToConfig) => void` | - |
