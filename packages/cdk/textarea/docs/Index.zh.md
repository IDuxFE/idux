---
category: cdk
type: 
order: 0
title: Textarea
subtitle:
---

## API

### useAutoRows

根据输入自动调整 `<textarea>` 的高度

```ts
export type TextareaAutoRows = { minRows: number; maxRows: number }

export interface AutoRowsContext {
  resizeToFitContent: (force: boolean) => void
  lineHeight: ComputedRef<number>
}

/**
 * resize the height of `<textarea>` to fit it's content value
 * 
 * @param textareaRef reference of a textarea element
 * @param autoRows autoRows options
 * @return AutoRowsContext
 */
export function useAutoRows(
  textareaRef: Ref<HTMLTextAreaElement | undefined>,
  autoRows: Ref<boolean | TextareaAutoRows>,
): AutoRowsContext
```

调用后，会再传入的 `autoRows` 改变，或窗口大小调整时调整 `<textarea>` 的高度

同时也可调用返回的 `resizeToFitContent` 来调整 `<textarea>` 的高度

### useLineHeight

获取 `<textarea>` 的单行高度

```ts
/**
 * get a computedRef of line height of `<textarea>`
 * 
 * @param textareaRef reference of a textarea element
 * @return ComputedRef of line height
 */
export function useLineHeight(textareaRef: Ref<HTMLTextAreaElement | undefined>): ComputedRef<number>
```

### measureTextarea

使用一个克隆出的节点来获取Textarea的一些数据，如 `scrollHeight` 等

可以用来获取在自定输入下 `<textarea>` 的高度、宽度等

```ts
/**
 * measure `<textarea>` using a cloned node
 * 
 * @param textarea HTMLTextAreaElement
 * @param measureFn measure function
 * @param cache whether cache the cloned node
 * @return return value of measure function
 */
export function measureTextarea<V>(
  textarea: HTMLTextAreaElement,
  measureFn: (el: HTMLTextAreaElement) => V,
  cache: boolean = true,
): V
```
