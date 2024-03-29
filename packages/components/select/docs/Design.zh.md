## 组件定义

选择器用于让用户从一组数据中选择一个或多个值。

## 使用场景

基于实际分辨率数据，我们判断大多数用户都是在大于 1366px 宽度的屏幕中使用我们的界面，因此我们需要保证 1280～2560px 的屏幕范围内有一套统一的栅格来支撑一致的界面体验。以下是在屏幕宽度大于等于 1280px 时所使用的 24 栏栅格系统原则：

## 组件构成

| 名称 | 说明  |
| --- | ---  |
| 选择框 | 用来承载未选时的占位信息和已选时的值。<br /> 删除按钮（可选）：鼠标悬停出现删除按钮，点击即可删除信息。 |
| 选项浮层 | 承载选项的容器，通过操作展开和收起，默认 6.5 个选项的高度。 |

## 组件类型

### 基础类型

| 名称 | 说明  |
| --- | ---  |
| 单项选择框 | 用于从一个列表中选择单个值。 |
| 多项选择框 | 用于从一个列表中选择多个值，分为基础、带全选和选项表格三种形式。 |
| 联动选择框 | 联动打开穿梭框弹窗进行选择，用于从一个复杂数据表中搜索筛选并选择值。 |

## 拓展类型

| 名称 | 说明  |
| --- | ---  |
| 带搜索 | 在选项较多、选项数量会动态变化等的场景中，可以使用搜索功能，帮助缩小选择范围，找到要选择的项。 |
| 选项分组 | 用于与穿梭框等组件联动（通常打开一个弹窗）进行选择。 |
| 带新增和删除选项 | 用于快速新增当前选项列表中不存在，但希望使用的值。 |

## 组件状态

### 选项浮层宽度的溢出

选项浮层的宽度默认与选择框宽度一致，如果选项长度溢出则用”...“截断。

### 选择框宽度的溢出

- 在单选框中，选择框宽度固定，如果选项长度溢出则用”...“截断  
- 在多选框中，对于每一个选项，应设定一个最大宽度，对超出长度的文本进行截断；对于整体，如果无法显示全部选项，则溢出的选项不显示，而是用”+n”来显示剩余的选项数量
