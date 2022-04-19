---
category: components
type: 通用
title: Button
subtitle: 按钮
---

## API

### IxButton

#### ButtonProps

> 当 `mode` 不为 `link` 时，除以下表格之外还支持原生 `button` 元素的[所有属性](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/button)。  
> 当 `mode` 为 `link` 时，除以下表格之外还支持原生 `a` 元素的[所有属性](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/a)。

| 名称 | 说明 | 类型  | 默认值 | 全局配置 | 备注 |
| --- | --- | --- | --- | --- | --- |
| `block` | 将按钮宽度调整为自适应其父元素的宽度 | `boolean` | - | - |- |
| `danger` | 设置危险状态 | `boolean` | - | - |- |
| `disabled` | 设置禁用状态 | `boolean` | - | - |- |
| `ghost` | 设置幽灵状态 | `boolean` | - | - |- |
| `icon` | 设置图标类型 | `string \| #icon` | - | - | `loading` 为 `true` 时无效 |
| `loading` | 设置加载中状态 | `boolean` |  - | - |- |
| `mode` | 设置按钮种类 | `'primary' \| 'default' \| 'dashed' \| 'text' \| 'link'` | `'default'` | - |- |
| `shape` | 设置按钮形状 | `'circle' \| 'round'` | - | - |- |
| `size` | 设置按钮大小 | `'lg' \| 'md' \| 'sm'` | `'md'` | - |- |
| `type` | 原生 `button` 的 `type` 属性 | `'button' \| 'submit' \| 'reset'` | `'button'` | - | 参考 [HTML 标准](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/button#attr-type) |

### IxButtonGroup

#### ButtonGroupProps

| 名称 | 说明 | 类型  | 默认值 | 全局配置 | 备注 |
| --- | --- | --- | --- | --- | --- |
| `mode` | 设置组内按钮种类 | `'primary' \| 'default' \| 'dashed' \| 'text' \| 'link'` | - | - |- |
| `shape` | 设置组内按钮形状 | `'circle' \| 'round'` | - | - |- |
| `size` | 设置组内按钮大小 | `'lg' \| 'md' \| 'sm'` | - | - |- |

<!--- insert less variable begin  --->
## 主题变量

| 名称 | `default` | `dark` | 备注 |
| --- | --- | --- | --- |
| `@button-zindex` | `@zindex-l1-1` | - | - |
| `@button-font-weight` | `@font-weight-md` | - | - |
| `@button-line-height` | `@line-height-base` | - | - |
| `@button-height-xs` | `@height-sm` | - | - |
| `@button-height-sm` | `@height-md` | - | - |
| `@button-height-md` | `@height-md` | - | - |
| `@button-height-lg` | `@height-lg` | - | - |
| `@button-height-xl` | `@height-xl` | - | - |
| `@button-min-width-xs` | `@width-xs` | - | - |
| `@button-min-width-sm` | `@width-sm` | - | - |
| `@button-min-width-md` | `@width-md` | - | - |
| `@button-min-width-lg` | `@width-lg` | - | - |
| `@button-min-width-xl` | `@width-xl` | - | - |
| `@button-font-size-xs` | `@font-size-xs` | - | - |
| `@button-font-size-sm` | `@font-size-sm` | - | - |
| `@button-font-size-md` | `@font-size-md` | - | - |
| `@button-font-size-lg` | `@font-size-md` | - | - |
| `@button-font-size-xl` | `@font-size-lg` | - | - |
| `@button-padding-xs` | `@spacing-sm` | - | - |
| `@button-padding-sm` | `@spacing-md` | - | - |
| `@button-padding-md` | `@spacing-lg` | - | - |
| `@button-padding-lg` | `@spacing-xl` | - | - |
| `@button-padding-xl` | `@spacing-2xl` | - | - |
| `@button-icon-margin-left` | `@spacing-xs` | - | - |
| `@button-border-style` | `@border-style` | - | - |
| `@button-border-size` | `@border-width-sm` | - | - |
| `@button-border-radius` | `@border-radius-sm` | - | - |
| `@button-shadow` | `0 2px 0 rgba(0, 0, 0, 0.015)` | - | - |
| `@button-disable-color` | `@disabled-color` | - | - |
| `@button-disable-background-color` | `@disabled-bg-color` | - | - |
| `@button-disable-border` | `@disabled-border-color` | - | - |
| `@button-primary` | `@color-white` | - | - |
| `@button-primary-background-color` | `@color-primary` | - | - |
| `@button-primary-border-color` | `@color-primary` | - | - |
| `@button-primary-loading-color` | `@color-white` | - | - |
| `@button-primary-loading-background-color` | `@color-primary-l10` | - | - |
| `@button-primary-loading-border` | `@color-primary-l10` | - | - |
| `@button-primary-text-shadow` | `0 -1px 0 rgba(0, 0, 0, 0.15)` | - | - |
| `@button-primary-box-shadow` | `0 2px 0 rgba(0, 0, 0, 0.045)` | - | - |
| `@button-loading-color` | `@color-graphite` | - | - |
| `@button-default-color` | `@text-color` | - | - |
| `@button-default-background-color` | `@background-color-component` | - | - |
| `@button-default-border-color` | `@border-color` | - | - |
| `@button-danger-color` | `@color-error` | - | - |
| `@button-danger-border-color` | `@color-error` | - | - |
| `@button-danger-hover-color` | `@color-error-l10` | - | - |
| `@button-danger-hover-border-color` | `@color-error-l10` | - | - |
| `@button-danger-active-color` | `@color-error-d10` | - | - |
| `@button-danger-active-border-color` | `@color-error-d10` | - | - |
| `@button-danger-background-color` | `@color-error` | - | - |
| `@button-ghost-color` | `@background-color-component` | - | - |
| `@button-ghost-background-color` | `transparent` | - | - |
| `@button-ghost-hover-background-color` | `rgba(255,255,255,0.20)` | - | - |
| `@button-ghost-disabled-background-color` | `rgba(255,255,255,0.40)` | - | - |
| `@button-ghost-border` | `@background-color-component` | - | - |
| `@button-link-color` | `@color-primary` | - | - |
| `@button-link-hover-background-color` | `transparent` | - | - |
| `@button-link-padding` | `0` | - | - |
| `@button-text-color` | `@text-color` | - | - |
| `@button-text-hover-color` | `@color-primary-l10` | - | - |
| `@button-text-active-color` | `@color-primary-d10` | - | - |
| `@button-text-hover-background-color` | `transparent` | - | - |
| `@button-icon-color` | `@color-graphite-d20` | - | - |
| `@button-icon-font-size` | `@font-size-lg` | - | - |
| `@button-icon-color` | `@color-graphite-d20` | - | - |
<!--- insert less variable end  --->
