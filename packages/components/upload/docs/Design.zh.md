## 组件定义

用于即时上传文件，并将文件从本地计算机上传至远程计算机系统。

## 使用场景

- 在表单页面中上传体积较小的文件，一般可快速完成上传，用户无需长时间等待。
- 若文件体积较大，请使用【选择文件】组件。

## 组件构成

| 名称 | 说明  |
| --- | ---  |
| 上传文件按钮 | 点击触发文件选择弹窗，并默认筛选支持的格式。 |
| 文件显示区 | 明确告知用户上传的状态。例如：上传中、上传失败、上传成功等，已上传的文件支持删除和下载。 |
| 上传提示（可选） | 需明确告知用户上传文件的格式、文件大小、上传数量限制（若可多个）等要求；示例文件下载按钮（可选）。 |

### 主题变量

| 名称 | `default` | `dark` | 备注 |
| --- | --- | --- | --- |
| `@upload-list-margin` | `8px 0 0` | - | - |
| `@upload-border-radius` | `2px` | - | - |
| `@upload-selector-drag-border` | `1px dashed @color-graphite-l20` | - | - |
| `@upload-selector-dragover-border` | `1px dashed @color-blue` | - | - |
| `@upload-list-text-border` | `1px solid @color-graphite-l30` | - | - |
| `@upload-list-name-max-width` | `calc(100% - 74px)` | - | - |
| `@upload-list-image-thumb-width` | `48px` | - | - |
| `@upload-list-image-thumb-height` | `48px` | - | - |
| `@upload-list-image-thumb-margin` | `0 8px 0 0` | - | - |
| `@upload-list-image-margin` | `8px 0 0` | - | - |
| `@upload-list-image-card-height` | `96px` | - | - |
| `@upload-list-image-card-width` | `96px` | - | - |
| `@upload-list-image-card-margin` | `0 8px 8px 0` | - | - |
| `@upload-list-image-card-bg-color` | `@color-black` | - | - |
| `@upload-list-image-card-icon-wrap-width` | `100%` | - | - |
| `@upload-list-image-card-selector-font-size` | `24px` | - | - |
| `@upload-list-image-card-selector-color-hover` | `#458FFF` | - | - |
| `@upload-list-image-card-status-min-width` | `60px` | - | - |
| `@upload-list-image-card-status-progress-margin` | `8px 0 0` | - | - |
| `@upload-file-border-bottom` | `1px solid @color-graphite-l30` | - | - |
| `@upload-icon-wrap-max-width` | `120px` | - | - |
| `@upload-icon-margin` | `0 0 0 16px` | - | - |
| `@upload-icon-file-margin` | `0 8px 0 0` | - | - |
| `@upload-tip-margin` | `8px 0 0` | - | - |
