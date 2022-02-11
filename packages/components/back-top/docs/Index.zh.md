---
category: components
type: 其他
title: BackTop
subtitle: 回到顶部
---

## API

### IxBackTop

#### Props

| 参数 | 说明 | 类型 | 默认值 | 全局配置 | 备注 |
| -- | -- | -- | --  | -- | -- |
| `duration` | 回到顶部所需时间（ms） | `number` | `450` |  ✅  | - |
| `target` | 需要监听其滚动事件的元素 | `string \| HTMLElement \| () => string \| HTMLElement` | `window` | - | - |
| `visibilityHeight` | 滚动高度达到此参数值才出现 | `number` | `400`  |  ✅  | - |
| `onClick` | 点击回调事件 | `(evt: MouseEvent) => void` | - | - | - |

#### Slots

| 名称 | 说明 | 参数类型 | 备注 |
|  -- | -- | -- | -- |
|  `default` | 自定义显示内容 | - | - |

<!--- insert less variable begin  --->
## 主题变量

| 名称 | `default` | `dark` | 备注 |
| --- | --- | --- | --- |
| `@back-top-zindex` | `@zindex-l2-base` | - | - |
| `@back-top-height` | `60px` | - | - |
| `@back-top-width` | `60px` | - | - |
| `@back-top-font-size` | `@font-size-3xl` | - | - |
| `@back-top-border-radius` | `50%` | - | - |
| `@back-top-right-gutter` | `15px` | - | - |
| `@back-top-right-xs` | `(@back-top-right-gutter / 2)` | - | - |
| `@back-top-right-sm` | `@back-top-right-gutter` | - | - |
| `@back-top-right-md` | `@back-top-right-gutter * 1.5` | - | - |
| `@back-top-right-lg` | `@back-top-right-gutter * 2` | - | - |
| `@back-top-right-xl` | `@back-top-right-gutter * 3` | - | - |
| `@back-top-bottom` | `50px` | - | - |
| `@back-top-color` | `@color-primary` | - | - |
| `@back-top-hover-color` | `@color-primary-l30` | - | - |
| `@back-top-background-color` | `@color-white` | - | - |
| `@back-top-background-hover-color` | `@color-white` | - | - |
| `@back-top-box-shadow` | `0 2px 8px 0 rgba(30,35,43,0.12)` | - | - |
<!--- insert less variable end  --->