export function getLessTemplate(compName: string): string {
  return `@import '../../style/default.less';

@${compName}-prefix: ~'@{idux-prefix}-${compName}';

.@{${compName}-prefix} {

}
`
}

export function getTypesTemplate(upperFirstName: string, camelCaseName: string): string {
  return `import type { DefineComponent } from 'vue'

import { PropTypes } from '@idux/cdk/utils'

export interface ${upperFirstName}Props {
  testProp: string
}

export const ${camelCaseName}PropsDef = {
  testProp: PropTypes.string,
}

export type ${upperFirstName}Component = InstanceType<DefineComponent<${upperFirstName}Props>>
`
}

export function getTsxTemplate(upperFirstName: string, camelCaseName: string): string {
  return `import type { ${upperFirstName}Props } from './types'

import { defineComponent } from 'vue'
import { ${camelCaseName}PropsDef } from './types'

export default defineComponent({
  name: 'Ix${upperFirstName}',
  props: ${camelCaseName}PropsDef,
  emits: [],
  setup(props: ${upperFirstName}Props) {

  }
})
`
}

export function getVueTemplate(upperFirstName: string, camelCaseName: string): string {
  return `<template>
  <div></div>
</template>

<script lang="ts">
import type { ${upperFirstName}Props } from './types'

import { defineComponent } from 'vue'
import { ${camelCaseName}PropsDef } from './types'

export default defineComponent({
  name: 'Ix${upperFirstName}',
  props: ${camelCaseName}PropsDef,
  emits: [],
  setup(props: ${upperFirstName}Props) {
    
  },
})
</script>
`
}

export function getIndexTemplate(compName: string): string {
  return `import type { App } from 'vue'

import Ix${compName} from './src/${compName}.vue'

Ix${compName}.install = (app: App): void => {
  app.component(Ix${compName}.name, Ix${compName})
}

export { Ix${compName} }

export type { ${compName}Component, ${compName}Props } from './src/types'
`
}

export function getTestTemplate(compName: string): string {
  return `import { mount, MountingOptions, VueWrapper } from '@vue/test-utils'
import { renderWork } from '@tests'
import Ix${compName} from '../src/${compName}.vue'
import { ${compName}Props } from '../src/types'

describe('${compName}.vue', () => {
  let ${compName}Mount: (options?: MountingOptions<Partial<${compName}Props>>) => VueWrapper<InstanceType<typeof Ix${compName}>>

  beforeEach(() => {
    ${compName}Mount = options => mount(Ix${compName}, { ...options })
  })

  renderWork(Ix${compName})
})
`
}

export function getCdkUseTemplate(compName: string): string {
  return `export const use${compName} = () => {

}`
}

export function getCdkTestTemplate(compName: string, camelCaseName: string): string {
  return `import { } from '@vue/test-utils'
import { use${compName} } from '../src/use${compName}'

describe('use${compName}.ts', () => {
  test('init test', () => {
    const ${camelCaseName} = use${compName}()

    expect(${camelCaseName}).toBeUndefined()
  })
})
`
}

export function getDocsZhTemplate(
  compName: string,
  moduleName: string,
  upperFirstName: string,
  type = '',
  isEn = false,
): string {
  const [enType, zhType] = type.split('_')
  return `---
category: ${moduleName}
type: ${isEn ? enType ?? '' : zhType}
title: ${upperFirstName}
subtitle:
order: 0
---



## ${isEn ? 'When To Use' : '何时使用'}



## API

### ix-${compName}

#### Props

${
  isEn
    ? '| Name | Description | Type | Default | Global Config | Remark |'
    : '| 名称 | 说明 | 类型  | 默认值 | 全局配置 | 备注 |'
}
| --- | --- | --- | --- | --- | --- |
| - | - | - | - | ✅ | - |

#### Slots

${isEn ? '| Name | Description | Parameter Type | Remark |' : '| 名称 | 说明 | 参数类型 | 备注 |'}
| --- | --- | --- | --- |
| - | - | - | - |

#### Emits

${isEn ? '| Name | Description | Parameter Type | Remark |' : '| 名称 | 说明 | 参数类型 | 备注 |'}
| --- | --- | --- | --- |
| - | - | - | - |
`
}

export function getDemoTemplate(): string {
  return `---
title:
  zh: 基本使用
  en: Basic usage
order: 0
---

## zh

最简单的用法。

## en

The simplest usage.

`
}

export function getDemoVueTemplate(compName: string): string {
  return `<template>
  <ix-${compName} />
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  setup() {

  }
})
</script>

<style lang="less" scoped>
</style>
`
}
