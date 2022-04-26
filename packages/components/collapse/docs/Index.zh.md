---
category: components
type: 数据展示
title: Collapse
subtitle: 折叠面板
order: 0
---

## API

### IxCollapse

#### CollapseProps

| 名称 | 说明 | 类型  | 默认值 | 全局配置 | 备注 |
| --- | --- | --- | --- | --- | --- |
| `v-model:expandedKeys` | 当前展开面板的 key | `(string \| number)[]` | - | - |- |
| `accordion` | 是否开启手风琴模式 | `boolean` | `false` | ✅ | - |
| `borderless` | 是否显示边框 | `boolean` | `false` | ✅ |- |
| `expandIcon` | 自定义展开图标 | `string \| #expandIcon="{key, expanded}"` | `'right'` | ✅ |- |
| `ghost` | 幽灵模式 | `boolean` | `false` | ✅ | 使折叠面板透明且无边框 |

### IxCollapsePanel

| 名称 | 说明 | 类型  | 默认值 | 全局配置 | 备注 |
| --- | --- | --- | --- | --- | --- |
| `key` | 唯一标识符 | `string \| number` | `uid` | - | - |
| `disabled` | 是否禁用该面板 | `boolean` | `false` | - | - |
| `header` | 面板头内容 | `string \| HeaderProps \| #header="{expanded, onClick}"` | - | - |- |

<!--- insert less variable begin  --->
## 主题变量

| 名称 | default | seer | 备注 |
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
<!--- insert less variable end  --->