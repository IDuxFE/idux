---
category: components
type: 数据展示
order: 0
title: Image
subtitle: 图片
---

## API

### IxImage

图片组件

#### ImageProps

> 继承所有 [img标签属性](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/img)

| 名称 | 说明 | 类型  | 默认值 | 全局配置 | 备注 |
| --- | --- | --- | --- | --- | --- |
| `src` | 图片地址 | `string` | - | - | - |
| `preview` | 是否开启预览 | `boolean` | `true` | ✅ | - |
| `imageViewer` | 预览组件`IxImageViewer`的配置 | `ImageViewerProps` | `{}` | - | - |

#### ImageSlots

| 名称 | 说明 | 参数类型 | 备注 |
| --- | --- | --- | --- |
| `previewIcon` | 预览的icon | - | - |
| `placeholder` | 图片未加载的占位内容 | - | - |
| `fallback` | 加载失败时展示内容 | - | - |

### IxImageViewer

图片预览组件

#### ImageViewerProps

| 名称 | 说明 | 类型  | 默认值 | 全局配置 | 备注 |
| --- | --- | --- | --- | --- | --- |
| `v-model:visible` | 是否可见 | `boolean` | `false` | - | - |
| `v-model:activeIndex` | 当前激活的索引 | `number` | `0` | - | - |
| `images` | 用于预览的图片链接列表，必选 | `string[]` | `[]` | - | - |
| `loop` | 是否无限循环 | `boolean` | `true` | ✅ | - |
| `zoom` | 可缩放的倍数范围 | `number[]` | `[0.5, 2]` | ✅ | - |
| `target` | 预览窗口容器节点 | `string \| HTMLElement \| () => string \| HTMLElement` | - | ✅ | - |
| `maskClosable` | 是否可以通过点击遮罩层关闭预览 | `boolean` | `true` | ✅ | - |

<!--- insert less variable begin  --->
## 主题变量

| 名称 | default | seer | 备注 |
| --- | --- | --- | --- |
| `@image-min-width` | `96px` | - | - |
| `@image-min-height` | `96px` | - | - |
| `@image-layer-z-index` | `@zindex-l1-2` | - | - |
| `@image-object-fit` | `contain` | - | - |
| `@image-preview-background-color` | `rgba(0, 0, 0, 0.5)` | - | - |
| `@image-preview-z-index` | `@zindex-l1-1` | - | - |
| `@image-preview-icon-color` | `@color-white` | - | - |
| `@image-preview-icon-font-size` | `@font-size-xl` | - | - |
| `@image-viewer-background-color` | `rgba(0, 0, 0, 0.45)` | - | - |
| `@image-viewer-z-index` | `@zindex-l4-6` | - | - |
| `@image-viewer-opr-color` | `@color-white` | - | - |
| `@image-viewer-opr-z-index` | `@zindex-l1-1` | - | - |
| `@image-viewer-opr-disabled-color` | `rgba(255, 255, 255, 0.35)` | - | - |
| `@image-viewer-opr-height` | `48px` | - | - |
| `@image-viewer-opr-bottom` | `48px` | - | - |
| `@image-viewer-opr-font-size` | `@font-size-xl` | - | - |
| `@image-viewer-opr-background-color` | `rgba(0, 0, 0, 0.1)` | - | - |
| `@image-viewer-opr-border-radius` | `calc(@image-viewer-opr-height / 2)` | - | - |
| `@image-viewer-opr-item-margin` | `0 24px` | - | - |
| `@image-viewer-preview-img-max-width` | `100%` | - | - |
| `@image-viewer-preview-img-max-height` | `100%` | - | - |
<!--- insert less variable end  --->