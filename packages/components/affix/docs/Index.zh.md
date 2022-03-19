---
category: components
type: 其他
title: Affix
subtitle: 固钉
cover:
---

## API

### IxAffix

#### AffixProps

| 名称 | 说明 | 类型  | 默认值 | 全局配置 | 备注 |
| --- | --- | --- | ---  | --- | --- |
| `offset` | 距离容器顶部的偏移量，到达时会触发affix | `number \| { top:number, bottom:number, left:number, right:number }` | `0` | - | - |
| `target` | 需要监听其滚动事件的元素 | `string \| HTMLElement \| () => string \| HTMLElement` | `window` | - | - |
| `onChange` | 固定状态改变时触发 | `(value: boolean) => void` | - | - | - |

#### AffixSlots

| 名称 | 说明 | 参数类型 | 备注 |
|  --- | --- | --- | --- |
| `default` | 自定义显示内容 | - | - |
