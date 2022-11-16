
### IxStepper

#### StepperProps

| 名称 | 说明 | 类型 | 默认值 | 全局配置 | 备注 |
| ---| --- | --- | --- | --- | --- |
`v-model:activeKey` | 当前的激活节点的 `key` | `VKey` | - | - | - |
`clickable` | 是否可点击 | `boolean` | `false` | - | - |
`dot` | 是否为点状步骤条 | `boolean \| #dot={key, status}` | `false` | - | - |
`labelPlacement` | 指定文本信息放置的位置 | `'end' \| 'bottom'` | `'end'` | -| - |
`percent` | 当前激活节点的进度 | `number` | - | - | 取值是 0-100 |
`size` | 指定节点的大小 | `'md' \| 'sm'` | `'md'` | ✅ | - |
`status` | 指定节点的状态 | `'process' \| 'finish' \| 'wait' \| 'error'` | `process` | - | - |

### IxStepperItem

#### StepperItemProps

| 名称 | 说明 | 类型 | 默认值 | 全局配置 | 备注 |
| ---| --- | --- | --- | --- | --- |
`key` | 节点的唯一标识 | `VKey` | - | - | 默认为 `index + 1` |
`description` | 描述信息 | `string \| #description` | - | - | - |
`disabled` | 禁用状态 | `true \| false` | `false` | - | - |
`icon` | 每个节点的图标 | `string \| #icon={key, status}` | - | - | - |
`status` | 当前节点的状态 | `'process' \| 'finish' \| 'wait' \| 'error'` | - | - | 默认会根据激活节点来自动设置 |
`title` | 标题 | `string \| #title` | - | - | - |
