---
category: docs
title: 全局配置项
order: 7
---

我们给众多组件添加了**全局配置**功能，你可以通过全局配置来定义组件的默认行为，从而减少在模板中需要写的代码（让你的代码更加清爽）。

支持在运行时修改全局配置项，同时也支持局部覆盖全局配置项。

## 如何使用

如果你想要在全局范围内为某个组件提供默认配置项，请在根组件 `AppComponent` 中使用 `useGlobalConfig` 进行覆盖，例如：

```html
<!-- App.vue -->
<script lang="ts">
import { defineComponent } from 'vue'
import type { ButtonConfig } from '@idux/components'
import { useGlobalConfig } from '@idux/components'

export default defineComponent({
  setup() {
    // 设置 button 组件默认大小为 large
    const buttonConfig = useGlobalConfig('button',  { size: 'large'})

    // 可以动态修改全局配置
    const changeButtonConfig = () => {
      buttonConfig.size = 'small'
    }

    return { changeButtonConfig }
  }
})
</script>
```

同理，如果你只想要再某个业务组件内提供默认配置项，就在业务组件内使用 `useGlobalConfig` 进行覆盖，例如：

```html
<!-- Home.vue -->
<template>
  <ix-button @click="changeButtonConfig">{{ buttonConfig.size }} button</ix-button>
  <ix-button size="large" @click="changeButtonConfig">The Button are always large</ix-button>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import type { ButtonConfig } from '@idux/components'
import { useGlobalConfig } from '@idux/components'

export default defineComponent({
  name: 'Home',
  setup() {
    // 设置 button 组件默认大小为 large, 只会影响当前组件及其子组件内的 button 大小
    const buttonConfig = useGlobalConfig('button',  { size: 'large'})

    // 同样支持动态修改全局配置
    const changeButtonConfig = () => {
      buttonConfig.size = 'small'
    }

    return { buttonConfig, changeButtonConfig }
  }
})
</script>
```

## 全局配置项的优先级

对于任何一个属性来说，各个来源的值的优先级如下：

1. 为组件的某个实例单独设置的值(props)
2. 业务组件(Home.vue)覆盖的全局配置
3. 根组件(App.vue)覆盖的全局配置
4. 组件提供的默认全局配置

## 查看所有可用的全局配置项

[`GlobalConfig`](https://github.com/IduxFE/idux/blob/master/packages/components/core/config/types.ts) 接口提供的类型定义信息能够帮助你找到所有支持全局配置项的组件和属性。

另外，每个组件的文档都会指出哪些属性可以通过全局配置项的方式指定。
