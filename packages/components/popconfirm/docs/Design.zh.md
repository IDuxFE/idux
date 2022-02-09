## 组件定义

点击元素，弹出气泡式的确认框。

## 使用场景

目标元素的操作需要用户进一步的确认时，在目标元素附近弹出浮层提示，询问用户。相比弹窗对话框更为轻量。

## 组件构成

| 名称 | 说明  |
| --- | ---  |
| 内容区 | 展示让用户确认的信息，主要包含图标、提示内容，提示内容长度超出气泡框宽度，可支持换行显示。 |
| 操作区 | 操作区需要用户进行二次确认的操作；一般使用【确定】和【取消】按钮。整体居右对齐。 |

## 组件状态

- 点击目标元素，浮出气泡框。  
- 点击“确定”执行操作，气泡框收起。  
- 点击“取消”或气泡框以外区域，不执行操作，气泡框收起。

### 主题变量

| 名称 | `default` | `dark` | 备注 |
| --- | --- | --- | --- |
| `@popconfirm-zindex` | `@zindex-l4-2` | - | - |
| `@popconfirm-font-size` | `@font-size-md` | - | - |
| `@popconfirm-color` | `@text-color` | - | - |
| `@popconfirm-background-color` | `@background-color-component` | - | - |
| `@popconfirm-border-radius` | `@border-radius-sm` | - | - |
| `@popconfirm-box-shadow` | `@shadow-bottom-md` | - | - |
| `@popconfirm-wrapper-min-width` | `192px` | - | - |
| `@popconfirm-wrapper-padding` | `@spacing-sm @spacing-lg` | - | - |
| `@popconfirm-title-padding` | `@spacing-sm 0` | - | - |
| `@popconfirm-title-icon-color` | `@color-warning` | - | - |
| `@popconfirm-title-icon-margin-right` | `@spacing-sm` | - | - |
| `@popconfirm-footer-padding` | `@spacing-sm 0` | - | - |
| `@popconfirm-footer-button-margin-left` | `@spacing-sm` | - | - |
