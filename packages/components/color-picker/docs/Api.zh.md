### IxColorPickerPanel

颜色选择器面板

#### ColorPickerPanelProps

| 名称 | 说明 | 类型  | 默认值 | 全局配置 | 备注 |
| --- | --- | --- | --- | --- | --- |
| `v-model:value` | 颜色值 | `string` | - | - | - |
| `v-model:format` | 颜色格式 | `ColorFormat` | `'hex'` | ✅ | - |
| `presets` | 预设颜色 | `ColorPreset[]` | - | - | - |
| `paddingless` | 是否无内边距 | `boolean` | - | - | 通常用于将颜色选择面板嵌入到其他内容的场景，如弹窗，浮层等 |
| `onChange` | 颜色值变更回调 | `(value: string \| undefined, oldValue: string \| undefined) => void` | - | - | - |
| `onFormatChange` | 颜色格式变更回调 | `(format: ColorFormat, oldFormat: ColorFormat) => void` | - | - | - |

```ts
type ColorFormat = 'hex' | 'hsb' | 'rgb'

type HexColor = string
type HsbColor = {
  h: number
  s: number
  b: number
}

type HsbaColor = HsbColor & { a: number }

type RgbColor = {
  r: number
  g: number
  b: number
}

type RgbaColor = RgbColor & { a: number }

type ColorType = HexColor | HsbColor | RgbColor | HsbaColor | RgbaColor
```

#### ColorPickerPanelSlots

| 名称 | 说明 | 参数类型 | 备注 |
| --- | --- | --- | --- |
| `default` | 默认插槽 | - | 用于自定义面板布局和内容 |

### IxColorPickerTrigger

颜色选择器触发器

#### ColorPickerTriggerProps

| 名称 | 说明 | 类型  | 默认值 | 全局配置 | 备注 |
| --- | --- | --- | --- | --- | --- |
| `value` | 颜色值 | `ColorType` | - | - | - |
| `disabled` | 是否禁用 | `ColorType` | - | - | - |
| `format` | 颜色格式 | `ColorFormat` | `'hex'` | - | - |
| `focused` | 是否聚焦 | `boolean` | `'hex'` | - | - |
| `size` | 尺寸 | `'sm' \| 'md' \| 'lg'` | `'md'` | - | - |
| `showText` | 是否展示文字 | `boolean` | `false` | - | - |

#### ColorPickerTriggerSlots

| 名称 | 说明 | 参数类型 | 备注 |
| --- | --- | --- | --- |
| `default` | 默认插槽 | `{ value: ColorType, format: ColorFormat, text: string, disabled: boolean, focused: boolean, size: 'sm' \| 'md' \| 'lg'` | `'md' }` | 用于自定义触发器 |

### IxColorPicker

颜色选择器组件

#### ColorPickerProps

| 名称 | 说明 | 类型  | 默认值 | 全局配置 | 备注 |
| --- | --- | --- | --- |
| `control` | 表单control | `string \| number \| (string \| number)[] \| AbstractControl` | - | - | - |
| `v-model:open` | 控件浮层是否展开 | `boolean` | - | - | - |
| `autofocus` | 是否自动聚焦 | `boolean` | - | - | - |
| `disabled` | 是否禁用 | `boolean` | - | - | - |
| `overlayClassName` | 所在浮层的class名称 | `boolean` | - | - | - |
| `overlayContainer` | 所在浮层的容器 | `boolean` | `'.ix-color-picker-overlay-container'` | ✅ | - |
| `overlayTabindex` | 所在浮层的tabindex | `number` | - | ✅ | - |
| `readonly` | 是否是只读 | `boolean` | - | - | - |
| `size` | 尺寸 | `'sm' \| 'md' \| 'lg'` | `'md'` | ✅ | - |
| `status` | 校验状态 | `"valid" \| "invalid" \| "validating"` | - | ✅ | - |
| `showText` | 是否展示文字 | `boolean` | `false` | - | - |
| `onFocus` | 聚集回调 | `(evt: FocusEvent) => void` | - | - | - |
| `onBlur` | 失焦回调 | `(evt: FocusEvent) => void` | - | - | - |

继承自 `ColorPickerPanelProps`

#### ColorPickerSlots

| 名称 | 说明 | 参数类型 | 备注 |
| --- | --- | --- | --- | --- | --- |
| `trigger` | 颜色触发器插槽 |`{ value: ColorType, format: ColorFormat, text: string, disabled: boolean, focused: boolean, size: 'sm' \| 'md' \| 'lg'` | `'md' }` | 用于自定义触发器 |
| `panel` | 颜色选择面板 | - | 用于自定义面板布局和内容 |

### IxColorPickerIndicator

颜色指示器

#### ColorPickerIndicatorProps

| 名称 | 说明 | 类型  | 默认值 | 全局配置 | 备注 |
| --- | --- | --- | --- | --- | --- |
| `color` | 颜色 | `ColorType` | - | - | - |
| `checked` | 是否被选中 | `boolean` | - | - | - |
| `disabled` | 是否禁用 | `boolean` | `false` | - | - |
| `focused` | 是否聚焦 | `boolean` | - | - | - |
| `hoverable` | 是否可以鼠标悬浮 | `boolean` | `true` | - | - |
| `showBoxShadow` | 是否展示边框阴影 | `boolean` | `true` | - | - |

### IxColorPickerPalette

颜色选择器色板，仅用于在 `IxColorPicker` 或 `IxColorPickerPanel` 插槽中用来自定义

### IxColorPickerEditor

颜色选择器编辑输入，仅用于在 `IxColorPicker` 或 `IxColorPickerPanel` 插槽中用来自定义

### IxColorPickerPresets

颜色选择器预设颜色，仅用于在 `IxColorPicker` 或 `IxColorPickerPanel` 插槽中用来自定义
