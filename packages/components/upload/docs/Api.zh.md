
### IxUpload

#### UploadProps

| 名称 | 说明 | 类型  | 默认值 | 全局配置 | 备注 |
| --- | --- | --- | --- | --- | --- |
| `v-model:files` | 文件列表，必选 | `UploadFile[]` | `[]` | -  | - |
| `accept` | 允许上传的文件类型，详见 [原生input accept](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/input/file) | `string` | - | - | - |
| `action` | 上传文件的地址，必选 | `string \| (file: UploadFile) => Promise<string>`  | - | - | - |
| `dragable` | 是否启用拖拽上传 | `boolean` | `false` | ✅  | - |
| `disabled` | 是否禁用 | `boolean` | `false` | -  | 自定义的触发按钮和自定义的文件列表，disabled需单独处理 |
| `maxCount` | 限制上传文件的数量。当为 1 时，始终用最新上传的文件代替当前文件 | `number` | -  | -  | - |
| `multiple` | 是否支持多选文件，开启后按住 ctrl 可选择多个文件 | `boolean` | `false` | ✅ | - |
| `directory` | 支持上传文件夹（[caniuse](https://caniuse.com/#feat=input-file-directory)） | `boolean` | `false` | ✅ | - |
| `progress` | 进度条配置，见 [ProgressProps](/components/progress/zh#ProgressProps) | `ProgressProps` | - | - | - |
| `name` | 发到后台的文件参数名 | `string` | `file` | ✅  | - |
| `withCredentials` | 请求是否携带cookie | `boolean` | `false` | ✅ | - |
| `customRequest` | 覆盖内置的上传行为，自定义上传实现 | `(option: UploadRequestOption) => Promise<UploadRequestHandler \| void> \| UploadRequestHandler \| void` | 基于XMLHttpRequest实现  | - | - |
| `requestData` | 上传附加的参数  | `Record<string, unknown> \| ((file: UploadFile) => Record<string, unknown> \| Promise<Record<string, unknown>>)` | - | - | - |
| `requestHeaders` | 设置上传请求的请求头  | `UploadRequestHeader` | -  | -  | -  |
| `requestMethod` | 上传请求的http method | `UploadRequestMethod` | `post` | ✅ | - |
| `onSelect` | 选中文件时钩子 | `(file: File[], filteredFiles: FilteredFile[]) => boolean \| File[] \| Promise<boolean \| File[]>` | - | - | 第二个参数代表选择后由于最大数量或者文件类型被过滤掉的文件 |
| `onMaxCountExceeded` | 当选中上传的数量超过最大数量是触发 | `() => void` | - | - | - |
| `onFileStatusChange` | 上传文件改变时的状态 | `(file: UploadFile) => void` | - | - | - |
| `onBeforeUpload`   | 文件上传前的钩子，根据返回结果是否上传<br />返回`false`阻止上传<br />返回`Promise`对象`reject`时停止上传<br />返回`Promise`对象`resolve`时开始上传 | `(file: UploadFile) => boolean \| UploadFile \| Promise<boolean \| UploadFile>` | - | - | -  |
| `onRequestChange` | 请求状态改变的钩子 | `(option: UploadRequestChangeOption) => void` | - | - | - |

```ts
interface FilteredFile {
  file: File
  reason: 'acceptNotMatch' | 'maxCountExceeded'
}
```

### IxUploadFiles

#### UploadFilesProps

| 名称 | 说明 | 类型  | 默认值 | 全局配置 | 备注 |
| --- | --- | --- | --- | --- | --- |
| `type` | 展示的形式 | `text \| image \| imageCard` | `text` | ✅ | - |
| `icon` | 展示的icon   | `Record<file \| preview \| download \| remove \| retry, string \| VNode`>  | `{file: 'paper-clip', remove: 'close', retry: 'edit'}` | ✅ | - |
| `onDownload`   | 点击下载文件时的回调 | `(file: UploadFile) => void` | -  | -  | -  |
| `onPreview`    | 点击文件链接或预览图标时的回调 | `(file: UploadFile) => void` | - | - | - |
| `onRemove`     | 点击移除文件时的回调，返回boolean表示是否允许移除，支持Promise | `(file: UploadFile) => boolean \| Promise<boolean>` | `() => true` | -  | - |
| `onRetry`      | 点击重新上传时的回调 | `(file: UploadFile) => void` | - | - | - |

#### UploadSlots

| 名称       | 说明                     | 参数类型                                 | 备注 |
| ---------- | ------------------------ | ---------------------------------------- | ---- |
| `default`  | 上传组件选择器的展示形式 | `slotProp` | - |
| `list` | 文件列表自定义渲染 | `{abort: (file: UploadFile) => void, upload: (file: UploadFile) => void}` | - |
| `tip`      | 上传提示区  | - | - |

```typescript
// 上传文件
interface UploadFile {
  key: VKey // 唯一标识
  name: string // 文件名
  raw?: File
  status?: 'selected' | 'cancel' | 'uploading' | 'error' | 'success' | 'abort' // 当前状态
  error?: UploadRequestError // 详细的报错信息，比如请求失败时
  errorTip?: string // 小i报错提示文本
  thumbUrl?: string  // 缩略图链接
  percent?: number // 上传进度
  response?: any // 服务端响应内容
}

// 自定义上传方法的参数
interface UploadRequestOption<T = unknown> {
  onProgress?: (event: UploadProgressEvent) => void
  onError?: (error: UploadRequestError) => void
  onSuccess?: (body: T) => void
  name: string
  file: File
  withCredentials?: boolean
  action: string
  requestHeaders?: UploadRequestHeader
  requestMethod: UploadRequestMethod
  requestData?: DataType
}

// 请求状态改变钩子参数
interface UploadRequestChangeOption {
  file: UploadFile
  status: 'loadstart' | 'progress' | 'abort' | 'error' | 'loadend'
  response?: any
  event?: UploadProgressEvent
  error?: UploadRequestError
}
```
