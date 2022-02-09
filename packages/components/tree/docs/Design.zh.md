## 组件定义

在信息量大的情况下，用于对信息进行分级归纳展示，通常配合表格数据或详情数据等一同使用，常用于用户信息/资产管理等场景。

## 使用场景

1. 层级关系：对数据进行多层级的分类展示，例如人员/资产的组织结构。
2. 文件夹分类：数据量大的情况下，对数据进行分组和统计展示，例如策略管理。
3. 总分关系：数据概览和详情的关系，例如一些轻量的安全事件的汇总和详情在一个页面展示时。

### 主题变量

| 名称 | `default` | `dark` | 备注 |
| --- | --- | --- | --- |
| `@tree-node-prefix` | `~'@{tree-prefix}-node'` | - | - |
| `@tree-background` | `@background-color-component` | - | - |
| `@tree-background-focused` | `@background-color-selected-light` | - | - |
| `@tree-box-shadow-size` | `2px` | - | - |
| `@tree-box-shadow-color` | `@color-primary-l20` | - | - |
| `@tree-node-disabled-color` | `@text-color-disabled` | - | - |
| `@tree-node-hover-background-color` | `@color-graphite-l50` | - | - |
| `@tree-node-selected-background-color` | `@color-graphite-l40` | - | - |
| `@tree-node-line-width` | `1px` | - | - |
| `@tree-node-line-border` | `1px dashed @border-color` | - | - |
| `@tree-node-padding-vertical` | `(@spacing-xs / 2)` | - | - |
| `@tree-node-checkbox-margin` | `0 @spacing-sm 0 @spacing-xs` | - | - |
| `@tree-node-content-height` | `@height-sm` | - | - |
| `@tree-node-content-label-padding` | `0 @spacing-xs` | - | - |
| `@tree-node-content-label-highlight-color` | `@color-primary` | - | - |
