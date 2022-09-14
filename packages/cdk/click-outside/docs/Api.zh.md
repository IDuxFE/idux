## API

### vClickOutside

指令参数可以是一个回调函数，也可以是一个对象 (`ClickOutsideBinding`)。

```html
<IxButton v-clickOutside="onClickOutside">click</IxButton>
<IxButton v-clickOutside="{ handler: onClickOutside, exclude: [] }">click</IxButton>
```

#### ClickOutsideBinding

```typescript
export type ClickOutsideBinding = ClickOutsideHandler | (ClickOutsideOptions & { handler: ClickOutsideHandler })
export type ClickOutsideHandler = (evt: MouseEvent) => void
```

### CdkClickOutside

#### ClickOutsideProps

| 名称  | 说明 | 类型  | 默认值 | 全局配置 | 备注 |
|---| --- | --- | --- | --- | --- |
| `disabled`| 是否禁用  | `boolean` | `false` | - | - |
| `is` | 特定元素或者组件 | `string \| Component` | `'div'`  | - | - |
| `options` | 指定监听的容器元素或者被需要忽略的元素  | `ClickOutsideOptions` | - | - | - |
| `onClickOutside` | 全局点击事件的回调 | - | `ResizableEvent` | - | - |

### useClickOutside

```ts
/**
 * 为除了特定元素外添加全局点击事件
 * 
 * @param target 特定元素，可以是一个 Ref 或 组件实例
 * @param handler 点击事件的回调
 * @param options 指定监听的容器元素或者被需要忽略的元素
 * @returns 返回一个用于停止监听的函数
 */
export function useClickOutside(
  target: MaybeElementRef,
  handler: ClickOutsideHandler,
  options?: ClickOutsideOptions,
): () => void

export interface ClickOutsideOptions {
  /**
   * 容器元素，默认是 window
   */
  container?: MaybeElementRef | Window | Document
  /**
   * 需要忽略的元素，在这些元素上点击，不会触发 handler 回调。
   */
  exclude?: MaybeElementRef[]
}
```
