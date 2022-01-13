---
title:
  zh: 文件操作
  en: File operation
order: 13
---

## zh

支持对单文件操作如预览（onPreview）、下载（onDownload）、移除（onRemove）、失败重试（onRetry）。

> IxUpload内置默认预览，上传成功后，若文件file存在thumbUrl可展示图片预览，若配置了`onPreview`则会覆盖默认的预览

## en

Supports single file operations such as preview (onPreview), download (onDownload), removal (onRemove), and failure retry (onRetry).

> IxUpload has a built-in default preview. After the upload is successful, if the file file exists in the thumbUrl, the image preview can be displayed. If `onPreview` is configured, the default preview will be overwritten.
