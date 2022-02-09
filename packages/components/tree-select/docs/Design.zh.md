## 组件定义

树型选择控件，类似下拉选择，可选数据是一个树形结构。

## 使用场景

当需要进行选择时，下拉框选项内容为树型结构，通常用于公司架构、终端设备，分类目录的选择。

## 组件构成

| 名称 | 说明  |
| --- | ---  |
| 选择框 | 承载所选选项的容器，同时也是下拉面板的触发器。<br />删除按钮（可选）：鼠标悬停出现删除按钮，点击即可删除信息。|
| 功能区（可选） | 下拉框中的功能区域，可针对树选项进行操作；树选择组件默认包含全部收起/展开功能、搜索功能。|
| 树选项 | 展示待选择的树结构内容、节点对象、图标（可选）。|

## 组件类型

| 名称 | 说明  |
| --- | ---  |
| 单项树选择 | 最基础的树结构选择，仅支持选择单个选项。|
| 多项树选择 | 选项为树结构，允许用户从选择面板中选择多个选项；默认多选为复选框勾选，父子层级勾选具有关联性。|

### 主题变量

| 名称 | `default` | `dark` | 备注 |
| --- | --- | --- | --- |
| `@tree-select-font-size-sm` | `@form-font-size-sm` | - | - |
| `@tree-select-font-size-md` | `@form-font-size-md` | - | - |
| `@tree-select-font-size-lg` | `@form-font-size-lg` | - | - |
| `@tree-select-line-height` | `@form-line-height` | - | - |
| `@tree-select-height-sm` | `@form-height-sm` | - | - |
| `@tree-select-height-md` | `@form-height-md` | - | - |
| `@tree-select-height-lg` | `@form-height-lg` | - | - |
| `@tree-select-padding-horizontal-sm` | `@form-padding-horizontal-sm` | - | - |
| `@tree-select-padding-horizontal-md` | `@form-padding-horizontal-md` | - | - |
| `@tree-select-padding-horizontal-lg` | `@form-padding-horizontal-lg` | - | - |
| `@tree-select-padding-vertical-sm` | `@form-padding-vertical-sm` | - | - |
| `@tree-select-padding-vertical-md` | `@form-padding-vertical-md` | - | - |
| `@tree-select-padding-vertical-lg` | `@form-padding-vertical-lg` | - | - |
| `@tree-select-border-width` | `@form-border-width` | - | - |
| `@tree-select-border-style` | `@form-border-style` | - | - |
| `@tree-select-border-color` | `@form-border-color` | - | - |
| `@tree-select-border-radius` | `@border-radius-md` | - | - |
| `@tree-select-color` | `@form-color` | - | - |
| `@tree-select-color-secondary` | `@form-color-secondary` | - | - |
| `@tree-select-background-color` | `@form-background-color` | - | - |
| `@tree-select-placeholder-color` | `@form-placeholder-color` | - | - |
| `@tree-select-hover-color` | `@form-hover-color` | - | - |
| `@tree-select-active-color` | `@form-active-color` | - | - |
| `@tree-select-active-box-shadow` | `@form-active-box-shadow` | - | - |
| `@tree-select-disabled-color` | `@form-disabled-color` | - | - |
| `@tree-select-disabled-background-color` | `@form-disabled-background-color` | - | - |
| `@tree-select-transition-duration` | `@form-transition-duration` | - | - |
| `@tree-select-transition-function` | `@form-transition-function` | - | - |
| `@tree-select-option-font-size` | `@font-size-md` | - | - |
| `@tree-select-option-height` | `@height-md` | - | - |
| `@tree-select-option-margin-left` | `@spacing-md` | - | - |
| `@tree-select-option-padding` | `@spacing-sm` | - | - |
| `@tree-select-option-color` | `@text-color` | - | - |
| `@tree-select-option-disabled-color` | `@text-color-disabled` | - | - |
| `@tree-select-option-active-background-color` | `@color-grey-l50` | - | - |
| `@tree-select-option-selected-color` | `@color-primary` | - | - |
| `@tree-select-option-selected-background-color` | `tint(@color-primary, 90%)` | - | - |
| `@tree-select-option-selected-font-weight` | `@font-weight-xl` | - | - |
| `@tree-select-option-transition` | `background @transition-duration-base @ease-in-out` | - | - |
| `@tree-select-option-group-border` | `@border-width-sm @border-style @border-color` | - | - |
| `@tree-select-option-container-zindex` | `@zindex-l4-3` | - | - |
| `@tree-select-option-container-padding` | `@spacing-sm` | - | - |
| `@tree-select-option-container-background-color` | `@background-color-component` | - | - |
| `@tree-select-option-container-border-radius` | `@border-radius-sm` | - | - |
| `@tree-select-option-container-box-shadow` | `@shadow-bottom-md` | - | - |
| `@tree-select-icon-font-size` | `@font-size-sm` | - | - |
| `@tree-select-icon-margin-right` | `@spacing-xs` | - | - |
| `@tree-select-icon-color` | `@tree-select-placeholder-color` | - | - |
| `@tree-select-icon-hover-color` | `@tree-select-color-secondary` | - | - |
| `@tree-select-icon-background-color` | `@tree-select-background-color` | - | - |
| `@tree-select-multiple-padding` | `@tree-select-padding-vertical-md` | - | - |
| `@tree-select-multiple-item-padding` | `0 @spacing-xs` | - | - |
| `@tree-select-multiple-item-background-color` | `@background-color-base` | - | - |
| `@tree-select-multiple-item-disabled-color` | `@tree-select-disabled-color` | - | - |
| `@tree-select-multiple-item-disabled-border-color` | `@tree-select-border-color` | - | - |
| `@tree-select-multiple-item-border-width` | `@border-width-sm` | - | - |
| `@tree-select-multiple-item-border` | `@tree-select-multiple-item-border-width @border-style @border-color-split` | - | - |
| `@tree-select-multiple-item-border-radius` | `@tree-select-border-radius` | - | - |
| `@tree-select-multiple-item-label-margin-left` | `@spacing-xs` | - | - |
| `@tree-select-multiple-item-remove-icon-font-size` | `@font-size-xs` | - | - |
