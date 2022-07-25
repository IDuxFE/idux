---
category: components
type: 其他
order: 0
title: Watermark
subtitle: 水印
---

## API

### IxWatermark

#### WatermarkProps

| 名称 | 说明 | 类型  | 默认值               | 全局配置 | 备注 |
| --- | --- | --- |-------------------| --- | --- |
| `content` | 水印内容 | `string \| string[]`         | - | - | 根据type值传入相应内容:<br>  `text`: 默认单行文本水印，支持多行文本，需传入字符串数组 <br>`image`: 图像水印 为保证图片高清且不被拉伸，需同时传入水印图片的宽高 width 和 height，建议使用2倍或3倍图源 |
| `density` | 水印密度 | `'low'\| 'mid'\|'high'` | `'low'` | - | 修改默认密度后，会根据输入的其它参数进行动态调整 |
| `disabled` | 禁用水印 | `boolean` | `false`           | - | - |
| `font`  | 字体样式       | `string`                          | `16px sans-serif` | - | 可控制字体粗细、字体类别等细节，请注意尽量使用`px`作为字体大小单位，[具体配置参考 CSS font](https://developer.mozilla.org/docs/Web/CSS/font) |
| `fontColor`   | 字体颜色 | `string` | `rgba(0,0,0,.15)` | - | - |
| `fontSize`    | 字体大小     | `number`                          | `16`              | - | 优先级高于`font`配置，但`font`配置时需注意必须包含CSS `fontSize`属性 |
| `opacity` | 水印透明度   | `number`               | `1`               | - | 默认透明度已由fontColor控制 |
| `rotate` | 水印旋转角度 | `number` | `-22`             | - | 单位：度 |
| `strict` | 防篡改 | `boolean` | `true` | - | - |
| `type` | 水印类型 | `'text' \| 'image'`          | `'text'` | - | 不同的类型需要的`content`数据不同 |
| `width`       | 水印宽度     | `number`                          | `120`             | - | 图片水印前置参数 |
|`height`| 水印高度    | `number` | `64`              | - |图片水印前置参数|
| `zIndex` | 水印层叠顺序 | `number` | `11`              | - | - |

#### WatermarkSlots

| 名称 | 说明 |
| --- | --- |
| `default` | 需水印覆盖的区域内容 |
