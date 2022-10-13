---
title:
  zh: 级联策略
  en: Cascader strategy
order: 8
---

## zh

- `all`: 选中的所有节点都会显示被勾选。
- `parent`: 当一个父节点的所有子节点都被选中时，仅显示此父节点显示被勾选。
- `child`: 仅选中的叶子节点显示被勾选。
- `off`: 关闭级联，选中的所有节点都会显示被勾选，并且父节点可以被单独选中，这是默认的策略。

## en

- `all`: displays all selected nodes.
- `parent`: only a parent node is displayed when all of its children are selected.
- `child`: displays only the selected leaf node.
- `off`:  closes cascading, displays all selected nodes, and the parent node can be selected. This is the default strategy.
