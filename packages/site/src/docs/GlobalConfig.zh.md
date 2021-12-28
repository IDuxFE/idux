---
category: docs
title: 全局配置
order: 3
---

我们给众多组件添加了**全局配置**功能。

可以通过全局配置来定义组件的默认行为，从而减少在模板中需要写的代码。

支持在初始化时设置全局配置项，同时也支持局部覆盖全局配置项。

## 如何使用

### 初始化设置

如果你想要在全局范围内为某个组件提供默认配置项，请在使用 `createGlobalConfig`, 进行覆盖，例如：

```ts
// main.ts
import { createApp } from 'vue'
import { createGlobalConfig } from '@idux/components/config'

const loadIconDynamically = (iconName: string) => {
  return fetch(`/icon-svg/${iconName}.svg`).then(res => res.text())
}

const globalConfig = createGlobalConfig({
  icon: { loadIconDynamically },
})

createApp(App).use(globalConfig)
```

### 局部覆盖

如果你只想要在某个组件内提供默认配置项，就在当前组件内使用 `useGlobalConfig` 进行覆盖，请参考下面的示例：

```html
<template>
  <p>Default size of form: {{ formConfig.size }}</p>
  <IxSpace>
    <IxButton @click="changeFormConfig({ size: 'sm' })">Small</IxButton>
    <IxButton @click="changeFormConfig({ size: 'md' })">Medium</IxButton>
    <IxButton @click="changeFormConfig({ size: 'lg' })">Large</IxButton>
  </IxSpace>
  <IxForm>
    <IxFormItem><IxInput /></IxFormItem>
    <IxFormItem><IxInput /></IxFormItem>
  </IxForm>
</template>

<script setup lang="ts">
import { useGlobalConfig } from '@idux/components/config'

const [formConfig, changeFormConfig] = useGlobalConfig('form', { size: 'lg' })
</script>
```

## API

### createGlobalConfig

```ts
export type DeepPartialGlobalConfig = {
    [K in GlobalConfigKey]?: Partial<GlobalConfig[K]>
}

/**
 * 创建全局配置插件
 *
 * @param config 用于覆盖默认的全局配置
 */
export const createGlobalConfig: (config: DeepPartialGlobalConfig) => Plugin
```

### useGlobalConfig

```ts
/**
 *
 * @param compName 组件名称
 * @param change 可选的参数，用于覆盖某个组件的全局配置，仅在当前组件(调用者)作用域内生效
 */
export function useGlobalConfig<T extends GlobalConfigKey>(compName: T): Readonly<GlobalConfig[T]>
export function useGlobalConfig<T extends GlobalConfigKey>(
  compName: T,
  config: Partial<GlobalConfig[T]>,
): [Readonly<GlobalConfig[T]>, (config: Partial<GlobalConfig[T]>) => void]
```

> 需要注意的是: `useGlobalConfig` 参数类型不同的返回结果也不同。

## FAQ

### 优先级说明

对于任何一个属性来说，各个来源的值的优先级如下：

1. 组件的某个实例单独设置的值, 例如：`<IxButton size="sm" />`
2. 业务组件通过 `useGlobalConfig` 覆盖的全局配置, 例如代码演示中的示例
3. 通过 `createGlobalConfig` 设置的全局配置
4. `@idux` 提供的默认全局配置

### 设置 `@idux/pro` 中组件的全局配置

在 `@idux/pro` 中也同样提供了 `createGlobalConfig` 和 `useGlobalConfig` 两个 API。

也就是说，把上面例子中的 `@idux/components/config` 替换成 `@idux/pro/config` 即可。

### 查看所有可用的全局配置项

下列接口提供的类型定义信息能够帮助你找到所有支持全局配置项的组件和属性。

- 对于 `@idux/components` 的组件，可以查看[GlobalConfig](https://github.com/IDuxFE/idux/blob/master/packages/components/config/src/types.ts)
- 对于 `@idux/pro` 的组件，可以查看[GlobalConfig](https://github.com/IDuxFE/idux/blob/master/packages/pro/config/src/types.ts)

另外，每个组件的文档都会指出哪些属性可以通过全局配置项的方式指定。
