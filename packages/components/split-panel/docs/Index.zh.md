---
category: components
type: 布局
order: 0
title: SplitPanel
subtitle: 分隔栏
---

## API

### IxSplitPanel

#### SplitPanelProps

| 名称 | 说明 | 类型  | 默认值 | 全局配置 | 备注 |
| --- | --- | --- | --- | --- | --- |
| `vertical` | 是否为垂直方向的分割面板 | `boolean` | `false` | - | `当vertical为false时，所有组件属性中的size代表height，反之代表width` |
| `splitterSize` | 分割线的尺寸 | `number` | `2` | - | - |
| `splitterColor` | 分割线正常状态下的颜色 | `string` | `transparent` | - | - |
| `splitterActiveColor` | 分割线`hover`或者`拖动`状态下的颜色 | `string` | `#e1e5eb` | - | - |
| `onSplitterMousedown` | 分割线mousedown事件 | `(evt: MouseEvent, index: number) => void` |  | - | `index`代表第几条分割线 |
| `onSplitterMouseup` | 分割线mouseup事件 | `(evt: MouseEvent, index: number) => void` | | - | `index`代表第几条分割线 |
| `onSplitterMousemove` | 分割线mousemove事件 | `(evt: MouseEvent, index: number) => void` | | - | `index`代表第几条分割线 |

### IxSplitArea

#### SplitAreaProps

| 名称 | 说明 | 类型  | 默认值 | 全局配置 | 备注 |
| --- | --- | --- | --- | --- | --- |
| `size` | 分割区域的初始尺寸 | `number` | - | - | 默认所有区域平分`SplitPanel`尺寸 |
| `minSize` | 分割区域的最小尺寸 | `number` | `30` | - | 区域能收缩到的最小尺寸 |
| `onTouchedMinSizeChange` | 分割区域触发最小尺寸时回调函数 | `(touched: boolean) => void` | - | - | `touched`为`true`时代表从正常尺寸达到最小尺寸，为`false`代表从最小尺寸回到正常尺寸 |
