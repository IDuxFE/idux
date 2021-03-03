---
category: components
type: 通用
title: Tag
subtitle: 标签
order: 0
---

进行标记和分类的小标签。

## 何时使用

- 用于标记事物的属性和维度。
- 进行分类。

## API

### ix-tag

#### Props

| 名称 | 说明 | 类型  | 默认值 | 全局配置 | 备注 |
| --- | --- | --- | --- | --- | --- |
| closable | 标签是否可以关闭 | Boolean | false | ✅ | - |
| color | 标签颜色 | String | '#000' | - | red, orange, gold, yellow, canary, prasinous, verdant, green, cyan, sky, blue, admiral, purple, magenta,lime, grey |
| icon | 标签左侧图标 | string | - | - | - |
| checked | 标签选中状态 | Boolean | false | - | - |
| checkAble | 标签是否可选的状态 | Boolean | false | ✅ | - |
| isRound | 是否圓角形狀 | Boolean | false | ✅ | - |

[comment]: <> (| level | 数字等级&#40;正整数&#41;,这个可以优先级放后 | Number | - | ✅ | - |)

#### Emits

| 事件名称 | 说明                 | 回调函数          |
| -------- | -------------------- | ----------------- |
| close    | 关闭时的回调         | (e) => void       |
| change   | 点击标签时触发的回调 | (checked) => void |

#### Slots

| 名称    | 说明              |
| ------- | ---------------- |
| default | tag的text内容 |
| icon    | tag前面的icon内容 |
