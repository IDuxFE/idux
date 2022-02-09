## 组件定义

按钮用于执行一个即时操作。

## 使用场景

使用简单的按钮执行特定操作，例如：新增、编辑、保存、确定，取消。

## 组件类型

### 按样式分类

| 名称 | 说明  |
| --- | ---  |
| 主按钮 | 用于适配一些固定的组合型的输入 |
| 默认按钮 | 用于没有主次之分的一组行动 |
| 虚线按钮 | 常用于添加操作 |
| 文本按钮 | 用于最次级的行动点 |
| 链接按钮 | 用于次要或外链的行动点 |

### 按状态分类

| 名称 | 说明  |
| --- | ---  |
| 危险按钮 | 删除/移动/修改权限等危险操作，一般需要二次确认 |
| 幽灵按钮 | 用于背景色比较复杂的地方，常用在首页/产品页等展示场景 |
| 禁用按钮 | 行动点不可用的时候，一般需要文案解释 |
| 加载中 | 用于异步操作等待反馈的时候，也可以避免多次提交 |

### 按尺寸分类

| 名称 | 说明  |
| --- | ---  |
| 小尺寸 | 最小尺寸的按钮，一般用在下拉框或容器较小的场景中使用 |
| 中尺寸 | 一般用在信息密度较低的注册等页面 |
| 大尺寸 | 登录页或运营类页面使用 |

### 纯图标按钮

仅当图标隐喻易于识别，且在全球具有相同的含义，才使用图标按钮

### 主题变量

| 名称 | `default` | `dark` | 备注 |
| --- | --- | --- | --- |
| `@button-zindex` | `@zindex-l1-1` | - | - |
| `@button-font-weight` | `@font-weight-md` | - | - |
| `@button-line-height` | `@line-height-base` | - | - |
| `@button-height-sm` | `@height-sm` | - | - |
| `@button-height-md` | `@height-md` | - | - |
| `@button-height-lg` | `@height-lg` | - | - |
| `@button-font-size-sm` | `@font-size-md` | - | - |
| `@button-font-size-md` | `@font-size-md` | - | - |
| `@button-font-size-lg` | `@font-size-lg` | - | - |
| `@button-padding-sm` | `@spacing-sm` | - | - |
| `@button-padding-md` | `@spacing-md` | - | - |
| `@button-padding-lg` | `@spacing-lg` | - | - |
| `@button-icon-margin-left` | `@spacing-xs` | - | - |
| `@button-border-style` | `@border-style` | - | - |
| `@button-border-size` | `@border-width-sm` | - | - |
| `@button-border-radius` | `@border-radius-sm` | - | - |
| `@button-shadow` | `0 2px 0 rgba(0, 0, 0, 0.015)` | - | - |
| `@button-disable-color` | `@text-color-disabled` | - | - |
| `@button-disable-background-color` | `@background-color-disabled` | - | - |
| `@button-disable-border-color` | `@border-color` | - | - |
| `@button-primary` | `@color-white` | - | - |
| `@button-primary-background-color` | `@color-primary` | - | - |
| `@button-primary-border-color` | `@color-primary` | - | - |
| `@button-primary-text-shadow` | `0 -1px 0 rgba(0, 0, 0, 0.15)` | - | - |
| `@button-primary-box-shadow` | `0 2px 0 rgba(0, 0, 0, 0.045)` | - | - |
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
| `@button-ghost-border-color` | `@background-color-component` | - | - |
| `@button-link-color` | `@color-primary` | - | - |
| `@button-link-hover-color` | `@color-primary-l10` | - | - |
| `@button-link-active-color` | `@color-primary-d10` | - | - |
| `@button-link-hover-background-color` | `transparent` | - | - |
| `@button-text-color` | `@text-color` | - | - |
| `@button-text-hover-color` | `@color-primary-l10` | - | - |
| `@button-text-active-color` | `@color-primary-d10` | - | - |
| `@button-text-hover-background-color` | `rgba(0, 0, 0, 0.12)` | - | - |
