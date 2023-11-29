## IxThemeProvider

### ThemeProviderProps

| 名称 | 说明 | 类型  | 默认值 | 全局配置 | 备注 |
| --- | --- | --- | --- | --- | --- |
| `presetTheme` | 预设的主题 | `PresetTheme` | `'default'` | ✅ |  |
| `hashed` | 是否开始 `hash` 功能 | `boolean` | `true` | ✅ |  |
| `tag` | 配置 `IxThemeProvider` 渲染时使用的标签 | `string` | - | - | - |
| `inherit` | 是否继承上层Provider的token和配置 | `boolean \| 'all'` | `true` | - | 配置为true仅继承，配置为`'all'`则必须有上层的provider才会启用主题功能，用于组件封装时覆盖变量的场景 |
| `attachTo` | 配置承载css变量的style标签需要插入的节点 | `ThemeProviderAttachTo` | - | ✅ | 不配置默认插入到 `document.head` |
| `tokens` | 配置全局以及组件的token覆盖 | `DeepPartialThemeTokens` | - | ✅ | 全局配置中没有 `tokens` 配置，直接配置 `global` 以及 `components` |
| `algorithm` | 配置基础算法 | `ThemeTokenAlgorithms` | - | - | 不配置默认使用预设主题的算法 |

```ts
// 预设主题
type PresetTheme = 'default' | 'dark'

// attachTo
type ThemeProviderAttachTo = string | HTMLElement | (() => HTMLElement)

// tokens 配置定义
interface DeepPartialThemeTokens {
  global?: Partial<GlobalThemeTokens>
  components?: {
    [key in keyof ComponentThemeTokens]?: Partial<ComponentThemeTokens[key]>
  } & {
    [key: string]: Record<string, string | number>
  }
}

// 色板梯度变量
interface ColorPalette {
  base: string
  l10: string
  l20: string
  l30: string
  l40: string
  l50: string
  d10: string
  d20: string
  d30: string
  d40: string
  d50: string
}

// 基础色
export type BaseColorKeys =
  | 'red'
  | 'orange'
  | 'brown'
  | 'yellow'
  | 'canary'
  | 'bud'
  | 'green'
  | 'turquoise'
  | 'cyan'
  | 'glacier'
  | 'blue'
  | 'indigo'
  | 'purple'
  | 'magenta'
  | 'graphite'
  | 'grey'
  | 'white'
  | 'black'

// 基础色列表
export type BaseColors = {
  [key in BaseColorKeys]: string
}

// 获取色板梯度变量
type GetColorPalette = (color: string) => ColorPalette
// 获取灰阶颜色
type GetGreyColors = () => ColorPalette
// 获取基础颜色
type GetBaseColors = () => BaseColors
interface ThemeTokenAlgorithms {
  getColorPalette: GetColorPalette
  getGreyColors: GetGreyColors
  getBaseColors: GetBaseColors
}
```

### UseThemeToken

`useThemeToken` 接受参数 `key` 指定使用的主题变量作用域的key，通常指代组件名称，为可选参数

在不提供 `key` 或 `key` 为 `undefined` 的时候，则为使用全局作用域，返回 `GlobalUseThemeTokenContext`

在提供 `key` 时，为具体的作用域，返回 `ScopedUseThemeTokenContext`

```ts
interface ScopedUseThemeTokenContext<K extends UseThemeTokenScope | keyof Ext, Ext extends object = object> {
  presetTheme: ComputedRef<PresetTheme>
  globalHashId: ComputedRef<string>
  hashId: ComputedRef<string>
  themeTokens: ComputedRef<CertainThemeTokens<K, Ext>>
  registerToken: (getTokens: TokenGetter<K, Ext>, transforms?: TokenTransforms<K, Ext>) => string
}

interface GlobalUseThemeTokenContext {
  globalHashId: ComputedRef<string>
  themeTokens: ComputedRef<GlobalThemeTokens>
  presetTheme: ComputedRef<PresetTheme>
}
```

> 注：`useThemeToken` 必须在组件的setup阶段调用

### Shared

`@idux/components/theme` 暴露了一些公共的用于主题计算或转换的工具函数，如下：

| 名称 | 说明 | 类型  |
| --- | --- | --- |
| `getAlphaColor` | 在给定色值上增加alpha通道数值，返回颜色 | `(baseColor: string, alpha: number) => string` |
| `getSolidColor` | 在给定色值基础上调低亮度，返回颜色 | `(baseColor: string, brightness: number) => string` |
| `getBaseColors` | 获取基础颜色 | `GetBaseColors` |
| `getColorPalette` | 获取颜色色阶 | `GetColorPalette` |
| `getDarkColorPalette` | 获取暗黑风格颜色色阶 | `(color: string, bgColor?: string, options?: DarkColorPaletteOptions) => ColorPalette` |
| `getGreyColors` | 获取灰阶颜色 | `GetGreyColors` |
| `getThemeTokens` | 获取预设主题的全局变量 | `(presetTheme: PresetTheme, tokens: Partial<GlobalThemeTokens> \| undefined, algorithms: Partial<ThemeTokenAlgorithms> \| undefined) => GlobalThemeTokens` |
| `getPresetAlgorithms` | 获取预设主题的算法 | `getPresetAlgorithms(presetTheme: PresetTheme) => ThemeTokenAlgorithms` |
