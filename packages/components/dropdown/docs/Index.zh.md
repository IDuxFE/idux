---
category: components
type: 导航
title: Dropdown
subtitle: 下拉菜单
order: 0
---

通过鼠标悬浮或点击，弹出一组操作菜单。

- 一组命令合集，可在列表中进行选择，并执行相应的命令
- 页面上操作命令过多，用于收纳操作元素
- Select 用于选择，而 Dropdown 是命令集合

## API

### IxDropdown

#### DropdownProps

| 名称 | 说明 | 类型  | 默认值 | 全局配置 | 备注 |
| --- | --- | --- | --- | --- | --- |
| `v-model:visible` | 菜单是否显示 | `boolean` | - | - | - |
| `autoAdjust` | 悬浮层被遮挡时自动调整位置 | `boolean` | `true` | ✅ | - |
| `destroyOnHide` | 隐藏时是否销毁浮层 | `boolean` | `false` | ✅ | - |
| `disabled` | 菜单是否禁用 | `boolean` | `false` | - | - |
| `offset` | 悬浮层位置偏移量 | `[number, number]` | `[0,8]` | ✅ | - |
| `placement` | 悬浮层的对齐方式 | `PopperPlacement` | `bottomStart` | ✅ | - |
| `showArrow` | 是否显示箭头 | `boolean` | `false` | ✅ | - |
| `target` | 浮层容器节点 | `string \| HTMLElement` | `ix-dropdown-container` | ✅ | 为 `string` 时，会在 `document.body` 中创建一个 `div` |
| `trigger` | 悬浮层触发方式 | `PopperTrigger` | `hover` | ✅ | - |

#### DropdownSlots

| 名称 | 说明 | 参数类型 | 备注 |
| --- | --- | --- | --- |
| `overlay` | 悬浮菜单, 传入一个 `IxMenu` 组件 | - | - |
