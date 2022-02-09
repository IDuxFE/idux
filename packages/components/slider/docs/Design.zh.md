## 组件定义

滑动型输入器，展示当前值和可选范围。

## 使用场景

- 适用于数值点较多且精准度要求不高的场景，如分配带宽等数值选择。  
- 适用于用户更关心已选值到最小值和最大值之间的百分比距离的场景，比如缩放比例尺，从10%到400%。

## 组件构成

| 名称 | 说明  |
| --- | ---  |
| 滑轨 | 设计师可根据实际需求来设定滑轨的长度、最小值/最大值和单位。 |
| 刻度（可选） | 刻度可使用户更轻松地选择滑轨中的特定值。刻度值显示在刻度线下方且不能重叠。如果不需要为每个刻度线标记刻度值，也可以只标记特定刻度的值。 |
| 手柄 | 手柄所在位置为当前选中值。鼠标拖拽后，沿滑轨移动，可更改选中值。 |

## 组件类型

### 按可选择的数量分类

| 名称 | 说明  |
| --- | ---  |
| 单个值选择 | 通过点选来选取范围中的单个值。 |
| 范围选择 | 通过点选最大值和最小值来选取一段数据范围。 |

### 按滑轨数据的连续性分类

| 名称 | 说明  |
| --- | ---  |
| 连续型 | 可自由地选择滑块轨道内的任意节点/区间，通常用于比例选择场景。 |
| 离散型 | 只能选择滑块轨道内的特定节点/区间，例如1-100的范围内，只能选择10的倍数。离散型需在滑动区域设定特定节点作为可选刻度，滑动过程中滑块自动捕捉距离最近的节点。 |

### 主题变量

| 名称 | `default` | `dark` | 备注 |
| --- | --- | --- | --- |
| `@slider-marks-label-color` | `rgba(0, 0, 0, 0.451)` | - | - |
| `@slider-rail-bg` | `@color-graphite-l30` | - | - |
| `@slider-track-bg` | `@color-primary` | - | - |
| `@slider-thumb-bg` | `@color-white` | - | - |
| `@slider-dot-bg` | `@color-white` | - | - |
| `@slider-dot-border` | `2px solid @color-primary` | - | - |
| `@slider-thumb-border` | `2px solid @color-primary` | - | - |
| `@slider-rail-hover-bg` | `#e1e1e1` | - | - |
| `@slider-track-hover-bg` | `@color-primary` | - | - |
| `@slider-thumb-hover-border-color` | `@color-primary` | - | - |
| `@slider-thumb-focus-border-color` | `@color-primary` | - | - |
| `@slider-thumb-focus-box-shadow` | `0 0 0 5px fade(#46a6ff, 12%)` | - | - |
| `@slider-dot-active-border-color` | `@color-primary` | - | - |
| `@slider-marks-label-active-color` | `rgba(0, 0, 0, 0.851)` | - | - |
| `@slider-track-disabled-bg` | `rgba(0, 0, 0, 0.251)` | - | - |
| `@slider-thumb-disabled-bg` | `@color-white` | - | - |
| `@slider-thumb-disabled-border-color` | `rgba(0, 0, 0, 0.251)` | - | - |
| `@slider-dot-disabled-active-border-color` | `rgba(0, 0, 0, 0.251)` | - | - |
| `@slider-thumb-width` | `10px` | - | - |
| `@slider-thumb-height` | `10px` | - | - |
| `@slider-thumb-margin-top` | `-3px` | - | - |
| `@slider-thumb-vertical-margin-left` | `-3px` | - | - |
| `@slider-thumb-vertical-margin-top` | `-6px` | - | - |
