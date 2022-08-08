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
