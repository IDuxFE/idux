
### CdkPortal

#### PortalProps

| 名称 | 说明 | 类型 | 默认值 | 备注 |
| --- | --- | --- | --- | --- |
| `disabled` | 是否禁用传送 | `boolean` | - | - |
| `load` | 是否立即加载节点 | `boolean` | `true` | 传入 `false` 可以懒加载节点, 节点加载后，再修改此值将不再生效。 |
| `target` | 被传送的目标元素或者一个 [querySelector](https://developer.mozilla.org/zh-CN/docs/Web/API/Document/querySelector) 支持的 css 选择器 | `string \| HTMLElement \| () => string \| HTMLElement` | - | 当传入 css 选择器时，如果能找到，则直接返回。如果未查找到对应元素，就会在 `body` 中插入一个 `div`, 并设置对应的属性（仅支持简单的 `id` 和 `class` 选择器） |
