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
|`size` | 控制 icon 和 tip大小 |  `sm \| md \| lg`  | `sm` | ✅ | - |
|`spinning` | 是否显示加载遮罩层|`boolean`| `true` | - | - |
| `icon`| 加载图标名称 | `string` | `loading`| ✅ | - |
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
| `@spin-font-size-sm` | `@font-size-md` | - | - |
| `@spin-font-size-md` | `@font-size-lg` | - | - |
| `@spin-font-size-lg` | `@font-size-xl` | - | - |
<!--- insert less variable end  --->
