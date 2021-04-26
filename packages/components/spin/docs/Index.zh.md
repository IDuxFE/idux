---
category: components
type: 反馈
title: Spin
subtitle: 加载中遮罩层
cover:
---
提供了数据在加载等待过程中的遮罩层

## 何时使用

当部分区域正在等待异步数据或在呈现过程中，让用户能更好感知数据请求和界面渲染，而且也能阻止用户在数据请求过程中对视图层有其他操作导致一些不必要的错误；

## API

### `ix-spin`

#### props

| 参数 | 说明 |  类型  | 默认值 | 全局配置 | 备注 |
| --- | --- | --- | --- | --- | --- |
|`size` | 控制 icon 和 tip大小 |  `small \| medium \| large`  | `small` | ✅ | - |
|`spinning` | 是否显示加载遮罩层|`boolean`| `true` | - | - |
| `icon`| 加载图标名称 | `string` | `loading`| ✅ | - |
| `tip`| 加载提示文字描述 |  `string`  | `''`| ✅ | - |
| `tipAlign`| 文字描述与加载图标的排列方式 | `vertical \| horizontal` | `vertical`| ✅ | vertical：文字排列在图标下方；horizontal： 文字排列在图标同水平方向的后方 |

#### slots

|名称 | 说明 | 参数类型 | 备注 |
| --- | --- | --- | --- |
|`default` | 需要遮罩的内容区域 | - | - |

### 主题变量

| 变量名 | default 主题| 说明 |
| --- | --- | --- |
| @spin-tip-color | @primary | - |
| @spin-icon-color | @primary | - |
| @spin-font-size-sm | @font-size-md | - |
| @spin-font-size-md | @font-size-lg | - |
| @spin-font-size-lg | @font-size-xl | - |
