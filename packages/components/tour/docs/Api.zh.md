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
| `targetDisabled` | 是否禁用目标区域 | `boolean` | `false` | - | - |
| `zIndex` | 浮层和遮罩的zIndex | `number` | - | - | - |
| `onChange` | `activeIndex`值变化的回调函数 | `(current: number, pre: number) => void` | - | - | - |
| `onClose` | 关闭的回调函数 | `() => void` | - | - | - |
| `onFinish` | 结束的回调函数 | `() => void` | - | - | - |

```ts
interface TourMaskOptions {
  color?: string // 遮罩颜色
  class?: string // 遮罩自定义class
  outlineColor?: string // 目标区域外轮廓
}

interface TargetGap {
  offset?: number // 目标高亮的区域距离实际节点的间距
  radius?: number // 目标高亮区域的边框圆角
  outline?: number // 目标高亮区域的外轮廓
}

type TargetGetter = () => HTMLElement | null | Promise<HTMLElement | null>

interface TourStep {
  title: string // 标题
  description?: string // 描述
  gap?: number | TargetGap // 目标高亮区域配置
  mask?: boolean | TourMaskOptions // 遮罩配置
  target?: MaybeElement | null | string | TargetGetter // 目标节点获取
  targetDisabled?: boolean // 是否禁用目标操作
  placement?: PopperPlacement // 浮层位置
  showArrow?: boolean // 是否展示箭头
  nextButton?: ButtonProps | boolean // 下一步的按钮配置
  nextButtonText?: string // 下一步按钮文字
  prevButton?: ButtonProps | boolean // 上一步的按钮配置
  prevButtonText?: string // 上一步按钮文字
  scrollIntoViewOptions?: boolean | ScrollIntoViewOptions // 滚动到可视区域
  beforeEnter?: () => void | Promise<void> // 进入之前执行
  afterLeave?: () => void | Promise<void> // 结束之后执行，步骤跳转之前会等待执行结果
}
```

#### TourSlots

| 名称 | 说明 | 参数类型 | 备注 |
| --- | --- | --- | --- |
| `title` | 浮层面板标题 | `{ activeIndex: number, title: string }` | - |
| `description` | 浮层面板内容描述 | `{ activeIndex: number, description: string }` | - |
| `indicators` | 浮层面板指示器 | `{ activeIndex: number, total: number }` | - |
