---
category: components
type: 数据展示
title: Card
subtitle: 卡片
order: 0
---

## API

### IxCard

#### CardProps

| 属性 | 说明 | 类型 | 默认值 | 全局配置 | 备注 |
| --- | --- | --- | --- | --- | --- |
| `borderless` | 是否无边框 | `boolean` | `false` | ✅ | - |
| `cover` | 卡片封面图片 | `string \| CardCover \| #cover` | - | - | - |
| `header` | 对话框标题 | `string \| HeaderProps \| #header` | - | - | - |
| `hoverable` | 鼠标 hover 时，是否悬浮 | `boolean` | `false` | ✅ | - |
| `shadow` | 是否有阴影 | `boolean` | `true` | - | - |
| `loading` | 是否加载中状态 | `boolean` | `false` | - | 当卡片内容还在加载中时，显示占位图 |
| `size` | 设置卡片大小 | `'sm' \| 'md' \| 'lg'` | `'md'` | ✅ | - |
| `footer` | 自定义底部按钮 | `CardButtonProps[] \| #footer` | - | - | - |
| `selectable` | 是否开启可选中配置 | `boolean` | `false` | - | - | - |
| `v-model:selected` | 指定当前卡片是否选中  | `boolean` | `false` | - | - | - |
| `disabled` | 是否禁用当前卡片 | `boolean` | `false` | - | - | - |
| `onSelectedChange` | 选中状态发生变化后的回调  | `(selected: boolean) => void` | - | - | - | - |

```ts
export interface CardCover {
  // 图片法显示时的替代文本
  alt: string
  // 图片的资源地址
  src: string
  // 图片的响应式资源地址
  srcset: string
}

export interface CardButtonProps extends ButtonProps {
  // 按钮的文本
  text?: string
  // 按钮点击回调
  onClick?: (evt: Event) => void
}
```

### IxCardGrid

#### CardGridProps

> 除以下表格之外还支持 `IxCol` 组件的[所有属性](/components/grid/zh#ColProps)。

| 属性 | 说明 | 类型 | 默认值 | 全局配置 | 备注 |
| --- | --- | --- | --- | --- | --- |
| `hoverable` | 鼠标 hover 时，是否悬浮 | `boolean` | - | - | 未设置时，会使用父组件的 `hoverable` |

<!--- insert less variable begin  --->
## 主题变量

| 名称 | default | seer | 备注 |
| --- | --- | --- | --- |
| `@card-padding-sm` | `@spacing-md` | `@spacing-lg` | - |
| `@card-padding-md` | `@spacing-lg` | - | - |
| `@card-padding-lg` | `@spacing-xl` | - | - |
| `@card-color` | `@text-color` | - | - |
| `@card-background-color` | `@background-color-component` | - | - |
| `@card-border-width` | `@border-width-sm` | - | - |
| `@card-border-style` | `@border-style` | - | - |
| `@card-border-color` | `@color-graphite-l30` | - | - |
| `@card-border-color-hover` | `transparent` | - | - |
| `@card-border-radius` | `@border-radius-sm` | - | - |
| `@card-border-color-selectable` | `@color-graphite-l20` | - | - |
| `@card-border-color-selectable-selected` | `@color-primary` | - | - |
| `@card-border-color-selectable-hover` | `@color-primary-l10` | - | - |
| `@card-icon-color` | `@color-graphite-l30` | - | - |
| `@card-icon-width` | `@font-size-xl` | - | - |
| `@card-icon-height` | `@font-size-lg` | - | - |
| `@card-box-shadow-selectable` | `0 2px 8px 0 rgba(30, 35, 43, 0.12)` | - | - |
| `@card-box-shadow` | `@shadow-bottom-sm` | - | - |
| `@card-gradient-min` | `fade(@color-grey, 20%)` | - | - |
| `@card-gradient-max` | `fade(@color-grey, 60%)` | - | - |
| `@card-header-padding` | `@spacing-sm` | - | - |
| `@card-loading-spacing` | `@spacing-xs` | - | - |
| `@card-loading-height` | `@font-size-md` | - | - |
| `@card-loading-background-size` | `600%` | - | - |
| `@card-loading-transition-duration` | `2s` | - | - |
| `@card-grid-width` | `25%` | - | - |
<!--- insert less variable end  --->
