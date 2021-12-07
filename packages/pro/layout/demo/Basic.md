---
title:
  zh: 基本使用
  en: Basic usage
order: 0
---

## zh

最简单的用法。

必须配置的属性有`v-model:activeKey`和`menus`。

- `menus`继承于`@idux/components/menu`的`MenuData`，但更为严格，每一项都需提供唯一`key`
- `LayoutPro`通过`v-model:activeKey`来控制当前激活的菜单项
  - 若配置的`v-model:activeKey`为`null`或`undefined`时，`LayoutPro`会自动查找并激活第一个菜单
  - 若配置的`v-model:activeKey`的菜单节点为`itemGroup`和`sub`类型（参考`@idux/components/menu`的`MenuData`）时，也会自动往下查找并激活第一个菜单

## en

The simplest usage.

The props that must be configured are `v-model:activeKey` and `menus`.

- `menus` inherits from `MenuData` of `@idux/components/menu`, but is more strict. Each item needs to provide a unique `key`
- `LayoutPro` is controlled by `v-model:activeKey` control the currently active menu item
  - if the configured `v-model:activeKey` is `null` or `undefined`, `LayoutPro` will automatically find and activate the first menu
  - if the configured `v-model:activeKey` When the menu node is `itemGroup` and `sub` type (refer to `MenuData` of `@idux/components/menu`), it will also automatically search down and activate the first menu
