## 组件定义

告警提示，展现需要引起用户关注的信息。

## 使用场景

当需要提供系统级别的信息提示，较重要的平台提示或告警信息，如：系统故障、授权升级等。  
常用于页面内容的补充说明、操作后果提示、功能作用提示等。

## 组件构成

| 名称 | 说明  |
| --- | ---  |
| 图标（可选） | 可以在警告提示的文字前添加图标，用以明示当前信息状态。 |
| 提示信息 | 展示提示信息的内容，长度超出提示条显示宽度，可支持换行。 |
| 操作链接（可选） | 可以在警告提示的文字后添加操作指引。 |
| 关闭按钮 | 点击后关闭警告提示（如警告提示未解除情况下关闭警告，重新登录仍会出现提示信息）。 |

## 组件类型

| 名称 | 说明  |
| --- | ---  |
| 全局提示 | 当需要提供系统级别的信息提示，较重要的平台提示或告警信息，置于页面顶部。 |
| 局部提示 | 放置于页面内，针对页面内容的补充说明、操作后果提示、功能作用等进行提示。 |

### 主题变量

| 名称 | `default` | `dark` | 备注 |
| --- | --- | --- | --- |
| `@alert-success-color` | `@color-success-d10` | - | - |
| `@alert-info-color` | `@color-info-d10` | - | - |
| `@alert-warning-color` | `@color-warning-d10` | - | - |
| `@alert-error-color` | `@color-error-d10` | - | - |
| `@alert-success-background-color` | `@color-success-l50` | - | - |
| `@alert-info-background-color` | `@color-info-l50` | - | - |
| `@alert-warning-background-color` | `@color-warning-l50` | - | - |
| `@alert-error-background-color` | `@color-error-l50` | - | - |
| `@alert-color` | `@text-color` | - | - |
| `@alert-color-secondary` | `@text-color-secondary` | - | - |
| `@alert-disabled-color` | `@disabled-color` | - | - |
| `@alert-font-size` | `@font-size-md` | - | - |
| `@alert-line-height` | `@line-height-base` | - | - |
| `@alert-border-radius` | `@border-radius-sm` | - | - |
| `@alert-margin-bottom` | `@spacing-lg` | - | - |
| `@alert-padding` | `@spacing-sm @spacing-lg` | - | - |
| `@alert-icon-margin-right` | `@spacing-sm` | - | - |
| `@alert-icon-font-size-with-description` | `@font-size-xl` | - | - |
| `@alert-icon-margin-right-with-description` | `@spacing-lg` | - | - |
| `@alert-title-font-size-with-description` | `@font-size-lg` | - | - |
| `@alert-title-margin-bottom-with-description` | `@spacing-xs` | - | - |
| `@alert-pagination-icon-padding` | `0 @spacing-xs` | - | - |
| `@alert-action-margin-left` | `@spacing-lg` | - | - |
| `@alert-transition-duration` | `@transition-duration-base` | - | - |
