---
title:
  zh: 校验文件
  en: Check file
order: 4
---

## zh

- 使用`accept`限制允许上传的文件类型，详见 [原生input accept](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/input/file)
- 使用`onSelect`可以在选中文件时做校验，并是否限制加入到待上传列表
  - 返回`boolean`类型表示是否添加到待上传列表
  - 支持Promise
- 使用`onBeforeUpload`可以在上传前对上传列表做校验，这是校验文件的最后时机
  - 返回`boolean`类型表示是否允许发送上传请求
  - 支持Promise

## en

- Use `accept` to limit the file types allowed to be uploaded, see [Native input accept](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/input/file).
  -Use `onSelect` to check when the file is selected, and whether to restrict it to be added to the list to be uploaded.
  -Return the `boolean` type to indicate whether to add to the upload list.
  -Support Promise.
  -Use `onBeforeUpload` to verify the upload list before uploading. This is the last time to verify the file.
  -Return `boolean` type to indicate whether upload request is allowed.
  -Support Promise.
