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
| `mode` | 设置按钮种类 | `'primary' \| 'default' \| 'dashed' \| 'text' \| 'link'` | `'default'` | - |- |
| `danger` | 设置危险状态 | `boolean` | - | - |- |
| `ghost` | 设置幽灵状态 | `boolean` | - | - |- |
| `disabled` | 设置禁用状态 | `boolean` | - | - |- |
| `loading` | 设置加载中状态 | `boolean` |  - | - |- |
| `size` | 设置按钮大小 | `'lg' \| 'md' \| 'sm'` | `'md'` | - |- |
| `shape` | 设置按钮形状 | `'circle' \| 'round'` | - | - |- |
| `block` | 将按钮宽度调整为自适应其父元素的宽度 | `boolean` | - | - |- |
| `icon` | 设置图标类型 | `string \| #icon` | - | - | `loading` 为 `true` 时无效 |
| `type` | 原生 `button` 的 `type` 属性 | `'button' \| 'submit' \| 'reset'` | `'button'` | - | 参考 [HTML 标准](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/button#attr-type) |

### IxButtonGroup

#### ButtonGroupProps

| 名称 | 说明 | 类型  | 默认值 | 全局配置 | 备注 |
| --- | --- | --- | --- | --- | --- |
| `mode` | 设置组内按钮种类 | `'primary' \| 'default' \| 'dashed' \| 'text' \| 'link'` | - | - |- |
| `size` | 设置组内按钮大小 | `'lg' \| 'md' \| 'sm'` | - | - |- |
| `shape` | 设置组内按钮形状 | `'circle' \| 'round'` | - | - |- |

### 主题变量
