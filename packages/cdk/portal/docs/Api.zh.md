## API

`@idux/cdk/popper` 对 `Teleport` 进行了简单的封装.

### CdkPortal

#### PortalProps

| 名称 | 说明 | 类型  | 默认值 | 备注 |
| --- | --- | --- | --- | --- |
| `disabled` | 是否禁用传送 | `boolean` | - | - |
| `load` | 是否立即加载节点 | `boolean` | `true` | 传入 `false` 可以懒加载节点 <br />节点加载后，再修改此值将不再生效。 |
| `target` | 被传送的目标元素 | `string \| HTMLElement \| () => string \| HTMLElement` | -  | 如果传入一个元素，组件直接传送到该元素上 <br /> 如果是一个字符串，会判断是否可以通过此字符串可以找到相应元素，若找到，则直接插入该元素下<br /> 反之会在 `body` 的最后一个元素上创建元素，并将组件传送到该元素, 传入的字符串将作为其类名 |
