---
category: components
type: 通用
title: Button
subtitle: 按钮
cover: 
---

按钮用于开始一个即时操作。

## 何时使用

标记了一个（或封装一组）操作命令，响应用户点击行为，触发相应的业务逻辑。

我们共有 5 种按钮。

- 主按钮：用于主行动点，一个操作区域只能有一个主按钮。
- 默认按钮：用于没有主次之分的一组行动点。
- 虚线按钮：常用于添加操作。
- 文本按钮：用于最次级的行动点。
- 链接按钮：用于次要或外链的行动点。

以及 4 种状态属性与上面配合使用。

- 危险：删除/移动/修改权限等危险操作，一般需要二次确认。
- 幽灵：用于背景色比较复杂的地方，常用在首页/产品页等展示场景。
- 禁用：行动点不可用的时候，一般需要文案解释。
- 加载中：用于异步操作等待反馈的时候，也可以避免多次提交。

## API

### `ix-button`

> 当 `mode` 不为 `link` 时，除以下表格之外还支持原生 `button` 元素的[所有属性](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/button)。
> 当 `mode` 为 `link` 时，除以下表格之外还支持原生 `a` 元素的[所有属性](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/a)。

| 属性 | 说明 | 类型  | 全局配置| 默认值| 备注 |
| --- | --- | --- | --- | --- | --- |
| `mode` | 设置按钮种类 | `primary\|default\|dashed\|text\|link` | `default` | - |- |
| `danger` | 设置危险状态 | `boolean` | - | - |- |
| `ghost` | 设置幽灵状态 | `boolean` | - | - |- |
| `disabled` | 设置禁用状态 | `boolean` | - | - |- |
| `loading` | 设置加载中状态 | `boolean` |  - | - |- |
| `size` | 设置按钮大小 | `large\|medium\|small` | `medium` | - |- |
| `shape` | 设置按钮形状 | `circle\|round` | - | - |- |
| `block` | 将按钮宽度调整为自适应其父元素的宽度 | `boolean` | - | - |- |
| `icon` | 设置图标类型 | `string` | - | - | `loading` 为 `true` 时无效 |

### `ix-button-group`

| 属性 | 说明 | 类型  | 全局配置| 默认值| 备注 |
| --- | --- | --- | --- | --- | --- |
| `mode` | 设置组内按钮种类 | `primary\|default\|dashed\|text\|link` | - | - |- |
| `size` | 设置组内按钮大小 | `large\|medium\|small` | - | - |- |
| `shape` | 设置组内按钮形状 | `circle\|round` | - | - |- |

### 主题变量

| 变量名 | default 主题| 说明 |
| --- | --- | --- |
| @button-font-weight | @font-weight-md | - |
| @button-line-height | @line-height-md | - |
| @button-height-sm | @height-sm | - |
| @button-height-md | @height-md | - |
| @button-height-lg | @height-lg | - |
| @button-font-size-sm | @font-size-sm | - |
| @button-font-size-md | @font-size-sm | - |
| @button-font-size-lg | @font-size-md | - |
| @button-padding-sm | @padding-xs | - |
| @button-padding-md | @padding-md | - |
| @button-padding-lg | @padding-lg | - |
| @button-icon-margin-left | @margin-xs | - |
| @button-border-style | @border-style | - |
| @button-border-size | @border-size-sm | - |
| @button-border-radius | @border-radius-sm | - |
| @button-disable-opacity | 0.4 | - |
| @button-shadow | 0 2px 0 rgba(0, 0, 0, 0.015) | - |
| @button-primary-color | @white | - |
| @button-primary-bg | @primary-color | - |
| @button-primary-text-shadow | 0 -1px 0 rgba(0, 0, 0, 0.15) | - |
| @button-default-color | @text-color | - |
| @button-default-bg | @component-background | - |
| @button-default-border | @border-color | - |
| @button-danger-color | @error-color | - |
| @button-danger-bg | @error-color | - |
| @button-ghost-color | @component-background | - |
| @button-ghost-color | transparent | - |
| @button-ghost-border | @component-background | - |
| @button-link-color | @primary-color | - |
| @button-link-hover-bg | transparent | - |
| @button-text-color | @text-color | - |
| @button-text-hover-bg | rgba(0, 0, 0, 0.12) | - |
