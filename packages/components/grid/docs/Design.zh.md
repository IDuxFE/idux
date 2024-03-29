## 组件定义

栅格可以有效的保证页面的一致性、逻辑性、加强团队协作和统一。

## 构成方式

一个栅格系统主要由【Container 容器】【Columns 列宽】【Gutters 水槽】【Margin 单侧页边距】四部分组成。

| 名称 | 说明  |
| --- | ---  |
| Container容器 | 指的是我们需要布局信息的版面区域，一般为整个屏幕，或排除固定浮动区域的其他部分。栅格系统的其他三大元素都要基于该容器的大小去计算。 |
| Columns列宽 | 一般指的是纵向分割空间中较宽松的部分，常用与放置主要信息，其边界对应着模块化信息 Box 的外边框。 |
| Gutters水槽 | 水槽处于 Columns 之间，用于放置留白空间，以实现版式呼吸感及分割信息元素，也就是间距。Gutters 是专门赋予其特殊值的栅格要素，根据布局规则将其定义为 8、16、24 等 4 倍 px 值。 |
| Margin 单侧页边距 | 指距离容器两侧的出血间距 |

## 使用场景

基于实际分辨率数据，我们判断大多数用户都是在大于 1366px 宽度的屏幕中使用我们的界面，因此我们需要保证 1280～2560px 的屏幕范围内有一套统一的栅格来支撑一致的界面体验。以下是在屏幕宽度大于等于 1280px 时所使用的 24 栏栅格系统原则：

| 名称 | 说明  |
| --- | ---  |
| 1920px场景 | 水槽始终是16px，单侧页边距在小于 1920px 时固定为 16px，大于等于 1920px 时，人眼会与屏幕保持更远的距离，为保证视觉比例相近，页边距也相应扩大为固定24px。 |
| 1366px场景 | 水槽始终是16px，该场景作为设计基准，1920px 则用于适配场景/大屏场景，1280px 作为最小的兼容值。 |
| <1280px场景 | 水槽始终是16px，浏览器宽度＜适配的最小屏幕，内容宽度不再缩放，浏览器出现滚动条。 |

## 栅格分栏

| 名称 | 说明  |
| --- | ---  |
| 均等分栏 | 均等分栏建议：数量为二、三、四、六、八栏。 |
| 两栏 | 两栏常用比例 1:1（均分）、2:8、3:7、4:6，就近对应 24 栅格，允许自定义比例，比如 6 格 : 18 格（即 1 : 3）、 8 格 : 16 格（即 1 : 2）等。 |
| 三栏 | 三栏比例可参考 1:1:1（均分）、1:1:2 、1:1:4、1:2:3 。允许自定义比例，按比例分 n 栏，同理。 |
