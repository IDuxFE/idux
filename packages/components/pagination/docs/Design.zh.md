## 组件定义

将大体量数据划分成多个页面，帮助用户进行页面跳转，并定位当前位置。

## 使用场景

通常用在表格、列表页等有信息查找诉求的场景，帮助用户对对内容/数据数量以及目前所处的浏览位置一目了然，方便浏览时快速跳转回溯定位。当加载/渲染所有数据将花费很多时间尤为适用。

## 组件构成

| 名称 | 说明  |
| --- | ---  |
| 总数（可选） | 默认提供该功能。若该内容与页面其他内容重复，则可去掉；显示内容/数据的总条目数。<br /> 默认选项内容为10、20、50、100，默认选项为20条。选项内容和默认选项业务可定义。 |
| 页码&上下翻页 | 分页基础功能。 |
| 单页显示数量设置（可选） | 默认提供该功能。仅当页面数很少的时候，可不提供该功能。 |
| 快速跳转（可选） | 默认提供该功能。仅当页面数很少的时候，可不提供该功能。 <br />  输入框尺寸为默认可填入3个数字。若通常情况下数据量达到10000，业务可自行增宽输入框尺寸。 |

## 组件类型

| 名称 | 说明  |
| --- | ---  |
| 常规型分页 | 一般情况下默认使用常规型分页。 |
| 精简型分页 | 适用于空间较小，无法放置完整常规型分页时，例如卡片中的表格、穿梭框中的表格等。 |

### 主题变量

| 名称 | `default` | `dark` | 备注 |
| --- | --- | --- | --- |
| `@pagination-font-size` | `@font-size-md` | - | - |
| `@pagination-item-icon-font-size` | `@font-size-sm` | - | - |
| `@pagination-item-height-md` | `@height-md` | - | - |
| `@pagination-item-height-sm` | `@height-sm` | - | - |
| `@pagination-item-margin-right-md` | `@spacing-sm` | - | - |
| `@pagination-item-margin-right-sm` | `@spacing-xs` | - | - |
| `@pagination-item-input-width-md` | `48px` | - | - |
| `@pagination-item-input-width-sm` | `40px` | - | - |
| `@pagination-item-spacing-sm` | `20px` | - | - |
| `@pagination-item-active-color` | `@button-primary` | - | - |
| `@pagination-item-active-bg-color` | `@button-primary-background-color` | - | - |
| `@pagination-item-hover-bg-color` | `tint(@button-primary-background-color, 90%)` | - | - |
| `@pagination-item-disabled-color` | `@button-disable-color` | - | - |
| `@pagination-item-disabled-bg-color` | `@button-disable-background-color` | - | - |
