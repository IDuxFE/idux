## 组件定义

复选框用于在一组可选项中进行多项选择时。

## 使用场景

- 用于表单页面中，需要从一组选项中选出多个对象。  
- 单个复选框可表示选中/非选中的状态切换，例如启用某项功能、接受协议条款等。

## 组件类型

| 名称 | 说明  |
| --- | ---  |
| 单复选框 | 单独使用可以表示选中或非选中两种状态的切换，例如接受使用条款、协议等。|
| 复选框组 | 多选项需要选择时使用，可根据选项情况灵活布局，具体布局排列规范请参考视觉。|
| 全选复选框 | 在一组选项中需要快捷进行全选操作，能够显示全选或半选状态；(可根据页面情况灵活布局，如：排一行)。|
| 按钮复选 | 进行快捷的多项选择，选项字数较固定，需要更为突出展示（此样式由视觉根据界面效果选择使用）。|

### 主题变量

| 名称 | `default` | `dark` | 备注 |
| --- | --- | --- | --- |
| `@checkbox-font-size-sm` | `@form-font-size-sm` | - | - |
| `@checkbox-font-size-md` | `@form-font-size-md` | - | - |
| `@checkbox-font-size-lg` | `@form-font-size-lg` | - | - |
| `@checkbox-line-height` | `@form-line-height` | - | - |
| `@checkbox-height-sm` | `@form-height-sm` | - | - |
| `@checkbox-height-md` | `@form-height-md` | - | - |
| `@checkbox-height-lg` | `@form-height-lg` | - | - |
| `@checkbox-padding-horizontal-sm` | `@spacing-sm` | - | - |
| `@checkbox-padding-horizontal-md` | `@spacing-md` | - | - |
| `@checkbox-padding-horizontal-lg` | `@spacing-lg` | - | - |
| `@checkbox-border-width` | `@form-border-width` | - | - |
| `@checkbox-border-style` | `@form-border-style` | - | - |
| `@checkbox-border-color` | `@form-border-color` | - | - |
| `@checkbox-border-radius` | `@border-radius-sm` | - | - |
| `@checkbox-color` | `@form-color` | - | - |
| `@checkbox-background-color` | `@form-background-color` | - | - |
| `@checkbox-hover-color` | `@form-hover-color` | - | - |
| `@checkbox-active-color` | `@form-active-color` | - | - |
| `@checkbox-focus-color` | `@form-focus-color` | - | - |
| `@checkbox-disabled-color` | `@form-disabled-color` | - | - |
| `@checkbox-disabled-background-color` | `@form-disabled-background-color` | - | - |
| `@checkbox-font-size` | `@font-size-md` | - | - |
| `@checkbox-inner-zindex` | `@zindex-l1-1` | - | - |
| `@checkbox-box-size` | `16px` | - | - |
| `@checkbox-box-border-radius` | `@border-radius-sm` | - | - |
| `@checkbox-indeterminate-width` | `8px` | - | - |
| `@checkbox-indeterminate-height` | `2px` | - | - |
| `@checkbox-tick-width` | `(@checkbox-box-size / @font-size-base) * 5px` | - | - |
| `@checkbox-tick-height` | `(@checkbox-box-size / @font-size-base) * 9px` | - | - |
| `@checkbox-tick-border-width` | `@border-width-md` | - | - |
| `@checkbox-label-padding` | `0 @spacing-sm` | - | - |
| `@checkbox-group-item-margin-right` | `@spacing-sm` | - | - |
