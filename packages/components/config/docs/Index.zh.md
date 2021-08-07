---
category: components
type: 通用
title: Config
subtitle: 全局配置
single: true
---

我们给众多组件添加了**全局配置**功能。

可以通过全局配置来定义组件的默认行为，从而减少在模板中需要写的代码。

支持在运行时修改全局配置项，同时也支持局部覆盖全局配置项。

## 如何使用

### 全局修改默认配置

如果你想要在全局范围内为某个组件提供默认配置项，请在使用 `createGlobalConfig`, 进行覆盖，例如：

```ts
// main.ts
import { createApp } from 'vue'
import { createGlobalConfig } from '@idux/components/config'

const globalConfig = createGlobalConfig({
  button: { size: 'large' },
})

createApp(App).use(globalConfig)
```

### 局部修改默认配置

如果你只想要再某个组件内提供默认配置项，就在当前组件内使用 `useGlobalConfig` 进行覆盖，请参考下面的示例。

## API

### createGlobalConfig

```ts
import type { Plugin } from 'vue';
import type { GlobalConfig, GlobalConfigKey } from './types';

export type DeepPartialGlobalConfig = {
    [K in GlobalConfigKey]?: Partial<GlobalConfig[K]>;
};

/**
 * 创建全局配置插件
 *
 * @param config 用于覆盖默认的全局配置
 */
export const createGlobalConfig: (config: DeepPartialGlobalConfig) => Plugin;
```

### useGlobalConfig

```ts
import type { Plugin } from 'vue';
import type { GlobalConfig, GlobalConfigKey } from './types';

export interface UseGlobalConfig<T extends GlobalConfigKey> {
  /**
   * 当前组件的全局配置
   */
  config: Readonly<GlobalConfig[T]>;
  /**
   * 更改当前组件的全局配置
   */
  changeConfig: (config: Partial<GlobalConfig[T]>) => void;
}

/**
 *
 * @param compName 组件名称
 * @param config 可选的参数，用于覆盖某个组件的全局配置，仅在当前组件(调用者)作用域内生效
 */
export function useGlobalConfig<T extends GlobalConfigKey>(compName: T): Readonly<GlobalConfig[T]>;
export function useGlobalConfig<T extends GlobalConfigKey>(compName: T, config: Partial<GlobalConfig[T]>): UseGlobalConfig<T>;
```

> 需要注意的是: `useGlobalConfig` 参数类型不同的返回结果也不同。

### FAQ

#### 优先级说明

对于任何一个属性来说，各个来源的值的优先级如下：

1. 组件的某个实例单独设置的值, 例如：`<ix-button size="small" />`
2. 业务组件通过 `useGlobalConfig` 覆盖的全局配置, 例如代码演示中的示例
3. 通过 `createGlobalConfig` 设置的全局配置
4. `@idux` 提供的默认全局配置

#### 查看所有可用的全局配置项

[`GlobalConfig`](https://github.com/IDuxFE/idux/blob/master/packages/components/core/config/types.ts) 接口提供的类型定义信息能够帮助你找到所有支持全局配置项的组件和属性。

另外，每个组件的文档都会指出哪些属性可以通过全局配置项的方式指定。
