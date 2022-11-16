
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

#### AffixMethods

| 名称 | 说明 | 参数类型 | 备注 |
|  --- | --- | --- | --- |
| `update` | 重新计算affix的样式和位置 | - | - |

### FAQ

#### Affix 使用`v-show`进行动态显隐时，样式的计算会有问题

从性能角度考虑，监听`dom`的改变重新计算`affix`样式会带来较大的开销，如果希望动态显隐，可以改用`v-if`实现，或者在`v-show`变化后，手动调用`affix`的`update`方法重新计算样式。

相关issue: [#849](https://github.com/IDuxFE/idux/issues/849)
