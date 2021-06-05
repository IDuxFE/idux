---
category: components
type: 导航
title: Steps
subtitle: 步骤条
single: true
---

引导用户按照流程完成任务的导航条。

## 何时使用

当任务复杂或者存在先后关系时，将其分解成一系列步骤，从而简化任务。

例如： 物流进展，工单进展等。

## API

### ix-steps

#### StepsProps

| 名称 | 说明 | 类型 | 默认值 | 全局配置 | 备注 |
| ---| --- | --- | --- | --- | --- |
`v-model:active` | 指定步骤条当前的活跃节点，从 0 开始计算 | `number` | 0 | - | - |
`clickable` | 步骤条是否可点击 | `boolean` | `false` | - | - |
`direction` | 指定步骤条的方向 | `horizontal \| vertical` | `horizontal` | - | - |
`placement` | 指定步骤条节点附带的标签放置的位置 | `horizontal \| vertical` | `horizontal` | -| - |
`percent` | 当前活跃节点的进度 | `number` | 0 | - | 取值是0-100 |
`progressDot` | 指定步骤条是否为点状步骤条| `boolean \| v-slot:progressDot` | `false` | - | 使用slot的话，会传入当前节点对象{index, status, title, subTitle,description, prefixCls} |
`size` | 指定步骤条节点的大小 | `medium\| small` | `medium` | ✅ | - |
`status` | 指定步骤条节点的状态 | `wait \| process \| finish \| error` | `process` | - | - |

### ix-step

#### StepProps

| 名称 | 说明 | 类型 | 默认值 | 全局配置 | 备注 |
| ---| --- | --- | --- | --- | --- |
`title` | 标题 | `string \| v-slot:title` | - | - | - |
`subTitle` | 副标题 | `string \| v-slot:subTitle` | - | - | - |
`description` | 步骤条节点的具体描述 | `string \| v-slot:description` | - | - | - |
`disabled` | 节点禁用点击 | `true \| false` | `false` | - | - |
`icon` | 每个节点的图标 | `string \| v-slot:icon` | - | - | - |
`status` | 每个节点的状态，当不设置时，会用Steps里的status | `wait \| process \| finish \| error` | - | - | - |
