---
category: components
type: 导航
title: Pagination
subtitle: 分页
order: 0
single: true
---

采用分页的形式分隔长列表，每次只加载一个页面。

## 何时使用

- 当加载/渲染所有数据将花费很多时间时
- 可切换页码浏览数据

## API

### ix-pagination

#### Props

| 名称 | 说明 | 类型  | 默认值 | 全局配置 | 备注 |
| --- | --- | --- | --- | --- | --- |
| `v-model:pageIndex` | 当前页数 | `number` | `1` | - | - |
| `v-model:pageSize` | 每页条数 | `number` | `10` | ✅ | - |
| `disabled` | 是否禁用 | `boolean` | `false` | - | - |
| `itemRender` | 自定义页码的结构 | `PaginationItemRenderFn \| #item` | - | ✅ | - |
| `pageSizes` | 指定每页可以显示多少条 | `number[]` | `[10, 20, 50, 100]` | ✅ | - |
| `showQuickJumper` | 是否可以快速跳转至某页 | `boolean` | `false` | ✅ | - |
| `showSizeChanger` | 是否是否可以改变 `pageSize` | `boolean` | `false` | ✅ | - |
| `showTitle` | 是否显示原生 `title` 提示 | `boolean` | `true` | ✅ | - |
| `showTotal` | 是否显示数据总数 | `boolean` | `true` | ✅ | - |
| `simple` | 显示为简单分页 | `boolean` | `false` | ✅ | - |
| `size` | 分页组件大小 | `middle \| small` | `middle` | ✅ | - |
| `total` | 数据总数 | `number` | `0` | - | - |
| `totalRender` | 自定义数据总数内容 | `PaginationTotalRenderFn \| #total` | - | ✅ | - |

#### Slots

| 名称 | 说明 | 参数类型 | 备注 |
| --- | --- | --- | --- |
| `item` | 用于自定义页码的结构 | `PaginationItemRenderOptions` | - |
| `total` | 用于显示数据总量和当前数据顺序 | `{ total: number; range: [number, number] }` | - |
