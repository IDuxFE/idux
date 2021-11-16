---
category: components
type: 反馈
title: Alert
subtitle: 警告提示
cover: 
---

警告提示，展现需要引起用户关注的信息。

何时使用：

- 当需要提供系统级别的信息提示，较重要的平台提示或告警信息，如：系统故障、授权升级等
- 常用于页面内容的补充说明、操作后果提示、功能作用提示等
- 提示信息通常情况下不会自动消失，用户可以主动关闭提示

## API

### IxAlert

#### Props

| 名称 | 说明 | 类型  | 默认值 | 全局配置 | 备注 |
| --- | --- | --- | --- | --- | --- |
| `closable` | 信息提示是否可关闭 | `boolean` | `false` | ✅ |- |
| `closeIcon` | 自定义关闭按钮 | `string \| #closeIcon` | `close` | - | - |
| `description` | 辅助性文字介绍 | `string \| #description` | - | - |- |
| `icon` | 自定义图标 | `string \| #icon` | - | ✅ | 若要隐藏图标则传空串 |
| `showPagination` | 是否开启分页切换效果 | `boolean` | `false` | - | - |
| `type` | 设置提示类型 | `'success' \| 'info' \| 'warning' \| 'error'` | `info` | - |- |
| `title` | 信息提示内容 | `string \| string[] \| #default` | - | - |- |
| `onBeforeClose` | 关闭提示前会触发的回调函数 | `() => boolean \| Promise<boolean>` | - | - | - |
| `onClose` | 关闭提示会触发的回调函数 | `() => void` | - | - | - |
