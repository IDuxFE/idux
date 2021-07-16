---
category: components
type: 数据展示
title: Card
subtitle: 卡片
order: 0
single: true
---

最基础的卡片容器，可承载文字、列表、图片、段落，常用于后台概览页面。

## API

### ix-card

#### CardProps

| 属性 | 说明 | 类型 | 默认值 | 全局配置 | 备注 |
| --- | --- | --- | --- | --- | --- |
| `borderless` | 是否无边框 | `boolean` | `false` | ✅ | - |
| `cover` | 卡片封面图片 | `sting \| CardCover \| #cover` | - | - | - |
| `header` | 对话框标题 | `sting \| HeaderProps \| #header` | - | - | - |
| `hoverable` | 鼠标 hover 时，是否悬浮 | `boolean` | `false` | ✅ | - |
| `loading` | 是否加载中状态 | `boolean` | `false` | - | 当卡片内容还在加载中时，显示占位图 |
| `size` | 设置按钮大小 | `'medium' \| 'small'` | `'medium'` | ✅ | - |
| `footer` | 自定义底部按钮 | `CardButtonProps[] \| #footer` | - | - | - |

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
  // 是否显示该按钮, 默认为 true
  visible?: boolean
  // 按钮点击回调
  onClick?: (evt: Event) => void
}
```

### ix-card-grid

#### CardGridProps

| 属性 | 说明 | 类型 | 默认值 | 全局配置 | 备注 |
| --- | --- | --- | --- | --- | --- |
| `hoverable` | 鼠标 hover 时，是否悬浮 | `boolean` | - | - | 未设置时，会使用父组件的 `hoverable` |
