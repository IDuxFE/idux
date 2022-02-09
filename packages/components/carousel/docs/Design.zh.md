## 组件定义

轮播组件，就是以幻灯片的方式，在页面中横向展示诸多内容的组件。

## 使用场景

- 通常用于一组图片或卡片的轮播，适合用于空间不足的情况。  
- 轮播内容相互独立，前后在内容以及数据上都不存在逻辑关系。

## 组件类型

轮播分为定位点和箭头两种样式，根据业务需要可结合使用。

| 名称 | 说明  |
| --- | ---  |
| 单图轮播-定位点 | 定位点展示轮播图的数量和当前定位，支持点击任意定位点做跳转，且默认支持自动播放。 |
| 单图轮播-箭头 | 点击箭头左右切换轮播图，当切换到最左/最右侧时禁用对应箭头。在单图切换场景下，箭头放置在轮播图内侧。 |
| 多图轮播-定位点 | 在一个轮播面板中展示多个图，定位点放置在内容的下方（外侧），且默认支持自动播放。 |
| 多图轮播-箭头 | 在一个轮播面板中展示多个图，箭头放置在内容的左右侧（外侧）。 |

### 主题变量

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
