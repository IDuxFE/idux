---
category: components
type: 数据展示
title: Tag
subtitle: 标签
order: 0
---

进行标记和分类的小标签。

- 用于标记事物的属性和维度。
- 进行分类。

## API

### IxTag

#### TagProps

| 名称 | 说明 | 类型  | 默认值 | 全局配置 | 备注 |
| --- | --- | --- | --- | --- | --- |
| `checkable` | 标签是否可选中 | `boolean` | `false` | ✅ | - |
| `checked` | 标签选中状态 | `boolean` | `false` | - | - |
| `color` | 标签颜色 | `string` | - | - | 内置了 `PresetColor \| StatusColor` 等颜色，也可以传入一个具体的颜色值 |
| `icon` | 标签图标 | `string \| #icon` | - | - | - |
| `shape` | 标签形状 | `round \| rect \| round-rect`  | `round-rect` | ✅ | - |
