---
category: cdk
type: 
title: Clipboard
subtitle: 剪贴板
cover: 
---

## API

### useClipboard

```ts
export const useClipboard: () => { copy: (text: string, attempts?: number) => Promise<boolean> }
```

| 属性 | 说明 | 类型  | 默认值 |
| --- | --- | --- | --- |
| `text` | 需要复制的文本 | `string` | - |
| `attempts` | 尝试次数 | `number` | `1` |
