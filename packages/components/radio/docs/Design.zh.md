## 组件定义

单选按钮为用户提供了一组互斥的选项，用户仅从两个或多个选项中选择一个选项。

## 使用场景

单选时，且选择项比较少时，需要将选择项都展示出来，使用单选组件。

## 组件类型

| 名称 | 说明  |
| --- | ---  |
| 基础单选 | 默认单选样式，可根据选项情况灵活布局，如选项文本较长可纵向展示，具体布局排列规范请参考视觉。|
| 按钮单选 | 常用于表单快捷单选，选项字数较固定，需要更为突出展示（此样式由视觉根据界面效果选择使用）。|
| 套嵌子内容 | 当选项中包含子内容，点击选中后则展开显示；用于嵌套内容较少、结构简单的场景。|

### 主题变量

| 名称 | `default` | `dark` | 备注 |
| --- | --- | --- | --- |
| `@radio-font-size-sm` | `@form-font-size-sm` | - | - |
| `@radio-font-size-md` | `@form-font-size-md` | - | - |
| `@radio-font-size-lg` | `@form-font-size-lg` | - | - |
| `@radio-line-height` | `@form-line-height` | - | - |
| `@radio-height-sm` | `@form-height-sm` | - | - |
| `@radio-height-md` | `@form-height-md` | - | - |
| `@radio-height-lg` | `@form-height-lg` | - | - |
| `@radio-padding-horizontal-sm` | `@spacing-sm` | - | - |
| `@radio-padding-horizontal-md` | `@spacing-md` | - | - |
| `@radio-padding-horizontal-lg` | `@spacing-lg` | - | - |
| `@radio-border-width` | `@form-border-width` | - | - |
| `@radio-border-style` | `@form-border-style` | - | - |
| `@radio-border-color` | `@form-border-color` | - | - |
| `@radio-border-radius` | `@border-radius-sm` | - | - |
| `@radio-color` | `@form-color` | - | - |
| `@radio-background-color` | `@form-background-color` | - | - |
| `@radio-hover-color` | `@form-hover-color` | - | - |
| `@radio-active-color` | `@form-active-color` | - | - |
| `@radio-focus-color` | `@form-focus-color` | - | - |
| `@radio-focus-box-shadow` | `@form-focus-box-shadow` | - | - |
| `@radio-disabled-color` | `@form-disabled-color` | - | - |
| `@radio-disabled-background-color` | `@form-disabled-background-color` | - | - |
| `@radio-transition-duration` | `@form-transition-duration` | - | - |
| `@radio-transition-function` | `@form-transition-function` | - | - |
| `@radio-transition` | `all @radio-transition-duration @radio-transition-function` | - | - |
| `@radio-inner-zindex` | `@zindex-l1-1` | - | - |
| `@radio-input-top` | `0.2em` | - | - |
| `@radio-box-size` | `16px` | - | - |
| `@radio-box-border-radius` | `@border-radius-full` | - | - |
| `@radio-dot-size` | `@radio-box-size - 8px` | - | - |
| `@radio-label-padding` | `0 @spacing-sm` | - | - |
| `@radio-group-item-margin-right` | `@spacing-sm` | - | - |
