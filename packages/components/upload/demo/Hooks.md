---
title:
  zh: 钩子
  en: Hook
order: 9
---

## zh

提供多种钩子以扩展功能。

- `onSelect`：在选中文件时
  - 返回`boolean`类型表示是否添加到待上传列表
  - 支持对原文件修改返回新的`File`文件
  - 支持Promise
- `onBeforeUpload`：在上传请求前
  - 返回`boolean`类型表示是否允许发送上传请求
  - 允许对原`UploadFile`类型文件进行修改提交上传
  - 支持Promise，`resolve`时开始上传，`reject`停止
- `onFileStatusChange`：文件状态改变时
  - 可通过参数中`status`得知当前文件状态
- `onRequestChange`：上传请求状态改变时
  - 可通过参数中`status`得知当前请求状态

## en

Provide a variety of hooks to extend the functionality.
-`onSelect`: When the file is selected

- Return the `boolean` type to indicate whether to add to the upload list
- Support to modify the original file to return to the new `File` file
- Support Promise
-`onBeforeUpload`: before upload request
- Return `boolean` type to indicate whether upload request is allowed
- Allow to modify and upload files of the original `UploadFile` type
- Support Promise
-`onFileStatusChange`: When the file status changes
- The current file status can be known through the `status` in the parameter
-`onRequestChange`: When the upload request status changes
- The current request status can be known through the `status` in the parameter
