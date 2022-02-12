---
category: components
type: 数据展示
title: Carousel
subtitle: 轮播图
order: 0
---

## API

### IxCarousel

#### CarouselProps

| 名称 | 说明 | 类型  | 默认值 | 全局配置 | 备注 |
| --- | --- | --- | --- | --- | --- |
| `autoplayTime` | 控制自动轮播的时间间隔 | `number` | `0` | ✅ | 值为`0`时不开启自动轮播 |
| `dotPlacement` | 面板指示点的位置 | `'top' \| 'start' \| 'bottom' \| 'end' \| 'none'` | `'bottom'` | ✅ | 为`'none'`时不显示面板指示点 |
| `showArrow` | 是否显示`prev`、`next`按钮 | `boolean` | `false` | ✅ | - |
| `trigger` | 面板指示点的触发方式 | `'click' \| 'hover'` | `'click'` | ✅ | - |
| `onChange` | 面板切换时会触发的回调函数 | `(prevIndex: number, nextIndex: number) => void` | - | - | - |

#### CarouselSlots

| 名称 | 说明 | 参数类型 | 备注 |
| --- | --- | --- | --- |
| `default` | 面板的内容 | - | - |
| `dot` | 面板指示点 | `{ index: number, isActive: boolean }` | `isActive`表示当前索引是否激活 |
| `arrow` | 自定义切换按钮 | `type: 'prev' \| 'next'` | - |

#### CarseouselMethods

| 名称 | 说明 | 参数类型 | 备注 |
| --- | --- | --- | --- |
| `goTo(slideIndex: number)` | 切换到指定面板 | `(slideIndex: number) => void` | - |
| `next()` | 切换到下一面板 | - | - |
| `prev()` | 切换到上一面板 | - | - |

<!--- insert less variable begin  --->
## 主题变量

| 名称 | `default` | `dark` | 备注 |
| --- | --- | --- | --- |
| `@carousel-arrow-size` | `32px` | - | - |
| `@carousel-arrow-color` | `@color-white` | - | - |
| `@carousel-arrow-spacing` | `@spacing-gutter` | - | - |
| `@carousel-dot-horizontal-width` | `32px` | - | - |
| `@carousel-dot-horizontal-height` | `2px` | - | - |
| `@carousel-dot-vertical-width` | `2px` | - | - |
| `@carousel-dot-vertical-height` | `16px` | - | - |
| `@carousel-dot-background-color` | `@color-white` | - | - |
| `@carousel-dot-gap` | `@spacing-sm` | - | - |
| `@carousel-dot-spacing` | `@spacing-sm` | - | - |
| `@carousel-dot-border-radius` | `2px` | - | - |
| `@carousel-icon-opacity` | `0.3` | - | - |
| `@carousel-icon-hover-opacity` | `0.6` | - | - |
| `@carousel-icon-active-opacity` | `0.8` | - | - |
<!--- insert less variable end  --->