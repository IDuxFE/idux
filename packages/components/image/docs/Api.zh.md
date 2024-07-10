
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
| `container` | 预览窗口容器节点  | `string \| HTMLElement \| () => string \| HTMLElement` | - | ✅ | - |
| `draggable` | 是否可以拖拽 | `boolean` | `true` | ✅ | - |
| `images` | 用于预览的图片链接列表，必选 | `string[]` | `[]` | - | - |
| `loop` | 是否无限循环 | `boolean` | `true` | ✅ | - |
| `maskClosable` | 是否可以通过点击遮罩层关闭预览 | `boolean` | `true` | ✅ | - |
| `zIndex` | 设置预览窗口的 `z-index` | `number` | - | - | - |
| `zoom` | 可缩放的倍数范围 | `number[]` | `[0.5, 2]` | ✅ | - |
