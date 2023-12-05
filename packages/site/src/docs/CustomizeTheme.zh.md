---
category: docs
title: 定制主题
order: 5
---

我们所有的组件都支持一定程度的样式定制，以满足业务和品牌上多样化的视觉需求，包括但不限于主色、圆角、边框和部分组件的视觉定制。

在 2.0 的版本中，我们基于全套设计token实现了全新的动态主题机制，提供了一系列的全局token变量可供修改，以及各个组件可独立控制的token变量。

## 主题配置

### 使用 IxThemeProvider

动态主题需要通过 `IxThemeProvider` 来使用，它的功能包含主题变量配置、预设主题配置、主题token动态注入等

```ts
import { IxThemeProvider } from '@idux/components/theme'
```

```html
<IxThemeProvider presetTheme="default">
  <App/>
</IxThemeProvider>
```

### 配置预设主题

我们提供了 2 种预设主题，欢迎在项目中试用，并且给我们提供反馈。

- `default`: 默认主题
- `dark`: 暗黑风格主题

通过 `IxThemeProvider` 的 `presetTheme` 进行配置即可，该配置同时支持全局配置

### 配置主题Token

可以通过 `IxThemeProvider` 的 `tokens` 属性配置来修改token，也可以在全局配置中修改。

支持修改全局token以及组件token，详情请见：

```html
<IxThemeProvider presetTheme="default" :tokens="{
  global: {
    colorPrimary: 'purple',
    ...
  },
  components: {
    button: {
      bgColor: 'rgba(0, 0, 0, 0.1)'
    }
  }
}">
  <App/>
</IxThemeProvider>
```

### 配置主题算法

主题内部的token依赖多层的派生和继承，以及一些主题算法算法，用于获取颜色等。

目前支持的算法配置有：

- 获取基础颜色：`getBaseColors: () => BaseColors`

组件或者是内置的几套主题的全局token，均会用到几种基础色以及通过其派生的颜色，可以通过改算法修改内置的基础色

- 计算色板颜色：`getColorPalette: (color: string) => ColorPalette`

一些例如信息色或者主题色的不同状态和用途的颜色token是通过色板计算而来，可以通过该算法修改色板的计算逻辑

- 获取灰阶颜色：`getGreyColors: () => ColorPalette`

文字、背景色通常会使用灰阶颜色的不同色阶，可以通过修改该算法来修改整体的灰阶颜色

```html
<IxThemeProvider presetTheme="default" :algorithms="{
  getGreyColors: customGetGreyColors,
  getBaseColors: customGetBaseColors,
  getColorPalette: customGetColorPalette,
}">
  <App/>
</IxThemeProvider>
```

## 高级使用

### 动态主题切换

由于 2.0 版本中使用了 `javascript` 变量表达设计token，因此我们已经实现了主题token配置以及预设主题配置等的动态切换功能，只需要在 `IxThemeProvider` 的属性中或者全局配置的 `theme` 属性中做修改，既可实现动态切换

### 是否使用 hash

我们基于对全局的token以及每个组件token都基于 `hash` 做了隔离和性能优化，也基于该功能实现了主题嵌套能力，但是你仍然可以选择关闭该功能，届时主题嵌套会不再生效，所有的token生成的css变量都会作用在 `:root` 下

可以通过 `IxThemeProvider` 或者全局配置的 `theme` 属性来设置 `hashed`

```html
<IxThemeProvider presetTheme="default" :hashed="false">
  <App/>
</IxThemeProvider>
```

> 注：即使不使用 `hash`，组件库内部仍然会计算 `hash`，通过比对两次的计算结果来判断是否有组件或全局的主题变更

### 主题嵌套

可以通过 `IxThemeProvider` 的嵌套使用来实现主题嵌套

可以用来局部修改某个页面或区块的组件样式，也可以用来修改二次封装的组件内部的基础组件风格，由于这些token是经过考量和打磨的可暴露API，使用主题token会比样式覆盖更加可控。

配置 `inherit` 来继承上层 Provider 的token 以及配置

```html
<IxThemeProvider presetTheme="default" :hashed="true">
  <App/>
  <IxThemeProvider :inherit="true" :tokens="{
    global: { colorPrimary: 'purple' }
  }">
    <SubApp/>
  </IxThemeProvider>
</IxThemeProvider>
```

> 注：主题嵌套的能力必须开启 `hash`，即配置 `hashed` 为 `true`

### 使用和注册主题Token

可以通过 `@idux/components/theme` 暴露的 `useThemeToken` 来使用主题token。

```ts
import { defineComponent } from 'vue'
import { useThemeToken } from '@idux/components/theme'

export default defineComponent({
  setup() {
    // 不提供 key， 默认获取全局token，以及全局 hashId
    const { tokens: globalTokens } = useThemeToken()
    // 提供具体key，获取某组件token，以及组件 hashId
    const { globalHashId, hashId, tokens } = useThemeToken('timePicker')

    ...
    ...

    return () => <div :class="['custom-component', globalHashId.value, hashId.value]">
      ...
    </div>
  }
})
```

由于token会在运行时被转换为中划线连接的，以 `--ix` 开头的 `css` 变量，而这些变量通过作为class的 `hashId`来划分作用域，因此在需要消费这些 `css` 变量时应当将 `hashId` 绑定到需要使用变量的节点下。

如果应用内部需要消费组件库的全局token转换成的 `css` 变量，同样也需要将 `globalHashId` 绑定到指定的节点。

如果只需要使用 `javascript` 变量，这不需要绑定 `hashId`。

> 注：对于某个组件的token，只有引用了该组件并执行过该组件的setup阶段，才能获取该组件的token

### 定义和注册自定义组件或业务页面的主题token

同样可以使用 `useThemeToken` 来注册某个组件的主题token并消费，通常可以在项目中或者需要的地方扩展主题类型

```ts
import {
  type UseThemeTokenScope,
  type UseThemeTokenContext,
  useThemeToken as _useThemeToken,
} from '@idux/components/theme'

// 扩展的 token 定义
interface PageThemeTokens {
  pageA: {
    menuColor: string,
    iconTop: number,
    ...
  },
  pageB: {
    ...
  }
}

// 获取某个页面的token
export type PageCertainThemeTokens<K extends ThemeKeys | keyof PageThemeTokens> = CertainThemeTokens<
  K,
  PageThemeTokens
>

// 某个页面的token getter类型扩展
export type PageTokenGetter<K extends ThemeKeys | keyof PageThemeTokens> = TokenGetter<
  K,
  PageThemeTokens
>

// 某个页面的token转换函数类型扩展
export type PageTokenTransforms<K extends ThemeKeys | keyof PageThemeTokens> = TokenTransforms<
  K,
  PageThemeTokens
>


export function useThemeToken(): UseThemeTokenContext<undefined>
export function useThemeToken<K extends UseThemeTokenScope | keyof PageThemeTokens | undefined>(
  key: K,
): UseThemeTokenContext<K, PageThemeTokens>
export function useThemeToken<K extends UseThemeTokenScope | keyof PageThemeTokens | undefined>(
  key?: K,
): UseThemeTokenContext<K, PageThemeTokens> {
  return _useThemeToken<PageThemeTokens, K>(key as K)
}

```

下一步为 `pageA` 页面定义主题 `getter`

```ts
import type { PageTokenGetter, PageTokenTransforms } from 'path/to/pageTokenTypes.ts'

import { numUnitTransform } from '@idux/components/theme'

export const transforms: PageTokenTransforms<'pageA'> = {
  iconTop: value => numUnitTransform(value, 'rem')
}

export const getThemeTokens: PageTokenGetter<'pageA'> = (tokens, presetTheme, algorithms) => {
  const { getBaseColors, getGreyColors, getColorPalette } = algorithms
  const { colorText } = tokens

  ...
  ...

  return {
    menuColor: colorText,
    iconTop: 16,

    ...
  }
}
```

`transforms` 的作用是将数字或者字符串类型的token在转换成 `css` 变量时自定义转换函数，例如加上单位，内置的转换函数会保留 `string` 类型的全部内容不做修改，而会将一系列关键字匹配到的 `number` 类型的token加上对应的单位，大部分会转换成 `px` 单位。

最后，在页面初始化时注册页面token的 `getter` ，即可使用对应的js变量或者在样式中使用对应的 `css` 变量

```ts
import { defineComponent } from 'vue'
import { useThemeToken } from '@idux/components/theme'

import { transforms, getThemeTokens } from './tokens'

export default defineComponent({
  setup() {
    const { globalHashId, hashId, tokens, registerToken } = useThemeToken('timePicker')
    registerToken(getThemeTokens, transforms)

    ...
    ...

    return () => <div :class="['custom-component', globalHashId.value, hashId.value]">
      ...
    </div>
  }
})
```

token `getter` 只会在第一次注册成功的时候实际执行，因此不必要担心重复注册的问题。

## 设计解析

### 主题Token

主题token，也叫主题变量，经过团队的整理，划分成了三个不同概念层次的token。分别是 __基础token__、__派生token__、__扩展token__ ，他们属于逐层派生的关系，并共同构成全局主题token，每一层的token变化，都会触发下面几层的token的变化。

#### 基础token

基础token规定了最基础的，用于派生其他token的原始token，比如字体大小，主题色，信息色等，这些token通常不会直接在具体场景中使用，而是通过派生来创建具有特定意义的token。但通过调整基础token，就已经可以做到调整整体组件库的主题风格。

#### 派生token

派生token是基于基础token，并使用一系列内置的计算规则派生出例如用于不同状态的颜色，不同梯度的尺寸等，这些变量是距离设计规范最近也最据概括性的，他们也已经有了在全局范围内的含义。

#### 扩展token

扩展token是在整体设计规范中最具体的一系列token，他们指定了某个具体场景下应当使用的变量，例如信息文字颜色、组件背景颜色等。调整扩展token可以控制组件库的主题细节。

### 主题token与css样式

主题token的整体设计思路，是利用编程语言的强大能力处理变量，再将处理过的变量通过一系列的规则转换成 `css` 变量以提供给样式引用

### hash计算

为了避免重复的生成和插入 `css` 变量，引入了 `hash` 比对的方式，即如果两次插入的token是一样的，则不会再重复插入。

## API

### IxThemeProvider

详情请参考 [ThemeProvider](/components/theme/zh).

### 基础Token

<!-- insert basicTokens start -->
| 名称 | 描述 | 类型 | default | dark |
|---|---|---|---|---|
| `borderRadius` | 边框圆角 | `number` | `4` | `4` |
| `colorBg` | 基础背景颜色 | `string` | `#ffffff` | `#0A0C0F` |
| `colorBorder` | 基础边框颜色 | `string` | `#d3d7de` | `#3C424D` |
| `colorBorderSecondary` | 次级边框颜色，比基础边框颜色要浅一阶段， 通常用于表格、卡片等不需要边框特别突出的组件 | `string` | `#e1e5eb` | `#1F2329` |
| `colorError` | 错误信息色 | `string` | `#f52727` | `#E8514C` |
| `colorFatal` | 失陷信息色 | `string` | `#82010e` | `#A72122` |
| `colorInfo` | 信息颜色 | `string` | `#1c6eff` | `#4083E8` |
| `colorLink` | 链接颜色 | `string` | `#1c6eff` | `#4083E8` |
| `colorPrimary` | 主题色 | `string` | `#1c6eff` | `#4083E8` |
| `colorRisk` | 风险信息色 | `string` | `#fa721b` | `#E88641` |
| `colorSuccess` | 成功信息色 | `string` | `#12a679` | `#40C695` |
| `colorText` | 文字颜色 | `string` | `#2f3540` | `#F4F8FF` |
| `colorWarning` | 警告信息色 | `string` | `#fdaa1d` | `#FDAA1D` |
| `colorWhite` | 白色 | `string` | `#ffffff` | `#fff` |
| `fontFamily` | Font family | `string` | `pingfang SC, helvetica neue, arial, hiragino sans gb, microsoft yahei ui, microsoft yahei, simsun, sans-serif` | `pingfang SC, helvetica neue, arial, hiragino sans gb, microsoft yahei ui, microsoft yahei, simsun, sans-serif` |
| `fontFamilyCode` | Font family code | `string` | `'SFMono-Regular', Consolas, 'Liberation Mono', Menlo, Courier, monospace` | `'SFMono-Regular', Consolas, 'Liberation Mono', Menlo, Courier, monospace` |
| `fontSize` | 基础字体大小, 默认解析为中号字体，正文字体使用sm | `number` | `14` | `14` |
| `fontWeight` | 基础字重 | `number` | `400` | `400` |
| `height` | 基础高度尺寸 | `number` | `32` | `32` |
| `lineHeightGutter` | 行高gutter，fontSize + gutter = 行高 | `number` | `8` | `8` |
| `lineType` | 边框，分割线的线条样式 | `string` | `solid` | `solid` |
| `lineWidth` | 边框，分割线的宽度 | `number` | `1` | `1` |
| `motionDuration` | 过渡动画时间 | `number` | `0.24` | `0.24` |
| `motionEaseIn` | 预设动效曲率 | `string` | `cubic-bezier(0.12, 0, 0.39, 0)` | `cubic-bezier(0.12, 0, 0.39, 0)` |
| `motionEaseInBack` | 预设动效曲率 | `string` | `cubic-bezier(0.36, 0, 0.66, -0.56)` | `cubic-bezier(0.36, 0, 0.66, -0.56)` |
| `motionEaseInCirc` | 预设动效曲率 | `string` | `cubic-bezier(0.55, 0, 1, 0.45)` | `cubic-bezier(0.55, 0, 1, 0.45)` |
| `motionEaseInOut` | 预设动效曲率 | `string` | `cubic-bezier(0.37, 0, 0.63, 1)` | `cubic-bezier(0.37, 0, 0.63, 1)` |
| `motionEaseInQuint` | 预设动效曲率 | `string` | `cubic-bezier(0.64, 0, 0.78, 0)` | `cubic-bezier(0.64, 0, 0.78, 0)` |
| `motionEaseOut` | 预设动效曲率 | `string` | `cubic-bezier(0.61, 1, 0.88, 1)` | `cubic-bezier(0.61, 1, 0.88, 1)` |
| `motionEaseOutBack` | 预设动效曲率 | `string` | `cubic-bezier(0.34, 1.56, 0.64, 1)` | `cubic-bezier(0.34, 1.56, 0.64, 1)` |
| `motionEaseOutCirc` |  | `string` | `cubic-bezier(0, 0.55, 0.45, 1)` | `cubic-bezier(0, 0.55, 0.45, 1)` |
| `motionEaseOutQuint` | 预设动效曲率 | `string` | `cubic-bezier(0.22, 1, 0.36, 1)` | `cubic-bezier(0.22, 1, 0.36, 1)` |
| `screenLg` | 屏幕尺寸Lg | `number` | `1280` | `1280` |
| `screenMd` | 屏幕尺寸Md | `number` | `960` | `960` |
| `screenSm` | 屏幕尺寸Sm | `number` | `600` | `600` |
| `screenXl` | 屏幕尺寸Xl | `number` | `1720` | `1720` |
| `spacing` | 基础间距 | `number` | `8` | `8` |

<!-- insert basicTokens end -->

### 派生Token

<!-- insert derivedTokens start -->
| 名称 | 描述 | 类型 | default | dark |
|---|---|---|---|---|
| `arrowSize` | 箭头尺寸 | `number` | `6` | `6` |
| `borderRadiusLg` | 边框圆角尺寸Lg | `number` | `8` | `8` |
| `borderRadiusMd` | 边框圆角尺寸Md | `number` | `4` | `4` |
| `borderRadiusSm` | 边框圆角尺寸Sm | `number` | `2` | `2` |
| `borderRadiusXs` | 边框圆角尺寸Xs | `number` | `2` | `2` |
| `boxShadowLg` | 阴影Lg, 物体处于高层，物体和其他层级没有关系，如：对话框、抽屉 | `string` | `0 8px 22px 0px rgba(30, 35, 43, 0.12)` | `0 8px 22px 0px #0A0C0F` |
| `boxShadowMd` | 阴影Md, 物体处于中层，由地面上的元素展开产生，如：下拉面板等 | `string` | `0 4px 16px 0px rgba(30, 35, 43, 0.14)` | `0 4px 16px 0px #0A0C0F` |
| `boxShadowSm` | 阴影Sm，物体处于低层，hover触发为悬浮状态，如：卡片hover | `string` | `0 2px 10px 0px rgba(30, 35, 43, 0.16)` | `0 2px 10px 0px #0A0C0F` |
| `colorErrorBg` | 错误色阶背景颜色 | `string` | `#ff5752` | `#E8514C` |
| `colorErrorBgActive` | 错误色阶背景激活颜色 | `string` | `#cf171d` | `#F37E75` |
| `colorErrorBgHover` | 错误色阶背景悬浮颜色 | `string` | `#ff837a` | `#D42525` |
| `colorErrorBorder` | 错误色阶边框颜色 | `string` | `#cf171d` | `#E8514C` |
| `colorErrorBorderActive` | 错误色阶边框激活颜色 | `string` | `#a80a15` | `#F37E75` |
| `colorErrorBorderHover` | 错误色阶边框悬浮颜色 | `string` | `#f52727` | `#D42525` |
| `colorErrorIcon` | 错误色阶图标颜色 | `string` | `#ff5752` | `#E8514C` |
| `colorErrorText` | 错误色阶文字颜色 | `string` | `#cf171d` | `#E8514C` |
| `colorErrorTextActive` | 错误色阶文字激活颜色 | `string` | `#cf171d` | `#F37E75` |
| `colorErrorTextHover` | 错误色阶文字悬浮颜色 | `string` | `#f52727` | `#D42525` |
| `colorFatalBg` | 失陷色阶背景颜色 | `string` | `#82010e` | `#8f1e1f` |
| `colorFatalBgActive` | 失陷色阶背景激活颜色 | `string` | `#5c000c` | `#a23e3b` |
| `colorFatalBgHover` | 失陷色阶背景悬浮颜色 | `string` | `#8f1820` | `#701a1b` |
| `colorFatalBorder` | 失陷色阶边框颜色 | `string` | `#82010e` | `#8f1e1f` |
| `colorFatalBorderActive` | 失陷色阶边框激活颜色 | `string` | `#5c000c` | `#a23e3b` |
| `colorFatalBorderHover` | 失陷色阶边框悬浮颜色 | `string` | `#8f1820` | `#701a1b` |
| `colorFatalIcon` | 失陷色阶图标颜色 | `string` | `#8f1820` | `#A72122` |
| `colorFatalText` | 失陷色阶文字颜色 | `string` | `#82010e` | `#8f1e1f` |
| `colorFatalTextActive` | 失陷色阶文字激活颜色 | `string` | `#5c000c` | `#a23e3b` |
| `colorFatalTextHover` | 失陷色阶文字悬浮颜色 | `string` | `#8f1820` | `#701a1b` |
| `colorInfoBg` | 信息色阶背景颜色 | `string` | `#1c6eff` | `#4083E8` |
| `colorInfoBgActive` | 信息色阶背景激活颜色 | `string` | `#0d51d9` | `#6AA6F4` |
| `colorInfoBgHover` | 信息色阶背景悬浮颜色 | `string` | `#458fff` | `#1B61DD` |
| `colorInfoBorder` | 信息色阶边框颜色 | `string` | `#1c6eff` | `#4083E8` |
| `colorInfoBorderActive` | 信息色阶边框激活颜色 | `string` | `#0d51d9` | `#6AA6F4` |
| `colorInfoBorderHover` | 信息色阶边框悬浮颜色 | `string` | `#458fff` | `#1B61DD` |
| `colorInfoIcon` | 信息色阶图标颜色 | `string` | `#458fff` | `#4083E8` |
| `colorInfoText` | 信息色阶文字颜色 | `string` | `#1c6eff` | `#4083E8` |
| `colorInfoTextActive` | 信息色阶文字激活颜色 | `string` | `#0d51d9` | `#6AA6F4` |
| `colorInfoTextHover` | 信息色阶文字悬浮颜色 | `string` | `#458fff` | `#1B61DD` |
| `colorOffline` | 离线颜色 | `string` | `#6f7785` | `#808999` |
| `colorOfflineBg` | 离线背景颜色 | `string` | `#6f7785` | `#808999` |
| `colorOfflineText` | 离线文字颜色 | `string` | `#6f7785` | `#808999` |
| `colorPrimaryActive` | 主题色阶激活颜色，常用于背景色 | `string` | `#0d51d9` | `#6AA6F4` |
| `colorPrimaryBorder` | 主题色阶边框颜色 | `string` | `#1c6eff` | `#4083E8` |
| `colorPrimaryBorderActive` | 主题色阶边框激活颜色 | `string` | `#0d51d9` | `#6AA6F4` |
| `colorPrimaryBorderHover` | 主题色阶边框悬浮颜色 | `string` | `#458fff` | `#1B61DD` |
| `colorPrimaryHover` | 主题色阶悬浮颜色，常用于背景色 | `string` | `#458fff` | `#1B61DD` |
| `colorPrimaryIcon` | 主题色阶图标颜色 | `string` | `#1c6eff` | `#4083E8` |
| `colorPrimaryText` | 主题色阶文字颜色 | `string` | `#1c6eff` | `#4083E8` |
| `colorPrimaryTextActive` | 主题色阶文字激活颜色 | `string` | `#0d51d9` | `#6AA6F4` |
| `colorPrimaryTextHover` | 主题色阶文字悬浮颜色 | `string` | `#458fff` | `#1B61DD` |
| `colorRiskBg` | 风险色阶背景颜色 | `string` | `#fa721b` | `#E88641` |
| `colorRiskBgActive` | 风险色阶背景激活颜色 | `string` | `#d4520d` | `#F3A76A` |
| `colorRiskBgHover` | 风险色阶背景悬浮颜色 | `string` | `#ff9245` | `#D8641B` |
| `colorRiskBorder` | 风险色阶边框颜色 | `string` | `#fa721b` | `#E88641` |
| `colorRiskBorderActive` | 风险色阶边框激活颜色 | `string` | `#d4520d` | `#F3A76A` |
| `colorRiskBorderHover` | 风险色阶边框悬浮颜色 | `string` | `#ff9245` | `#D8641B` |
| `colorRiskIcon` | 风险色阶图标颜色 | `string` | `#ff9245` | `#E88641` |
| `colorRiskText` | 风险色阶文字颜色 | `string` | `#fa721b` | `#E88641` |
| `colorRiskTextActive` | 风险色阶文字激活颜色 | `string` | `#d4520d` | `#F3A76A` |
| `colorRiskTextHover` | 风险色阶文字悬浮颜色 | `string` | `#ff9245` | `#D8641B` |
| `colorSuccessBg` | 成功色阶背景颜色 | `string` | `#12a679` | `#40C695` |
| `colorSuccessBgActive` | 成功色阶背景激活颜色 | `string` | `#088060` | `#6ADCAE` |
| `colorSuccessBgHover` | 成功色阶背景悬浮颜色 | `string` | `#30b387` | `#1FB182` |
| `colorSuccessBorder` | 成功色阶边框颜色 | `string` | `#088060` | `#40C695` |
| `colorSuccessBorderActive` | 成功色阶边框激活颜色 | `string` | `#015945` | `#6ADCAE` |
| `colorSuccessBorderHover` | 成功色阶边框悬浮颜色 | `string` | `#12a679` | `#1FB182` |
| `colorSuccessIcon` | 成功色阶图标颜色 | `string` | `#12a679` | `#40C695` |
| `colorSuccessText` | 成功色阶文字颜色 | `string` | `#088060` | `#40C695` |
| `colorSuccessTextActive` | 成功色阶文字激活颜色 | `string` | `#015945` | `#6ADCAE` |
| `colorSuccessTextHover` | 成功色阶文字悬浮颜色 | `string` | `#12a679` | `#1FB182` |
| `colorWarningBg` | 警告色阶背景颜色 | `string` | `#fdaa1d` | `#FDAA1D` |
| `colorWarningBgActive` | 警告色阶背景激活颜色 | `string` | `#d6860d` | `#F3CA6A` |
| `colorWarningBgHover` | 警告色阶背景悬浮颜色 | `string` | `#ffc145` | `#DB941D` |
| `colorWarningBorder` | 警告色阶边框颜色 | `string` | `#fdaa1d` | `#FDAA1D` |
| `colorWarningBorderActive` | 警告色阶边框激活颜色 | `string` | `#d6860d` | `#F3CA6A` |
| `colorWarningBorderHover` | 警告色阶边框悬浮颜色 | `string` | `#ffc145` | `#DB941D` |
| `colorWarningIcon` | 警告色阶图标颜色 | `string` | `#ffc145` | `#FDAA1D` |
| `colorWarningText` | 警告色阶文字颜色 | `string` | `#fdaa1d` | `#FDAA1D` |
| `colorWarningTextActive` | 警告色阶文字激活颜色 | `string` | `#d6860d` | `#F3CA6A` |
| `colorWarningTextHover` | 警告色阶文字悬浮颜色 | `string` | `#ffc145` | `#DB941D` |
| `fontSize2xl` | 字体大小尺寸2Xl | `number` | `24` | `24` |
| `fontSize3xl` | 字体大小尺寸3Xl | `number` | `30` | `30` |
| `fontSizeHeaderLg` | 头部、标题字体大小尺寸Lg | `number` | `20` | `20` |
| `fontSizeHeaderMd` | 头部、标题字体大小尺寸Md | `number` | `16` | `16` |
| `fontSizeHeaderSm` | 头部、标题字体大小尺寸Sm | `number` | `14` | `14` |
| `fontSizeHeaderXl` | 头部、标题字体大小尺寸Xl | `number` | `24` | `24` |
| `fontSizeLg` | 字体大小尺寸Lg | `number` | `16` | `16` |
| `fontSizeMd` | 字体大小尺寸Md | `number` | `14` | `14` |
| `fontSizeSm` | 字体大小尺寸Sm | `number` | `12` | `12` |
| `fontSizeXl` | 字体大小尺寸Xl | `number` | `20` | `20` |
| `fontSizeXs` | 字体大小尺寸Xs | `number` | `10` | `10` |
| `fontWeightLg` | 字重Lg | `number` | `500` | `500` |
| `fontWeightMd` | 字重Md | `number` | `400` | `400` |
| `fontWeightSm` | 字重Sm | `number` | `300` | `300` |
| `fontWeightXl` | 字重Xl | `number` | `600` | `600` |
| `fontWeightXs` | 字重Xs | `number` | `200` | `200` |
| `height2xl` | 高度尺寸2Xl | `number` | `56` | `56` |
| `height3xl` | 高度尺寸3Xl | `number` | `64` | `64` |
| `heightLg` | 高度尺寸Lg | `number` | `40` | `40` |
| `heightMd` | 高度尺寸Md | `number` | `32` | `32` |
| `heightSm` | 高度尺寸Sm | `number` | `24` | `24` |
| `heightXl` | 高度尺寸Xl | `number` | `48` | `48` |
| `heightXs` | 高度尺寸Xs | `number` | `16` | `16` |
| `lineWidthBold` | 粗线框尺寸 | `number` | `2` | `2` |
| `marginSize2Xl` | 外边距尺寸2Xl | `number` | `32` | `32` |
| `marginSize2Xs` | 外边距尺寸2Xs | `number` | `2` | `2` |
| `marginSizeLg` | 外边距尺寸Lg | `number` | `16` | `16` |
| `marginSizeMd` | 外边距尺寸Md | `number` | `12` | `12` |
| `marginSizeSm` | 外边距尺寸Sm | `number` | `8` | `8` |
| `marginSizeXl` | 外边距尺寸Xl | `number` | `24` | `24` |
| `marginSizeXs` | 外边距尺寸Xs | `number` | `4` | `4` |
| `motionDurationFast` | 过渡动画时间 快速 | `number` | `0.18` | `0.18` |
| `motionDurationMedium` | 过渡动画时间 中等 | `number` | `0.24` | `0.24` |
| `motionDurationSlow` | 过渡动画时间 缓慢 | `number` | `0.3` | `0.3` |
| `paddingSize2Xl` | 内边距尺寸2Xl | `number` | `32` | `32` |
| `paddingSize2Xs` | 内边距尺寸2Xs | `number` | `2` | `2` |
| `paddingSizeLg` | 内边距尺寸Lg | `number` | `16` | `16` |
| `paddingSizeMd` | 内边距尺寸Md | `number` | `12` | `12` |
| `paddingSizeSm` | 内边距尺寸Sm | `number` | `8` | `8` |
| `paddingSizeXl` | 内边距尺寸Xl | `number` | `24` | `24` |
| `paddingSizeXs` | 内边距尺寸Xs | `number` | `4` | `4` |
| `screenLgMax` |  | `number` | `1719.99` | `1719.99` |
| `screenLgMin` |  | `number` | `1280` | `1280` |
| `screenMdMax` |  | `number` | `1279.99` | `1279.99` |
| `screenMdMin` |  | `number` | `960` | `960` |
| `screenSmMax` |  | `number` | `959.99` | `959.99` |
| `screenSmMin` |  | `number` | `600` | `600` |
| `screenXlMin` |  | `number` | `1720` | `1720` |
| `screenXsMax` |  | `number` | `599.99` | `599.99` |

<!-- insert derivedTokens end -->

### 扩展Token

<!-- insert extendedTokens start -->
| 名称 | 描述 | 类型 | default | dark |
|---|---|---|---|---|
| `alertCompColorAlpha` | IxAlert 组件的颜色Alpha值， 仅用于这一个组件 | `number` | `0.1` | `0.2` |
| `colorAddonContainerBg` | 容器附加元素背景色，例如输入框的 addon | `string` | `#f7f9fc` | `#171A1F` |
| `colorBgInverse` | 反向背景颜色，用于有背景颜色的容器中，如幽灵按钮 | `string` | `#2f3540` | `#fff` |
| `colorBgInverseDisabled` | 反向禁用背景颜色，用于有背景颜色的容器中，如幽灵按钮 | `string` | `#1e232b` | `#FFFFFF` |
| `colorBorderInverse` | 反向边框颜色，用于由北京的容器中，如幽灵按钮 | `string` | `#ffffff` | `#0A0C0F` |
| `colorBorderSecondary` | 次级边框颜色，用于组件内容区域分割 | `string` | `#e1e5eb` | `#1F2329` |
| `colorContainerBg` | 组件容器背景颜色 | `string` | `#ffffff` | `#0A0C0F` |
| `colorContainerBgActive` | 组件容器激活状态背景颜色，用于menu、select、tree-select等 | `string` | `#e8f4ff` | `#151D33` |
| `colorContainerBgDisabled` | 组件容器禁用背景颜色 | `string` | `#e1e5eb` | `#1F2329` |
| `colorContainerBgHover` | 组件容器悬浮背景颜色 | `string` | `#f7f9fc` | `#171A1F` |
| `colorEmphasizedContainerBg` | 需要突出显示的容器背景颜色，例如表头 | `string` | `#edf1f7` | `#1F2329` |
| `colorEmphasizedContainerBgDisabled` | 需要突出显示的容器背景颜色，例如表头 | `string` | `#d3d7de` | `#1F2329` |
| `colorEmphasizedContainerBgHover` | 需要突出显示的容器背景颜色，例如表头 | `string` | `#e1e5eb` | `#1F2329` |
| `colorErrorOutline` | 错误状态的组件边框颜色，用于表单控件 | `string` | `#f52727` | `#E8514C` |
| `colorFillContainerBg` | 控件组件容器在未选中时的填充颜色 | `string` | `#bec3cc` | `#687080` |
| `colorIcon` | 图标颜色 | `string` | `#5e6573` | `#A1A7B3` |
| `colorIconActive` | 图标激活颜色 | `string` | `#0d51d9` | `#6AA6F4` |
| `colorIconDisabled` | 图标禁用颜色 | `string` | `#bec3cc` | `#687080` |
| `colorIconHover` | 图标悬浮颜色 | `string` | `#1c6eff` | `#4083E8` |
| `colorIconInfo` | 信息图标颜色，这种图标不可操作，仅展示 | `string` | `#bec3cc` | `#687080` |
| `colorInfoContainerBg` | 信息容器背景颜色，用于组件内容承载的容器， 比如fieldset | `string` | `#f7f9fc` | `#171A1F` |
| `colorInfoContainerBgDisabled` | 信息容器禁用背景颜色，用于组件内有信息承载的容器， 比如fieldset | `string` | `#f7f9fc` | `#171A1F` |
| `colorInfoContainerBgHover` | 信息容器悬浮背景颜色，用于组件内容承载的容器， 比如fieldset | `string` | `#f7f9fc` | `#171A1F` |
| `colorMask` | 遮罩颜色 | `string` | `rgba(0, 0, 0, 0.45)` | `rgba(23, 26, 31, 0.88)` |
| `colorSeparator` | 分割线颜色 | `string` | `#e1e5eb` | `#1F2329` |
| `colorTextDisabled` | 文字禁用颜色 | `string` | `#bec3cc` | `#687080` |
| `colorTextInfo` | 信息，描述 | `string` | `#6f7785` | `#808999` |
| `colorTextInverse` | 反向文字颜色，用于有背景颜色的文字 | `string` | `#ffffff` | `#fff` |
| `colorTextInverseDisabled` | 反向文字禁用，用于有背景颜色的文字 | `string` | `#bec3cc` | `#687080` |
| `colorTextPlaceholder` | placeholder 背景颜色 | `string` | `#a1a7b3` | `#525966` |
| `colorTextTitle` | 标题颜色 | `string` | `#2f3540` | `#F4F8FF` |
| `colorTextTitleSecondary` | 副标题颜色 | `string` | `#454c59` | `#C2C7D1` |
| `colorWarningOutline` | 警告状态的组件边框颜色，用于表单控件 | `string` | `#fdaa1d` | `#FDAA1D` |
| `componentBorderRadius` | 组件边框圆角 | `number` | `2` | `2` |
| `controlBgColor` | 控件背景颜色 | `string` | `#ffffff` | `#0A0C0F` |
| `controlBgColorDisabled` | 控件禁用颜色 | `string` | `#e1e5eb` | `#1F2329` |
| `controlBorderColorActive` | 控件激活态边框颜色 | `string` | `#0d51d9` | `#6AA6F4` |
| `controlBorderColorHover` | 控件悬浮边框颜色 | `string` | `#458fff` | `#1B61DD` |
| `controlBorderRadiusLg` | 控件边框圆角Lg | `number` | `2` | `2` |
| `controlBorderRadiusMd` | 控件边框圆角Md | `number` | `2` | `2` |
| `controlBorderRadiusSm` | 控件边框圆角Sm | `number` | `2` | `2` |
| `controlBorderRadiusXs` | 控件边框圆角Xs | `number` | `2` | `2` |
| `controlBoxShadowFocus` | 控件聚焦，激活时的阴影 | `string` | `0 0 0 2px rgba(28, 110, 255, 0.2)` | `0 0 0 2px rgba(64, 131, 232, 0.2)` |
| `controlBoxShadowInvalid` | 控件校验非法时的阴影 | `string` | `0 0 0 2px rgba(245, 39, 39, 0.2)` | `0 0 0 2px rgba(232, 81, 76, 0.2)` |
| `controlFontSizeLg` | 控件字体大小Lg | `number` | `14` | `14` |
| `controlFontSizeMd` | 控件字体大小Md | `number` | `12` | `12` |
| `controlFontSizeSm` | 控件字体大小Sm | `number` | `12` | `12` |
| `controlFontSizeXs` | 控件字体大小Xs | `number` | `10` | `10` |
| `controlHeightLg` | 控件尺寸Lg | `number` | `40` | `40` |
| `controlHeightMd` | 控件尺寸Md | `number` | `32` | `32` |
| `controlHeightSm` | 控件尺寸Sm | `number` | `24` | `24` |
| `controlHeightXs` | 控件尺寸Xs | `number` | `16` | `16` |
| `controlLineType` | 控件的线框类型 | `string` | `solid` | `solid` |
| `controlLineWidth` | 控件的线框宽度 | `number` | `1` | `1` |
| `controlPaddingSizeHorizontalLg` | 控件横向内间距Lg | `number` | `11` | `11` |
| `controlPaddingSizeHorizontalMd` | 控件横向内间距Md | `number` | `11` | `11` |
| `controlPaddingSizeHorizontalSm` | 控件横向内间距Sm | `number` | `7` | `7` |
| `controlPaddingSizeHorizontalXs` | 控件横向内间距Xs | `number` | `7` | `7` |
| `controlPaddingSizeVerticalLg` | 控件竖向内间距Lg | `number` | `8` | `8` |
| `controlPaddingSizeVerticalMd` | 控件竖向内间距Md | `number` | `5` | `5` |
| `controlPaddingSizeVerticalSm` | 控件竖向内间距Sm | `number` | `1` | `1` |
| `controlPaddingSizeVerticalXs` | 控件竖向内间距Xs | `number` | `0` | `0` |
| `fontSizeIcon` | 图标尺寸，字体大小 | `number` | `16` | `16` |
| `fontWeightHeader` | 头部字体粗度 | `number` | `600` | `600` |
| `overlayArrowSize` | 浮层箭头尺寸 | `number` | `6` | `6` |
| `overlayBgColor` | 浮层背景颜色 | `string` | `#ffffff` | `#0A0C0F` |
| `overlayBorderColor` | 浮层边框颜色 | `string` | `none` | `#1F2329` |
| `overlayBorderRadius` | 浮层边框圆角 | `string | number` | `2` | `2` |
| `overlayBorderType` | 浮层边框样式 | `string` | `solid` | `solid` |
| `overlayBorderWidth` | 浮层边框宽度 | `number` | `0` | `1` |
| `scrollbarHeight` | 滚动条高度 | `number` | `12` | `12` |
| `scrollbarThumbBg` | 滚动条滑块背景颜色 | `string` | `#e1e5eb` | `#1F2329` |
| `scrollbarThumbBgActive` | 滚动条滑块激活背景颜色 | `string` | `#bec3cc` | `#687080` |
| `scrollbarThumbBgHover` | 滚动条滑块悬浮背景颜色 | `string` | `#bec3cc` | `#687080` |
| `scrollbarThumbBorderRadius` | 滚动条滑块边框圆角 | `number` | `6` | `6` |
| `scrollbarThumbBorderWidth` | 滚动条滑块边框颜色 | `number` | `2` | `2` |
| `scrollbarThumbBoxShadow` | 滚动条滑块阴影 | `string` | `none` | `none` |
| `scrollbarTrackBg` | 滚动条轨道背景颜色 | `string` | `unset` | `unset` |
| `scrollbarTrackBorderRadius` | 滚动条轨道边框圆角 | `number` | `0` | `0` |
| `scrollbarTrackBoxShadow` | 滚动条轨道阴影 | `string` | `unset` | `unset` |
| `scrollbarWidth` | 滚动条宽度 | `number` | `12` | `12` |
| `tagCompColorAlpha` | IxTag 组件的颜色Alpha值，仅用于这一个组件 | `number` | `0.1` | `0.2` |

<!-- insert extendedTokens end -->

## FAQ

### 可不可以不使用 IxThemeProvider？

如果由于某些限制无法使用 IxThemeProvider，我们在打包产物中增加了不同主题下的全部 `css` 变量，可以直接在项目中引入这些变量并针对性覆盖。

可以将全量的变量直接引入到项目中：

```ts
// 引入默认主题全量变量
import '@idux/components/default.full.css'

// 引入暗黑主题全量变量
import '@idux/components/dark.full.css'

// 引入pro组件默认主题全量变量
import '@idux/pro/default.full.css'

// 引入pro组件暗黑主题全量变量
import '@idux/pro/dark.full.css'
```

在按需引入的场景中，需要首先引入全局token对应的变量：

```ts
// 引入默认主题全局变量
import '@idux/components/default.css'

// 引入暗黑主题全局变量
import '@idux/components/dark.css'
```

然后，可以选择使用 `unplugin-vue-components` 来按需引入主题变量：

- Vite:

```ts
// vite.config
import { IduxResolver } from 'unplugin-vue-components/resolvers'
import Components from 'unplugin-vue-components/vite'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    /* ... */
    Components({
      resolvers: [IduxResolver({ importStyle: 'css', importStyleTheme: 'default' })],
    }),
  ]
})
```

- Webpack:

```ts
// webpack.config
import { IduxResolver } from 'unplugin-vue-components/resolvers'
import Components from 'unplugin-vue-components/webpack'

module.exports = {
  plugins: [
    /* ... */
    Components({
      resolvers: [IduxResolver({ importStyle: 'css', importStyleTheme: 'default' })],
    }),
  ]
}
```

或者可以手动引入组件的css变量

```ts
// 引入默认主题组件变量
import '@idux/components/button/theme/default'

// 引入暗黑主题组件变量
import '@idux/components/button/theme/dark'
```
