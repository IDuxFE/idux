## 组件定义

运用可视化设计元素，将信息以时间先后顺序串联起来。

## 使用场景

用于需要基于时间顺序浏览信息的场景，例如扫描记录、操作日志等。

## 组件构成

| 名称 | 说明  |
| --- | ---  |
| 轴 & 轴节点 | 将各个数据区块以纵线关联，并为每个区块标记一个轴节点。根据业务诉求可为轴节点区分不同的样式来表达对象的不同状态。 |
| 时间 | 时间的显示顺序可正序也可倒序。默认时间放在轴的左边，若需节约横向空间，业务也可将时间轴放置在右边，与节点内容同侧。 |
| 容器（可选） & 节点内容 | 容器可使用卡片、列表等内容容器组件。其内部的内容排布则应遵循对应容器组件的规范。 |

### 主题变量

| 名称 | `default` | `dark` | 备注 |
| --- | --- | --- | --- |
| `@timeline-size` | `@font-size-base` | - | - |
| `@timeline-item-minheight` | `20px` | - | - |
| `@timeline-dot-dia` | `10px` | - | - |
| `@timeline-dot-border` | `@border-width-md solid transparent` | - | - |
| `@timeline-custom-dot-top` | `5px` | - | - |
| `@timeline-custom-dot-padding` | `1px 0` | - | - |
| `@timeline-custom-dot-gap` | `(@timeline-dot-dia / 2)` | - | - |
| `@timeline-content-gap` | `18px` | - | - |
| `@timeline-content-line-height` | `20px` | - | - |
| `@timeline-content-top` | `-5px` | - | - |
| `@timeline-dotted-content-min-height` | `48px` | - | - |
| `@timeline-line-gap` | `((@timeline-dot-dia - @border-width-md) / 2)` | - | - |
| `@timeline-line-border` | `@border-width-md solid #e8e8e8` | - | - |
| `@timeline-reverse-pending-dot-line-top` | `14px` | - | - |
