---
category: components
type: 数据展示
title: List
subtitle: 列表
order: 0
---

## API

### IxList

#### ListProps

| 名称 | 说明 | 类型  | 默认值 | 全局配置 | 备注 |
| --- | --- | --- | --- | --- | --- |
| `header` | 列表头部 | `string \| slot` | - | - | - |
| `footer` | 列表底部 | `string \| slot` | - | - | - |
| `loadMore` | 加载更多 | `string \| slot` | 加载更多 | - | - |
| `empty` | 空状态 | `string \| slot` | - | - | - |
| `borderless` | 是否无边框 | `boolean` | true | ✅ | - |
| `split` | 是否显示分割线 | `boolean` | true | - | - |
| `loading` | 加载状态 | `boolean \| SpinProps` | false | - | SpinProps请参照 spin 组件 |
| `size` | 大小 | `'lg' \| 'md' \| 'sm'` | `'md'` | ✅ | - |
| `grid` | grid 布局 | `ListGridProps` | - | - | 结合了IxRow, IxCol 的部分配置 |
| `grid.gutter` | grid 元素间隔 | `number` | - | - | IxRow 中的 gutter |
| `grid.column` | gird 布局中每一行元素的个数 | `number` | - | - | 通过Math.floor(24 / column) 计算得到IxCol 中的 span |
| `grid.ms` | gird 布局在 ms分辨率下的所占格数 | `number` | - | - | 同IxCol的ms |
| `grid.sm` | gird 布局在 sm分辨率下的所占格数 | `number` | - | - | 同IxCol的sm |
| `grid.md` | gird 布局在 md分辨率下的所占格数 | `number` | - | - | 同IxCol的md |
| `grid.ld` | gird 布局在 ld分辨率下的所占格数 | `number` | - | - | 同IxCol的ld |
| `grid.xl` | gird 布局在 xl分辨率下的所占格数 | `number` | - | - | 同IxCol的xl |

#### ListSlots

| 名称 | 说明 | 参数类型 | 备注 |
| --- | --- | --- | --- |
| header | 列表头部 | - | - |
| footer | 列表底部 | - | - |
| loadMore | 加载更多 | - | - |
| empty | 空状态 | - | - |

### IxListItem

#### ListItemProps

| 名称 | 说明 | 类型  | 默认值 | 全局配置 | 备注 |
| --- | --- | --- | --- | --- | --- |
| `title` | 列表项标题 | `string \| slot` | - | - | - |
| `content` | 列表项内容 | `string \| slot` | - | - | - |
| `extra` | 列表项额外项 | `string \| slot` | - | - | - |

#### ListItemSlots

| 名称 | 说明 | 参数类型 | 备注 |
| --- | --- | --- | --- |
| title | 列表项标题 | - | - |
| content | 列表项内容 | - | - |
| extra | 列表项额外项 | - | - |

<!--- insert less variable begin  --->
## 主题变量

| 名称 | default | seer | 备注 |
| --- | --- | --- | --- |
| `@list-border-color` | `@border-color` | - | - |
| `@list-border-size` | `@border-width-sm` | - | - |
| `@list-font-size-md` | `@font-size-md` | - | - |
| `@list-font-size-sm` | `@font-size-sm` | - | - |
| `@list-title-font-size-md` | `@font-size-lg` | - | - |
| `@list-title-font-size-sm` | `@font-size-md` | - | - |
| `@list-title-font-weight-sm` | `@font-weight-md` | - | - |
| `@list-hover-shadow` | `@shadow-bottom-sm` | - | - |
| `@list-padding-lg` | `@spacing-lg` | - | - |
| `@list-padding-sm` | `@spacing-sm` | - | - |
| `@list-min-height` | `128px` | - | - |
<!--- insert less variable end  --->