## 组件定义

需要用户处理事务，又不希望跳转页面以致打断工作流程时，可以使用 `IxModal` 在当前页面正中打开一个浮层，承载相应的操作。

另外当需要一个简洁的对话框询问或提示用户时，可以使用精心封装好的 `useModal` 等方法。

推荐使用封装好的组件 (`Component`) 作为 `IxModal` 的默认插槽，或 `useModal` 的 `content` 参数，这样 `Component` 内的逻辑可以完全隔离、并且可以做到随时复用。

在 `Component` 中可以注入 `MODAL_TOKEN`, 以获取对话框组件的方法，用于控制对话框的行为。

## 使用场景

- 用于关键信息展示或录入，用户在执行操作时，唤出对话框时会中断用户当前的任务流程，建议谨慎使用避免对用户过度干扰。  
- 当显示错误、警告、异常、成功等状态或消息提示，需要让用户确认信息或作出决定。  
- 用于严重影响业务的操作进行二次确认，例如系统重启。常规操作的二次确认可使用轻量化的【气泡确认框】组件。

## 组件构成

| 名称 | 说明  |
| --- | ---  |
| 标题 | 表明弹窗主体信息，通用格式：操作+对象；例如：删除日志、重启设备；如果没有明确的“操作”，就用通用的“提示”“警告”“通知”。 |
| 内容区 | 可包含图标、文字描述、表单、表格、通知等内容。 |
| 操作按钮 | 按钮根据弹窗文案确定使用一个或两个按钮，需用户确认操作，一般使用【确定】和【取消】按钮。仅提示异常或信息提示，一般使用单个按钮。 |
| 关闭按钮（可选） | 点击可关闭弹窗。 |
| 模态层 | 黑色蒙层覆盖全页面，蒙层下方的页面内容不响应滚动和点击。 |

## 组件类型

| 名称 | 说明  |
| --- | ---  |
| 提示弹窗 | 用于状态消息的提示，包含“通知、成功、警告、错误”四种状态，或信息的二次确认。 |
| 功能弹窗 | 支持信息展示或录入，内容可包含表单、表格、树等组件内容。 |

- 提示弹窗

包含“通知、成功、警告、错误”四种状态。

- 功能弹窗

作为表单的弹窗底部的按钮常用操作按钮放置弹窗右侧，相关业务操作可放置弹窗左侧。

## 组件状态

### 模态弹窗

弹窗使用模态形式，默认点击黑色模态蒙层成不可关闭弹窗。

### 内容溢出

对话框限定宽度，根据内容适应高度，若正文内容超过对话框的最大高度，内容部分可响应垂直滚动，滚动时标题和行动按钮保持固定。对话框内容不可以支持横向滚动。

### 主题变量

| 名称 | `default` | `dark` | 备注 |
| --- | --- | --- | --- |
| `@modal-max-width` | `calc(100vw - 32px)` | - | - |
| `@modal-font-size` | `@font-size-md` | - | - |
| `@modal-line-height` | `@line-height-base` | - | - |
| `@modal-background-color` | `@background-color-component` | - | - |
| `@modal-box-shadow` | `@shadow-bottom-md` | - | - |
| `@modal-border-radius` | `@border-radius-md` | - | - |
| `@modal-header-padding` | `@spacing-lg @spacing-xl @spacing-sm` | - | - |
| `@modal-body-padding` | `@spacing-sm @spacing-xl` | - | - |
| `@modal-footer-padding` | `@spacing-sm @spacing-xl @spacing-lg` | - | - |
| `@modal-footer-button-margin-left` | `@spacing-sm` | - | - |
| `@modal-footer-min-height` | `64px` | - | - |
| `@modal-body-title-font-size` | `@font-size-lg` | - | - |
| `@modal-body-title-font-weight` | `@font-weight-xl` | - | - |
| `@modal-body-title-margin-bottom` | `@spacing-sm` | - | - |
| `@modal-body-title-color` | `@text-color` | - | - |
| `@modal-body-content-font-size` | `@modal-font-size` | - | - |
| `@modal-body-content-color` | `@text-color` | - | - |
| `@modal-body-content-padding` | `0` | - | - |
| `@modal-body-icon-font-size` | `48px` | - | - |
| `@modal-body-icon-margin` | `0 @spacing-lg` | - | - |
| `@modal-body-confirm-color` | `@color-warning` | - | - |
| `@modal-body-info-color` | `@color-info` | - | - |
| `@modal-body-success-color` | `@color-success` | - | - |
| `@modal-body-warning-color` | `@color-warning` | - | - |
| `@modal-body-error-color` | `@color-error` | - | - |
| `@modal-body-typed-padding` | `0 @spacing-sm @spacing-xl` | - | - |
| `@modal-max-width-screen-sm` | `calc(100vw - 16px)` | - | - |
| `@modal-margin-screen-sm` | `@spacing-sm auto` | - | - |
