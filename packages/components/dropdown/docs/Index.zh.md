---
category: components
type: 导航
title: Dropdown
subtitle: 下拉菜单
order: 0
---

通过鼠标悬浮或点击，弹出一组操作菜单。

## 何时使用

- 一组命令合集，根据菜单的 `cid` 来执行不同的操作
- 页面上操作命令过多，用于收纳操作元素。

## API

### ix-dropdown ix-dropdown-button

#### Props

> `ix-dropdown-button`，除以下表格之外还支持 `ix-button-group` 的[所有属性](/components/button/zh#groupprops)。

| 名称 | 说明 | 类型  | 默认值 | 全局配置 | 备注 |
| --- | --- | --- | --- | --- | --- |
| `v-model:visible` | 菜单是否显示 | `boolean` | `false` | - | - |
| `disabled` | 菜单是否禁用 | `boolean` | `false` | - | - |
| `icon` | 右侧的 icon | `string \| v-slot:icon` | - | - | `ix-dropdown-button` 的默认值为 `ellipsis` |
| `overlayClass` | 悬浮层的自定义 `class` | `string` | - | - | - |
| `placement` | 悬浮层的对齐方式 | `OverlayPlacement` | `bottom-start` | ✅ | - |
| `trigger` | 悬浮层触发方式 | `OverlayTrigger` | `hover` | ✅ | - |

#### Slots

| 名称 | 说明 | 参数类型 | 备注 |
| --- | --- | --- | --- |
| `overlay` | 悬浮菜单, 传入一个 `ix-menu` 组件 | - | - |
