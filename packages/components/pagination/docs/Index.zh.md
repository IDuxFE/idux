---
category: components
type: 导航
title: Pagination
subtitle: 分页
order: 0
---

## API

### IxPagination

#### PaginationProps

| 名称 | 说明 | 类型  | 默认值 | 全局配置 | 备注 |
| --- | --- | --- | --- | --- | --- |
| `v-model:pageIndex` | 当前页数 | `number` | `1` | - | - |
| `v-model:pageSize` | 每页条数 | `number` | `10` | ✅ | - |
| `disabled` | 是否禁用 | `boolean` | `false` | - | - |
| `itemRender` | 自定义页码的结构 | `PaginationItemRenderFn \| #item='PaginationItemRenderOptions'` | - | ✅ | - |
| `pageSizes` | 指定每页可以显示多少条 | `number[]` | `[10, 20, 50, 100]` | ✅ | - |
| `showQuickJumper` | 是否可以快速跳转至某页 | `boolean` | `false` | ✅ | - |
| `showSizeChanger` | 是否是否可以改变 `pageSize` | `boolean` | `false` | ✅ | - |
| `showTitle` | 是否显示原生 `title` 提示 | `boolean` | `true` | ✅ | - |
| `showTotal` | 是否显示数据总数 | `boolean` | `true` | ✅ | - |
| `simple` | 显示为简单分页 | `boolean` | `false` | ✅ | - |
| `size` | 分页组件大小 | `md \| sm` | `sm` | ✅ | - |
| `total` | 数据总数 | `number` | `0` | - | - |
| `totalRender` | 自定义数据总数内容和当前数据顺 | `PaginationTotalRenderFn \| #total='{ total: number; range: [number, number] }'` | - | ✅ | - |
| `onChange` | `pageIndex` 或者 `pageSize` 发生改变时的回调 | `(pageIndex: number, pageSize: number) => void` | - | ✅ | - |
