### IxTour

#### TourProps

| 名称 | 说明 | 类型  | 默认值 | 全局配置 | 备注 |
| --- | --- | --- | --- | --- | --- |
| `v-model:activeIndex` | 当前激活状态的`step`索引 | `number` | - | - | - |
| `v-model:visible` | 显示状态 | `boolean` | - | - | - |
| `closable` | 是否可关闭 | `boolean` | `true` | ✅ | - |
| `closeOnEsc` | 是否在按下`Esc`键时触发关闭 | `boolean` | `true` | ✅ | - |
| `animatable` | 是否开启动画 | `boolean` | `true` | ✅ | - |
| `gap` | 遮罩的目标位置区域的间距和圆角 | `{ offset: number, radius: number }` | `{ offset: 4, radius: 2 }` | ✅ | - |
| `mask` | 遮罩配置 | `boolean \| TourMaskOptions` | `true` | ✅ | 配置为`false`时禁用遮罩 |
| `offset` | 浮层相对目标元素的偏移量 | `[number, number]` | `true` | ✅ | 第一个元素是水平偏移量，第二个元素是垂直偏移量 |
| `overlayContainer` | 自定义容器节点 | `string \| HTMLElement` | - | ✅ | - |
| `placement` | 浮层的对齐方式 | `OverlayPlacement` | `'bottomStart'` | ✅ | - |
| `showArrow` | 浮层是否显示箭头 | `boolean` | `true` | ✅ | - |
| `steps` | 步骤配置 | `TourStep[]` | - | - | - |
| `scrollIntoViewOptions` | `scrollIntoView` 参数 | `boolean \| ScrollIntoViewOptions` | `true` | ✅ | - |
| `zIndex` | 浮层和遮罩的zIndex | `number` | - | - | - |
| `onChange` | `activeIndex`值变化的回调函数 | `(current: number, pre: number) => void` | - | - | - |
| `onClose` | 关闭的回调函数 | `() => void` | - | - | - |
| `onFinish` | 结束的回调函数 | `() => void` | - | - | - |

```ts
interface TourMaskOptions {
  color?: string
  class?: string
}

type TargetGetter = () => HTMLElement | null | Promise<HTMLElement | null>

interface TourStep {
  title: string
  description?: string
  gap?: number | TargetGap
  mask?: boolean | TourMaskOptions
  target?: MaybeElement | null | string | TargetGetter
  placement?: PopperPlacement
  showArrow?: boolean
  nextButton?: ButtonProps | boolean
  nextButtonText?: string
  prevButton?: ButtonProps | boolean
  prevButtonText?: string
  scrollIntoViewOptions?: boolean | ScrollIntoViewOptions
  beforeEnter?: () => void | Promise<void>
  afterLeave?: () => void | Promise<void>
}
```

#### TourSlots

| 名称 | 说明 | 参数类型 | 备注 |
| --- | --- | --- | --- |
| `title` | 浮层面板标题 | `{ activeIndex: number, title: string }` | - |
| `description` | 浮层面板内容描述 | `{ activeIndex: number, description: string }` | - |
| `indicators` | 浮层面板指示器 | `{ activeIndex: number, total: number }` | - |
