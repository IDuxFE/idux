---
category: components
type: 通用
title: Tag
subtitle: 标签
order: 0
---

## API

### IxTag

#### TagProps

| 名称 | 说明 | 类型  | 默认值 | 全局配置 | 备注 |
| --- | --- | --- | --- | --- | --- |
| `color` | 标签颜色 | `string` | - | - | 内置了 `PresetColor \| StatusColor` 等颜色，也可以传入一个具体的颜色值 |
| `number` | 标签数字前缀的值 | `number` | - | - | 当有数字前缀时，标签默认只有填充颜色 |
| `icon` | 标签图标 | `string \| #icon` | - | - | - |
| `shape` | 标签形状 | `round \| rect`  | `rect` | ✅ | shape在 `number` 属性提供的前提下不生效 |

### IxTagGroup

#### TagGroupProps

| 名称 | 说明 | 类型  | 默认值 | 全局配置 | 备注 |
| --- | --- | --- | --- | --- | --- |
| `v-model:activeKeys` | 激活的标签的key | `VKey` | `[]` | - | - |
| `clickable` | 标签是否可点击 | `boolean` | `false` | - | - |
| `closable` | 标签是否可关闭 | `boolean` | `false` | - | - |
| `closeIcon` | 标签的关闭图标 | `string \| #closeIcon` | `close` | - | - |
| `dataSource` | 数据源 | `TagData[]` | - | - | - |
| `gap` | 每个标签的间隔 | `number \| string` | `8` | ✅ | - |
| `wrap` | 是否自动换行 | `boolean` | `true` | ✅ | - |
| `shape` | 标签形状 | `'round' \| 'rect'` | - | - | - |
| `onClick` | 标签被点击 | `(key:VKey, evt: MouseEvent) => void` | - | - | - |
| `onClose` | 标签的关闭图标被点击 | `(key:VKey, evt: MouseEvent) => void` | - | - | - |

```ts
export interface TagData extends Omit<TagProps, 'shape'> {
  key?: VKey
  label?: string
}
```

<!--- insert less variable begin  --->
## 主题变量

| 名称 | default | seer | 备注 |
| --- | --- | --- | --- |
| `@tag-font-size` | `@font-size-md` | `@font-size-sm` | - |
| `@tag-line-height` | `@line-height-base` | `1.3333` | - |
| `@tag-rect-min-width` | `40px` | - | - |
| `@tag-round-min-width` | `52px` | - | - |
| `@tag-numeric-min-width` | `64px` | - | - |
| `@tag-default-color` | `@color-graphite-d10` | - | - |
| `@text-color-inverse` | `@color-white` | - | - |
| `@tag-padding` | `@spacing-xs` | - | - |
| `@tag-default-padding-horizontal` | `8px` | - | - |
| `@tag-margin` | `@spacing-xs` | - | - |
| `@tag-border-radius` | `@border-radius-sm` | - | - |
| `@tag-round-border-radius` | `20px` | - | - |
| `@tag-default-border-color` | `transparent` | - | - |
| `@tag-default-background-color` | `#f0f1f2` | - | - |
<!--- insert less variable end  --->
