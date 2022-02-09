## 组件定义

选择器用于让用户从一组数据中选择一个或多个值。

## 使用场景

基于实际分辨率数据，我们判断大多数用户都是在大于 1366px 宽度的屏幕中使用我们的界面，因此我们需要保证 1280～2560px 的屏幕范围内有一套统一的栅格来支撑一致的界面体验。以下是在屏幕宽度大于等于 1280px 时所使用的 24 栏栅格系统原则：

## 组件构成

| 名称 | 说明  |
| --- | ---  |
| 选择框 | 用来承载未选时的占位信息和已选时的值。<br /> 删除按钮（可选）：鼠标悬停出现删除按钮，点击即可删除信息。 |
| 选项浮层 | 承载选项的容器，通过操作展开和收起，默认 6.5 个选项的高度。 |

## 组件类型

### 基础类型

| 名称 | 说明  |
| --- | ---  |
| 单项选择框 | 用于从一个列表中选择单个值。 |
| 多项选择框 | 用于从一个列表中选择多个值，分为基础、带全选和选项表格三种形式。 |
| 联动选择框 | 联动打开穿梭框弹窗进行选择，用于从一个复杂数据表中搜索筛选并选择值。 |

## 拓展类型

| 名称 | 说明  |
| --- | ---  |
| 带搜索 | 在选项较多、选项数量会动态变化等的场景中，可以使用搜索功能，帮助缩小选择范围，找到要选择的项。 |
| 选项分组 | 用于与穿梭框等组件联动（通常打开一个弹窗）进行选择。 |
| 带新增和删除选项 | 用于快速新增当前选项列表中不存在，但希望使用的值。 |

## 组件状态

### 选项浮层宽度的溢出

选项浮层的宽度默认与选择框宽度一致，如果选项长度溢出则用”...“截断。

### 选择框宽度的溢出

- 在单选框中，选择框宽度固定，如果选项长度溢出则用”...“截断  
- 在多选框中，对于每一个选项，应设定一个最大宽度，对超出长度的文本进行截断；对于整体，如果无法显示全部选项，则溢出的选项不显示，而是用”+n”来显示剩余的选项数量

### 主题变量

| 名称 | `default` | `dark` | 备注 |
| --- | --- | --- | --- |
| `@select-font-size-sm` | `@form-font-size-sm` | - | - |
| `@select-font-size-md` | `@form-font-size-md` | - | - |
| `@select-font-size-lg` | `@form-font-size-lg` | - | - |
| `@select-line-height` | `@form-line-height` | - | - |
| `@select-height-sm` | `@form-height-sm` | - | - |
| `@select-height-md` | `@form-height-md` | - | - |
| `@select-height-lg` | `@form-height-lg` | - | - |
| `@select-padding-horizontal-sm` | `@form-padding-horizontal-sm` | - | - |
| `@select-padding-horizontal-md` | `@form-padding-horizontal-md` | - | - |
| `@select-padding-horizontal-lg` | `@form-padding-horizontal-lg` | - | - |
| `@select-padding-vertical-sm` | `@form-padding-vertical-sm` | - | - |
| `@select-padding-vertical-md` | `@form-padding-vertical-md` | - | - |
| `@select-padding-vertical-lg` | `@form-padding-vertical-lg` | - | - |
| `@select-border-width` | `@form-border-width` | - | - |
| `@select-border-style` | `@form-border-style` | - | - |
| `@select-border-color` | `@form-border-color` | - | - |
| `@select-border-radius` | `@border-radius-sm` | - | - |
| `@select-color` | `@form-color` | - | - |
| `@select-color-secondary` | `@form-color-secondary` | - | - |
| `@select-background-color` | `@form-background-color` | - | - |
| `@select-placeholder-color` | `@form-placeholder-color` | - | - |
| `@select-hover-color` | `@form-hover-color` | - | - |
| `@select-active-color` | `@form-active-color` | - | - |
| `@select-active-box-shadow` | `@form-active-box-shadow` | - | - |
| `@select-disabled-color` | `@form-disabled-color` | - | - |
| `@select-disabled-background-color` | `@form-disabled-background-color` | - | - |
| `@select-transition-duration` | `@form-transition-duration` | - | - |
| `@select-transition-function` | `@form-transition-function` | - | - |
| `@select-option-font-size` | `@font-size-md` | - | - |
| `@select-option-height` | `@height-md` | - | - |
| `@select-option-padding` | `@spacing-sm @spacing-md` | - | - |
| `@select-option-color` | `@text-color` | - | - |
| `@select-option-disabled-color` | `@text-color-disabled` | - | - |
| `@select-option-active-background-color` | `@color-graphite-l50` | - | - |
| `@select-option-selected-color` | `@color-primary` | - | - |
| `@select-option-selected-background-color` | `@color-primary-l50` | - | - |
| `@select-option-selected-font-weight` | `@font-weight-xl` | - | - |
| `@select-option-transition` | `background @transition-duration-base @ease-in-out` | - | - |
| `@select-option-label-margin-left` | `@spacing-sm` | - | - |
| `@select-option-group-border` | `@border-width-sm @border-style @border-color` | - | - |
| `@select-option-group-color` | `@color-graphite` | - | - |
| `@select-option-group-margin` | `0 @spacing-md` | - | - |
| `@select-option-group-padding-left` | `0` | - | - |
| `@select-option-grouped-padding-left` | `@spacing-xl` | - | - |
| `@select-option-container-zindex` | `@zindex-l4-3` | - | - |
| `@select-option-container-padding` | `@spacing-sm 0` | - | - |
| `@select-option-container-background-color` | `@background-color-component` | - | - |
| `@select-option-container-border-radius` | `@border-radius-sm` | - | - |
| `@select-option-container-box-shadow` | `@shadow-bottom-md` | - | - |
| `@select-overlay-input-padding` | `0 @spacing-md @spacing-sm` | - | - |
| `@select-icon-font-size` | `@font-size-sm` | - | - |
| `@select-icon-margin-right` | `@spacing-xs` | - | - |
| `@select-icon-color` | `@select-placeholder-color` | - | - |
| `@select-icon-hover-color` | `@select-color-secondary` | - | - |
| `@select-icon-background-color` | `@select-background-color` | - | - |
| `@select-multiple-padding` | `@select-padding-vertical-md` | - | - |
| `@select-multiple-item-padding` | `0 @spacing-xs` | - | - |
| `@select-multiple-item-background-color` | `@color-graphite-l40` | - | - |
| `@select-multiple-item-disabled-color` | `@select-disabled-color` | - | - |
| `@select-multiple-item-disabled-border-color` | `@select-border-color` | - | - |
| `@select-multiple-item-border-width` | `@border-width-sm` | - | - |
| `@select-multiple-item-border` | `@select-multiple-item-border-width @border-style @border-color-split` | - | - |
| `@select-multiple-item-border-radius` | `@select-border-radius` | - | - |
| `@select-multiple-item-label-margin-left` | `@spacing-xs` | - | - |
| `@select-multiple-item-remove-icon-font-size` | `@font-size-xs` | - | - |
| `@select-multiple-item-remove-icon-color` | `@color-graphite` | - | - |
| `@select-multiple-item-remove-icon-hover-color` | `@color-graphite-d10` | - | - |
