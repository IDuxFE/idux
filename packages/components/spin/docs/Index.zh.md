---
category: components
type: 反馈
title: Spin
subtitle: 加载中
cover:
---

## API

### IxSpin

#### SpinProps

| 参数 | 说明 |  类型  | 默认值 | 全局配置 | 备注 |
| --- | --- | --- | --- | --- | --- |
|`strokeWidth` | 默认loading的strokeWidth |  `number`  | `4` | ✅ | 仅当使用默认loading时生效 |
|`radius` | 默认loading的radius |  `number`  | `14` | ✅ | 仅当使用默认loading时生效 |
|`duration` | 动画时长 |  `number`  | `2` | - | 仅当使用默认loading或 提供 `icon` 配置时生效 |
|`size` | 控制 icon 和 tip大小 |  `sm \| md \| lg`  | `sm` | ✅ | - |
|`spinning` | 是否显示加载遮罩层 |`boolean`| `true` | - | - |
|`ratate` | 是否显示旋转动画 |`boolean`| `true` | - | 仅当 `icon` 不空且没有 `icon` 插槽时生效 |
| `icon`| 加载图标名称 | `string` | -| ✅ | - |
| `tip`| 加载提示文字描述 |  `string`  | `''`| ✅ | - |
| `tipAlign`| 文字描述与加载图标的排列方式 | `vertical \| horizontal` | `vertical`| ✅ | vertical：文字排列在图标下方；horizontal： 文字排列在图标同水平方向的后方 |

#### SpinSlots

|名称 | 说明 | 参数类型 | 备注 |
| --- | --- | --- | --- |
|`default` | 需要遮罩的内容区域 | - | - |

<!--- insert less variable begin  --->
## 主题变量

| 名称 | `default` | `dark` | 备注 |
| --- | --- | --- | --- |
| `@spin-zindex` | `@zindex-l2-base` | - | - |
| `@spin-tip-color` | `@color-primary` | - | - |
| `@spin-icon-color` | `@color-primary` | - | - |
| `@spin-font-size-sm` | `@font-size-sm` | - | - |
| `@spin-font-size-md` | `@font-size-md` | - | - |
| `@spin-font-size-lg` | `@font-size-lg` | - | - |
| `@spin-icon-size-sm` | `20px` | - | - |
| `@spin-icon-size-md` | `28px` | - | - |
| `@spin-icon-size-lg` | `48px` | - | - |
<!--- insert less variable end  --->
