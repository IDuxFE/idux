## 组件定义

折叠面板通过对信息的分组和收纳，指引用户递进式的获取信息，使界面保持整洁的同时增加空间的有效利用率。这类组件在导航中大量使用，同时也适合冗长的、无规则的内容管理。

## 使用场景

- 针对列表，查看概览信息后，通过展开/收起引导查看更多内容或执行操作等场景；常用于应用服务、运营服务、资源统计等。  
- 以浏览信息为主要目的，通过折叠将信息分组，有主次的展示给用户，帮助高效获取信息；常用风险测评、主机等详情查看。  
- 一般用于附加的一些高级设置、自定义项或业务中可收起的表单内容。

## 组件构成

| 名称 | 说明  |
| --- | ---  |
| 标题信息 | 主标题表明主体内容信息，根据场景不同会包含图标（可选），相关描述信息（可选） |
| 折叠操作 | 可进行折叠/展开操作的功能图标，操作热区可扩展到文字或列表区域，不同折叠面板放置位置不同 |
| 内容区 | 展示更为详细的信息内容，通过折叠面板进一步查看此内容 |

## 组件类型

| 名称 | 说明  |
| --- | ---  |
| 列表概览折叠 | 针对列表，查看概览信息后，通过展开/收起引导查看更多内容或执行操作等场景；常用于应用服务、运营服务、资源统计等 |
| 信息浏览折叠 | 以浏览信息为主要目的，通过折叠将信息分组，有主次的展示给用户，帮助高效获取信息；常用风险测评、主机等详情查看 |
| 表单项折叠 | 更次级的Tab标签，常用于工具栏针对列表、表格数据筛选和切换；（必要时支持图标+文字） |

### 主题变量

| 名称 | `default` | `dark` | 备注 |
| --- | --- | --- | --- |
| `@collapse-line-height` | `@line-height-base` | - | - |
| `@collapse-font-size` | `@font-size-md` | - | - |
| `@collapse-color` | `@text-color` | - | - |
| `@collapse-background-color` | `@color-grey-l50` | - | - |
| `@collapse-border` | `@border-width-sm @border-style @border-color` | - | - |
| `@collapse-border-radius` | `@border-radius-sm` | - | - |
| `@collapse-panel-header-padding` | `2px @spacing-lg` | - | - |
| `@collapse-panel-header-prefix-font-size` | `@font-size-sm` | - | - |
| `@collapse-panel-header-font-size` | `@font-size-md` | - | - |
| `@collapse-panel-header-font-weight` | `@font-weight-md` | - | - |
| `@collapse-panel-content-background-color` | `@background-color-component` | - | - |
| `@collapse-panel-content-padding` | `@spacing-lg` | - | - |
| `@collapse-panel-content-padding-top-compact` | `@spacing-xs` | - | - |
