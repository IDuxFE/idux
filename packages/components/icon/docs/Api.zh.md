## API

### IxIcon

#### IconProps

| 名称 | 说明 | 类型  | 默认值 | 全局配置 | 备注 |
| --- | --- | --- | --- | --- | --- |
| `name`| 图标名称 | `string` | - | - | - |
| `color` | 图标颜色 | `string` | - | - | - |
| `iconfont` | 图标是否来自 `iconfont` | `boolean` | - | - | - |
| `rotate` | 图标旋转角度 | `boolean \| number` | `false` | - |  为 `true` 时会循环旋转 |
| `size` | 图标大小 | `number \| string` | - | - | - |

### 辅助函数

| 名称 | 说明 | 参数类型 | 备注 |
| --- | --- | --- | --- |
| `addIconDefinitions` | 用于静态引入图标 | `(icons: IconDefinition[]) => void` | - |
| `fetchIconFormScript` | 用于从 [iconfont](https://www.iconfont.cn) 获取图标资源文件 | `(url: string \| string[])=> void` | - |

## FAQ

### 动态加载和静态加载

无论是 `@idux` 提供的默认图标还是自定义的图标，我们都提供了两种加载方式。  
它们各有优缺点，我们推荐首屏使用到的图标使用静态加载的方式，避免请求数量过多，其他的时候，使用动态加载的方式。

#### 动态加载

是为了减少包体积而提供的方式，当 `IxIcon` 组件检测到要渲染的图标还没有被引入时，会发起 HTTP 请求来动态引入图标。  
你需要配置 `loadIconDynamically`, 通常是在创建 `app` 时。

```ts
// main.ts
import { createGlobalConfig } from '@idux/components/config'

/**
 * 1. 你可以用任意请求库来替换掉 fetch.
 * 2. 你可以将 @idux 的默认图标文件拷贝到 `public/idux-icons` 目录下，当然也可以是任意其他目录. 记得替换掉请求 url 的路径即可。
 * 3. 你也可以使用 `ant-design-icons` 的图标文件。
 * 4. 你还可以将图标文件部署到任意 cdn 中。
 * 5. 其实 `IxIcon` 组件并不关心你的文件在哪，你只需要返回一个 svg 格式的字符串即可。
 */
const loadIconDynamically = (iconName: string) => {
  return fetch(`/idux-icons/${iconName}.svg`).then(res => res.text())
}

const globalConfig = createGlobalConfig({
  icon: { loadIconDynamically },
})

createApp(App).use(globalConfig).mount('#app')
```

如果你需要在局部组件中修改图标文件的来源，也可以通过 `useGlobalConfig` 来覆盖全局配置。

```ts
// MyComponent.vue
import { useGlobalConfig } from '@idux/components/config'

const loadIconDynamically = (iconName: string) => {
  return fetch(`/wow/${iconName}.svg`).then(res => res.text())
}

useGlobalConfig('icon', { loadIconDynamically })
```

你可以 `vite-plugin-static-copy` 或者 `CopyWebpackPlugin` 将默认图标拷贝到 `public/idux-icons` 目录下。

```ts
// vite.config.ts
import { viteStaticCopy } from "vite-plugin-static-copy";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    ...
    viteStaticCopy({
      targets: [
        {
          src: "./node_modules/@idux/components/icon/assets/*.svg",
          dest: "idux-icons", // `loadIconDynamically` 设置的目录名称
        },
      ],
    }),
  ],
});

当然，你也可以手动拷贝，默认图标的存放地址为 `./node_modules/@idux/components/icon/assets`。

#### 静态加载

通过静态加载的图标，引入的 svg 代码会被打包到 `js` 文件中，会增加包的体积。  
你可以在创建 `app` 前，通过调用 `addIconDefinitions` 函数来静态加载图标。  
`IDUX_ICON_DEPENDENCIES` 是 `@idux` 的部分组件默认所使用到图标，建议在此时静态引入。

```ts
// main.ts
import { addIconDefinitions, IDUX_ICON_DEPENDENCIES, Home, Tool } from '@idux/components/icon'

const MyIconDefinition = {
  name: 'my-icon',
  svg: `<svg><path ... /></svg>`
}

addIconDefinitions([...IDUX_ICON_DEPENDENCIES, Home, Tool, MyIconDefinition])

createApp(App).mount('#app')
```

你也可以在任意组件里调用 `addIconDefinitions`, 来静态加载图标。如果你的组件时懒加载的，那么也可以有效避免增加 `main.js` 的体积。  
需要注意的是： 你应该在 `setup` 之外调用 `addIconDefinitions` 函数，因为它只需要在调用一次就够了。

```ts
// MyComponent.vue
import { addIconDefinitions, Home, Tool } from '@idux/components/icon'

const MyIconDefinition = {
  name: 'my-icon',
  svg: `<svg><path ... /></svg>`
}

addIconDefinitions([Home, Tool, MyIconDefinition])

export default defineComponent({
   ...
})
```

### 给图标设置 `padding` 后，可能存在抖动现象

这是因为图标组件中的 `svg` 元素都是动态加载的，加载完成后，会撑开 `i` 标签，可能造成布局抖动。  
为了缓解该现象，我们给 `i` 标签设置了最小宽高: `min-width: 1em; min-height: 1em;`。  
但是，如果你设置了 `padding`，当 `svg` 加载完成后，依旧会撑开 `i` 标签。  
对此，我们推荐的做法是，推荐用一个容器包裹图标组件。

```html
<span style="padding: 4px">
  <IxIcon name="setting"></IxIcon>
</span>
```

这样做还有一个理由，就是让图标回归本身，你应该把它当成文字来使用。  
对于一些交互（例如：点击事件），我们也推荐用一个容器包裹，监听容器的事件，而不是直接监听图标组件。

```html
<span class="setting-wrapper" @click="onClick">
  <IxIcon name="setting"></IxIcon>
</span>
```
