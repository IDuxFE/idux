---
category: cdk
type:
title: Portal
subtitle: 传送门
cover:
---

## API

### CdkPortal

#### PortalProps

| 名称 | 说明 | 类型  | 默认值 | 备注 |
| --- | --- | --- | --- | --- |
| `disabled` | <p style="width: 120px">是否禁用传送</p> | `boolean` | -  | 若禁用，则会以当前 `v-dom` 结构进行渲染 |
| `target` | 被传送的目标元素 | `string \| HTMLElement \| () => string \| HTMLElement` | -  | 如果传入一个元素，组件直接传送到该元素上；<br /> 如果是一个字符串，会判断是否可以通过此字符串可以找到相应元素，若找到，则直接插入该元素下，反之会判断是否创建过该元素，若创建过直接读取缓存，否则在 `body` 的最后一个元素上创建元素，并将组件传送到该元素,传入的字符串将作为组件的类名 |
