### IxControlTrigger

#### ControlTriggerProps

| 名称 | 说明 | 类型  | 默认值 | 全局配置 | 备注 |
| --- | --- | --- | --- | --- | --- |
| `value` | 选中的值 | `any` | - | - | 主要用于无障碍的值添加 |
| `borderless` | 是否是无边框的 | `boolean` | - | - | - |
| `clearable` | 是否可清除 | `boolean` | - | - | - |
| `clearIcon` | 自定义清除图标 | `string \| #clearIcon` | - | - | - |
| `disabled` | 是否禁用 | `boolean` | - | - | - |
| `focused` | 是否聚焦 | `boolean` | - | - | - |
| `offset` | 浮层相对目标元素的偏移量 | `[number, number]` | `[0, 4]` | - | 第一个元素是水平偏移量，第二个元素是垂直偏移量 |
| `v-model:open` | 浮层的打开状态 | `boolean` | - | - | - |
| `overlayClassName` | 下拉菜单的 `class`  | `string` | - | - | - |
| `overlayContainer` | 自定义浮层容器节点  | `string \| HTMLElement \| (trigger?: Element) => string \| HTMLElement` | - | - | - |
| `overlayContainerFallback` | 默认的浮层容器节点class | `string` | - | - | - |
| `overlayMatchWidth` | 下拉菜单和选择器同宽  | `boolean` | `false` | - | - |
| `paddingless` | 是否去掉内边距 | `boolean` | `false` | - | - |
| `placeholder` | 占位符 | `string \| #placeholder` | - | - | - |
| `readonly` | 是否去掉内边距 | `boolean` | `false` | - | - |
| `size` | 控件尺寸 | `'sm' \| 'md' \| 'lg'` | `'md'` | - | - |
| `status` | 校验状态 | `valid \| invalid \| validating` | - | - | - |
| `suffix` | 后缀 | `string \| #suffix` | `'down` | - | - |
| `suffixRotate` | 后缀的旋转 | `string \| boolean \| number` | - | - | - |
| `suffixRotate` | 后缀的旋转 | `string \| boolean \| number` | - | - | - |
| `onClear` | 清除图标被点击后的回调 | `(evt: MouseEvent) => void` | - | - | - |
| `onFocus` | 获取焦点后的回调 | `(evt: FocusEvent) => void` | - | - | - |
| `onBlur` | 失去焦点后的回调 | `(evt: FocusEvent) => void` | - | - | - |
| `onClick` | 点击触发器后的回调 | `(evt: MouseEvent) => void` | - | - |
| `onKeydown` | `keydown` 事件回调 | `(evt: KeyboardEvent) => void` | - | - | - |
| `onOverlayAfterLeave` | 浮层关闭动画结束后的回调 | `() => void` | - | - | - |

#### ControlTriggerSlots

| 名称 | 说明 | 参数类型 | 备注 |
| --- | --- | --- | --- |
| `suffix` | 自定义后缀 | - | - |
| `clearIcon` | 自定义清除图标 | - | - |
| `trigger` | 自定义全部trigger部分 | `TriggerDefaultSlotParams \| { opened: boolean }` | 使用这个插槽将完全用插槽中的节点作为trigger的根节点，原本的包裹节点不再存在 |
| `default` | 自定义trigger的内容区域 | `TriggerDefaultSlotParams \| { opened: boolean }` | - |
| `overlay` | 自定义浮层的内容 | `{ opened: boolean }` | - |
| `placeholder` | 自定义占位符 | - | - |

```ts
type TriggerDefaultSlotParams = {
  value: any
  borderless: boolean
  disabled: boolean
  readonly: boolean
  focused: boolean
  size: FormSize
  status: ValidateStatus | undefined
  suffix: string | undefined
  suffixRotate: boolean | string | number | undefined
  clearable: boolean
  clearIcon: string
}
```

#### ControlTriggerMethods

| 名称 | 说明 | 参数类型 | 备注 |
| --- | --- | --- | --- |
| `blur` | 移除焦点 | - | - |
| `focus` | 获取焦点 | `(options?: FocusOptions) => void` | - |
