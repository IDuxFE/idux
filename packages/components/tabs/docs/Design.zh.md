## 组件定义

- Tabs标签页包含一系列选项卡，用户可以通过每个选项卡在不同任务、视图、模式之间切换，它具有全局导航的作用，或用作过滤器筛选。  
- 将区域内容进行合理的收纳和展现，让界面信息结构更清晰。

## 使用场景

- 用户能够清晰了解页面结构，在不同对象之间进行切换或导航，查看对象包含内容。  
- 用户在查看数据信息时，通过筛选切换特定属性或类型，过滤列表、表格中数据信息。

## 组件类型

| 名称 | 说明  |
| --- | ---  |
| 卡片Tabs | 展示切换页面整体结构和内容，常用于容器顶部，默认选中第一项。 |
| 下划线Tabs | 切换页面内对象信息，和其他内容结合出现。常用于容器内部。 |
| 分段器Tabs | 更次级的Tab标签，常用于工具栏针对列表、表格数据筛选和切换；（必要时支持图标+文字）。 |

### 主题变量

| 名称 | `default` | `dark` | 备注 |
| --- | --- | --- | --- |
| `@tabs-selected-color` | `@color-primary` | - | - |
| `@tabs-hover-color` | `@color-primary-l10` | - | - |
| `@tabs-active-color` | `@color-primary-d10` | - | - |
| `@tabs-disabled-color` | `@color-graphite-l10` | - | - |
| `@tabs-nav-background-color` | `@color-white` | - | - |
| `@tabs-nav-border-color` | `@color-graphite-l20` | - | - |
| `@tabs-segment-nav-disabled-background-color` | `@color-graphite-l40` | - | - |
| `@tabs-segment-nav-primary-active-background-color` | `@color-primary` | - | - |
| `@tabs-segment-nav-primary-active-text-color` | `@color-white` | - | - |
| `@tabs-segment-nav-height` | `32px` | - | - |
| `@tabs-card-nav-tab-background-color` | `@color-graphite-l50` | - | - |
| `@tabs-card-nav-tab-selected-background-color` | `@color-white` | - | - |
| `@tabs-nav-tab-padding` | `0 16px` | - | - |
| `@tabs-nav-tab-height` | `40px` | - | - |
| `@tabs-nav-tab-text-color` | `@color-graphite-d40` | - | - |
| `@tabs-nav-bar-color` | `@color-primary` | - | - |
| `@tabs-nav-bar-height` | `2px` | - | - |
| `@tabs-nav-pre-next-width` | `20px` | - | - |
| `@tabs-border-radius` | `2px` | - | - |
| `@tabs-pane-min-width` | `72px` | - | - |
| `@tabs-pane-padding` | `16px` | - | - |
