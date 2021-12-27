`@idux/cdk/breakpoint` 提供了构建响应式系统的工具, 以响应屏幕尺寸的变化。

## 默认断点

默认提供了 5 个断点：

| 属性 | 说明 |
| --- | --- |
| `xs` | `< 600px` |
| `sm` | `≥ 600px && < 960px` |
| `md` | `≥ 960px && < 1280px` |
| `lg` | `≥ 1280px && < 1720px` |
| `xl` | `≥ 1720px` |

## 自定义断点

可以通过 `BREAKPOINTS_TOKEN` 来修改默认断点。

```ts
import { provide } from 'vue'
import { BREAKPOINTS_TOKEN } from '@idux/cdk/breakpoint'

provide(BREAKPOINTS_TOKEN, { .../* your breakpoints*/ })
```
