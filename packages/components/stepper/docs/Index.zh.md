---
category: components
type: 导航
title: Stepper
subtitle: 步骤条
---

## API

### IxStepper

#### StepperProps

| 名称 | 说明 | 类型 | 默认值 | 全局配置 | 备注 |
| ---| --- | --- | --- | --- | --- |
`v-model:active` | 指定步骤条当前的活跃节点，从 0 开始计算 | `number` | 0 | - | - |
`clickable` | 步骤条是否可点击 | `boolean` | `false` | - | - |
`direction` | 指定步骤条的方向 | `horizontal \| vertical` | `horizontal` | - | - |
`placement` | 指定步骤条节点附带的标签放置的位置 | `horizontal \| vertical` | `horizontal` | -| - |
`percent` | 当前活跃节点的进度 | `number` | 0 | - | 取值是0-100 |
`progressDot` | 指定步骤条是否为点状步骤条| `boolean \| #progressDot` | `false` | - | 使用slot的话，会传入当前节点对象{index, status} |
`size` | 指定步骤条节点的大小 | `md \| sm` | `md` | ✅ | - |
`status` | 指定步骤条节点的状态 | `wait \| process \| finish \| error` | `process` | - | - |

### IxStepperItem

#### StepperItemProps

| 名称 | 说明 | 类型 | 默认值 | 全局配置 | 备注 |
| ---| --- | --- | --- | --- | --- |
`title` | 标题 | `string \| #title` | - | - | - |
`subTitle` | 副标题 | `string \| #subTitle` | - | - | - |
`description` | 步骤条节点的具体描述 | `string \| #description` | - | - | - |
`disabled` | 节点禁用点击 | `true \| false` | `false` | - | - |
`icon` | 每个节点的图标 | `string \| #icon` | - | - | - |
`status` | 每个节点的状态，当不设置时，会用Steps里的status | `wait \| process \| finish \| error` | - | - | - |

<!--- insert less variable begin  --->
## 主题变量

| 名称 | `default` | `dark` | 备注 |
| --- | --- | --- | --- |
| `@stepper-item-highlight-color` | `@color-primary` | - | - |
| `@stepper-item-tail-width` | `9999px` | - | - |
| `@stepper-item-tail-height` | `1px` | - | - |
| `@stepper-item-custom-icon-width` | `24px` | - | - |
| `@stepper-item-custom-icon-width-small` | `20px` | - | - |
| `@stepper-item-content-min-height` | `48px` | - | - |
| `@stepper-item-dot-width` | `8px` | - | - |
| `@stepper-item-dot-width-active` | `10px` | - | - |
| `@stepper-item-dot-head-width` | `60px` | - | - |
| `@stepper-item-dot-active-offset` | `-1px` | - | - |
| `@stepper-item-dot-tail-width` | `2px` | - | - |
| `@stepper-item-dot-vertical-gutter` | `6px` | - | - |
| `@stepper-item-percent-gutter` | `8px` | - | - |
| `@stepper-item-percent-width` | `2px` | - | - |
| `@stepper-item-percent-background-color` | `#dfdfdf` | - | - |
<!--- insert less variable end  --->