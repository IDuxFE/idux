---
category: components
type: 导航
title: Steps
subtitle: 步骤条
---



## 何时使用

解决了业务中一些需要进度条组件的，比如物流进展，工单进展等。

## API

### ix-steps

#### Props (ix-steps)

| 名称 | 说明 | 类型 | 默认值 | 全局配置 | 备注 |
| ---|---|---|---|---|--- |
`active` | 指定步骤条当前的活跃节点，从0开始计算 | `number` | 0 | - | -
`direction` | 指定步骤条的方向 | `horizontal \| vertical` | `horizontal` | -| -
`placement` | 指定步骤条节点附带的标签放置的位置 | `horizontal \| vertical` | `horizontal` | -| -
`percent` | 当前活跃节点的进度 | `number` | 0 | - | 取值是0-100
`progressDot` | 指定步骤条是否为点状步骤条| `boolean \| v-slot:progressDot` | `false` | - | 使用slot的话，会传入当前节点对象{index, status, title, subTitle,description, prefixCls}
`size` | 指定步骤条节点的大小 | `medium\| small` | `medium` | ✅ | -
`status` | 指定步骤条节点的状态 | `wait \| process \| finish \| error` | `process` | - | -

#### Emits

| 名称 | 说明 | 参数 |
| ---|---|--- |
`change` | 切换步骤条时触发 | `(active) => void`

### ix-step

#### Props (ix-step)

| 名称 | 说明 | 类型 | 默认值 | 全局配置 | 备注 |
| ---|---|---|---|---|--- |
`title` | 标题 | `string \| v-slot:title` | - | - | -
`subTitle` | 副标题 | `string \| v-slot:subTitle` | - | - | -
`description` | 步骤条节点的具体描述 | `string \| v-slot:description` | - | - | -
`disabled` | 节点禁用点击 | `true \| false` | `false` | - | -
`icon` | 每个节点的图标 | `string \| v-slot:icon` | - | - | -
`status` | 每个节点的状态，当不设置时，会用Steps里的status | `wait \| process \| finish \| error` | - | - | -
