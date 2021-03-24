---
category: cdk
type: 
title: Clipboard
subtitle: 剪贴板
cover: 
---

对系统剪贴板进行了简单封装，方便使用。

## 何时使用

用于对文本的复制。

对于简单的文本可以直接复制，但是对于较长的文本，浏览器需要时间来填充中间textarea元素并复制内容。在这种情况下，直接调用可能会失败，因此可以通过传入 `attempts` 进行多次尝试。

## API

### `useClipboard`

```ts
export const useClipboard: () => { copy: (text: string, attempts?: number) => Promise<boolean> }
```

| 属性 | 说明 | 类型  | 默认值 |
| --- | --- | --- | --- |
| `text` | 需要复制的文本 | `string` | - |
| `attempts` | 尝试次数 | `number` | `1` |
