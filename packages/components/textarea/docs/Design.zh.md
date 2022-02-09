## 组件定义

支持输入多行文本信息的输入框。

## 使用场景

在表单配置中，对某配置项输入较长的文案信息。

## 组件构成

| 名称 | 说明  |
| --- | ---  |
| 输入框 | 输入框默认高度根据文案最大长度变化，最大默认高度为3行文案高度。 <br /> 文案输入至最右侧自动转行。 |
| 字数统计（可选）| 展示当前输入字数与最大限制字数，当前输入字数根据用户输入的文案实时变化。 <br /> 仅用于对输入信息有明确长度要求的场景，例如添加描述、备注等。 |
| 拖拽图标（可选） | 长按拖拽图标即可上下拖动，自由变更文本域的高度，高度存在上限。 |

## 组件类型

| 名称 | 说明  |
| --- | ---  |
| 固定高度 | 固定输入框的高度，内容超框后触发滚动条。 |
| 自适应高度 | 当输入信息超出输入框默认高度时，高度自动变化来适配输入的信息。 |

## 组件状态

当存在字数统计时，文本域超出字数限制时进行标红报错。若同时存在其他报错信息，与表单规范一样采用底部文字报错形式。

### 主题变量

| 名称 | `default` | `dark` | 备注 |
| --- | --- | --- | --- |
| `@textarea-font-size-sm` | `@form-font-size-sm` | - | - |
| `@textarea-font-size-md` | `@form-font-size-md` | - | - |
| `@textarea-font-size-lg` | `@form-font-size-lg` | - | - |
| `@textarea-line-height` | `@form-line-height` | - | - |
| `@textarea-padding-horizontal-sm` | `@form-padding-horizontal-sm` | - | - |
| `@textarea-padding-horizontal-md` | `@form-padding-horizontal-md` | - | - |
| `@textarea-padding-horizontal-lg` | `@form-padding-horizontal-lg` | - | - |
| `@textarea-padding-vertical-sm` | `@form-padding-vertical-sm` | - | - |
| `@textarea-padding-vertical-md` | `@form-padding-vertical-md` | - | - |
| `@textarea-padding-vertical-lg` | `@form-padding-vertical-lg` | - | - |
| `@textarea-border-width` | `@form-border-width` | - | - |
| `@textarea-border-style` | `@form-border-style` | - | - |
| `@textarea-border-color` | `@form-border-color` | - | - |
| `@textarea-border-radius` | `@border-radius-md` | - | - |
| `@textarea-color` | `@form-color` | - | - |
| `@textarea-color-secondary` | `@form-color-secondary` | - | - |
| `@textarea-background-color` | `@form-background-color` | - | - |
| `@textarea-placeholder-color` | `@form-placeholder-color` | - | - |
| `@textarea-hover-color` | `@form-hover-color` | - | - |
| `@textarea-active-color` | `@form-active-color` | - | - |
| `@textarea-active-box-shadow` | `@form-active-box-shadow` | - | - |
| `@textarea-disabled-color` | `@form-disabled-color` | - | - |
| `@textarea-disabled-background-color` | `@form-disabled-background-color` | - | - |
| `@textarea-count-bottom` | `1px` | - | - |
| `@textarea-count-right` | `14px` | - | - |
| `@textarea-count-opacity` | `0.9` | - | - |
| `@textarea-count-color` | `@textarea-placeholder-color` | - | - |
| `@textarea-transition-duration` | `@form-transition-duration` | - | - |
| `@textarea-transition-function` | `@form-transition-function` | - | - |
