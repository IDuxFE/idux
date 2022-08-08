## API

`@idux/cdk/popper` 基于 `@popperjs/core` 对浮层的创建进行了封装.

### usePopper

```ts
export function usePopper(options?: PopperOptions): PopperInstance
```

#### PopperOptions

| 名称 | 说明 | 类型  | 默认值 | 全局配置 | 备注 |
| --- | --- | --- | --- | --- | --- |
| `autoAdjust` | 空间不足时是否自动调整位置 | `boolean` | `true` | - |- |
| `delay` | 延迟显示或隐藏的时间 | `number \| [number \| null, number \| null]` | `0` | - | 为数组时，第一个元素是延迟显示的时间，第二个元素是延迟隐藏的时间 |
| `disabled` | 是否禁用浮层 | `boolean` | `false` | - | - |
| `offset` | 浮层相对目标元素的偏移量 | `[number, number]` | `[0, 0]` | - | 第一个元素是水平偏移量，第二个元素是垂直偏移量 |
| `placement` | 浮层的位置 | `PopperPlacement` | `top` | - | - |
| `trigger` | 浮层的触发方式 | `PopperTrigger` | `hover` | - | - |
| `visible` | 是否显示浮层 | `boolean` | `false` | - | - |
| `strategy` | 浮层的定位策略 | `'absolute' \| 'fixed'` | `absolute` | - | - |
| `modifiers` | 自定义浮层的 `modifier` | `Partial<Modifier>[]` | `[]` | - | 参见[popper.js](https://popper.js.org/docs/v2/modifiers/) |
| `onFirstUpdate` | 浮层创建后的回调 | `(state: Partial<State>) => void` | - | - | 参见[popper.js](https://popper.js.org/docs/v2/lifecycle/#hook-into-the-lifecycle) |

```ts
export declare type PopperPlacement = 'topStart' | 'top' | 'topEnd' | 'rightStart' | 'right' | 'rightEnd' | 'bottomStart' | 'bottom' | 'bottomEnd' | 'leftStart' | 'left' | 'leftEnd'

export type PopperTrigger = 'click' | 'hover' | 'focus' | 'contextmenu' | 'manual'
```

#### PopperInstance

| 名称 | 说明 | 类型  | 默认值 | 全局配置 | 备注 |
| --- | --- | --- | --- | --- | --- |
| `initialize` | 初始化浮层 | `(): void` | - | - | 应该在组件被创建后调用 |
| `show` | 显示浮层 | `(delay?: number): void` | - | - | `delay` 是延迟显示的时间 |
| `hide` | 隐藏浮层 | `(delay?: number): void` | - | - | `delay` 是延迟隐藏的时间 |
| `update` | 更新浮层 | `(options: Partial<PopperOptions>): void` | - | - | - |
| `forceUpdate` | 强制更新浮层 | `(): void` | - | - | - |
| `destroy` | 销毁浮层 | `(): void` | - | - | - |
| `visibility` | 浮层显示状态 | `ComputedRef<boolean>` | -| - | - |
| `placement` | 浮层位置 | `ComputedRef<PopperPlacement>` | - | - | - |
| `triggerRef` | 浮层的触发元素 | `Ref<TE \| undefined>` | - | - |
| `triggerEvents` | 浮层触发元素的事件 | `ComputedRef<PopperTriggerEvents>` | - | - | 需要手动绑定到触发元素上 |
| `popperRef` | 浮层的容器元素 | `Ref<TE \| undefined>` | - | - |
| `popperEvents` | 浮层容器容器的事件 | `ComputedRef<PopperEvents>` | - | - | 需要手动绑定到浮层容器元素上 |
| `arrowRef` | 浮层的箭头元素 | `Ref<HTMLElement \| undefined>` | - | - | - |

```ts

export interface PopperTriggerEvents {
  onClick?(event: Event): void
  onMouseenter?(event: Event): void
  onMouseleave?(event: Event): void
  onFocus?(event: Event): void
  onBlur?(event: Event): void
  onContextmenu?(event: Event): void
}

export interface PopperEvents {
  onMouseenter?(event: Event): void
  onMouseleave?(event: Event): void
}
```
