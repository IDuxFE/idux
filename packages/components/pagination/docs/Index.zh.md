---
category: components
type: 导航
order: 0
title: Pagination
subtitle: 分页
---

## API

### IxPagination

#### PaginationProps

| 名称 | 说明 | 类型  | 默认值 | 全局配置 | 备注 |
| --- | --- | --- | --- | --- | --- |
| `v-model:pageIndex` | 当前页数 | `number` | `1` | - | - |
| `v-model:pageSize` | 每页条数 | `number` | `10` | ✅ | - |
| `disabled` | 是否禁用 | `boolean` | `false` | - | - |
| `pageSizes` | 指定每页可以显示多少条 | `number[]` | `[10, 20, 50, 100]` | ✅ | - |
| `showQuickJumper` | 是否可以快速跳转至某页 | `boolean` | `false` | ✅ | - |
| `showSizeChanger` | 是否是否可以改变 `pageSize` | `boolean` | `false` | ✅ | - |
| `showTitle` | 是否显示原生 `title` 提示 | `boolean` | `true` | ✅ | - |
| `showTotal` | 是否显示数据总数 | `boolean` | `true` | ✅ | - |
| `simple` | 显示为简单分页 | `boolean` | `false` | - | - |
| `size` | 分页组件大小 | `'md' \| 'sm'` | `'md'` | ✅ | - |
| `total` | 数据总数 | `number` | `0` | - | - |
| `onChange` | `pageIndex` 或者 `pageSize` 发生改变时的回调 | `(pageIndex: number, pageSize: number) => void` | - | - | - |

#### PaginationSlots

| 名称 | 说明 | 参数类型 | 备注 |
|  -- | -- | -- | -- |
|  `item` | 自定义页码的结构 | `PaginationItemRenderOptions` | - |
|  `total` | 自定义数据总数内容和当前数据顺 | `{ total: number; range: [number, number], prefix: string, suffix: string }` | - |

```ts
export interface PaginationItemRenderOptions {
  index?: number
  type: PaginationItemType
  active: boolean
  disabled: boolean
  /**
   * 原始的 VNode
   */
  original: VNode
}
```

<!--- insert less variable begin  --->
## 主题变量

| 名称 | `default` | `dark` | 备注 |
| --- | --- | --- | --- |
| `@pagination-font-size` | `@font-size-md` | - | - |
| `@pagination-item-icon-font-size` | `@font-size-sm` | - | - |
| `@pagination-item-height-md` | `@height-md` | - | - |
| `@pagination-item-height-sm` | `@height-sm` | - | - |
| `@pagination-item-margin-right-md` | `@spacing-sm` | - | - |
| `@pagination-item-margin-right-sm` | `@spacing-xs` | - | - |
| `@pagination-item-input-width-md` | `48px` | - | - |
| `@pagination-item-input-width-sm` | `40px` | - | - |
| `@pagination-item-spacing-sm` | `@height-sm` | - | - |
| `@pagination-item-active-color` | `@button-primary` | - | - |
| `@pagination-item-active-background-color` | `@button-primary-background-color` | - | - |
| `@pagination-item-hover-background-color` | `tint(@button-primary-background-color, 90%)` | - | - |
| `@pagination-item-disabled-color` | `@button-disable-color` | - | - |
| `@pagination-item-disabled-background-color` | `@button-disable-background-color` | - | - |
<!--- insert less variable end  --->