export function getLessTemplate(compName: string): string {
  return `@import '../../style/default.less';

@${compName}-prefix: ~'@{idux-prefix}-${compName}';

.@{${compName}-prefix} {
  color: #fff;
}
`
}

export function getTypesTemplate(compName: string): string {
  return `import type { DefineComponent } from 'vue'

interface ${compName}OriginalProps {
}

export type ${compName}Props = Readonly<${compName}OriginalProps>

export type Ix${compName}Component = InstanceType<DefineComponent<${compName}Props>>
`
}

export function getVueTemplate(compName: string): string {
  return `<template>
  <div></div>
</template>
<script lang="ts">
import { defineComponent } from 'vue'
import { ${compName}Props } from './types'

export default defineComponent({
  name: 'Ix${compName}',
  props: {},
  setup(props:${compName}Props) {
    // init
  },
})
</script>
`
}

export function getIndexTemplate(compName: string): string {
  return `import { installComponent } from '@idux/components/core/utils'
import Ix${compName} from './src/${compName}.vue'

Ix${compName}.install = installComponent(Ix${compName})

export { Ix${compName} }
export type { Ix${compName}Component } from './src/types'
`
}

export function getTestTemplate(compName: string): string {
  return `import { mount, MountingOptions, VueWrapper } from '@vue/test-utils'
import { DefineComponent } from 'vue'
import Ix${compName} from '../src/${compName}.vue'
import { ${compName}Props } from '../src/types'

describe('${compName}.vue', () => {
  let ${compName}Mount: (
    options?: MountingOptions<Partial<${compName}Props>>,
  ) => VueWrapper<InstanceType<DefineComponent<${compName}Props>>>

  beforeEach(() => {
    ${compName}Mount = (options = {}) => {
      return mount<${compName}Props>(Ix${compName}, {
        ...options,
      })
    }
  })

  test('render work', () => {
    const wrapper = ${compName}Mount()
    expect(wrapper.html()).toMatchSnapshot()
  })
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

export function getDocsZhTemplate(compName: string, moduleName: string, upperFirstName: string): string {
  return `---
category: ${moduleName}
type:
title: ${upperFirstName}
subtitle:
cover:
---



## 何时使用



## API

### ix-${compName}

#### Props

| 名称 | 说明 | 类型  | 默认值 | 全局配置 | 备注 |
| --- | --- | --- | --- | --- | --- |
| - | - | - | - | ✅ | - |

`
}

export function getDomeTemplate(compName: string): string {
  return `---
order: 0
title:
  zh: 基本使用
  en: Basic usage
---

## zh



## en



## demo

\`\`\`html
<template>
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
\`\`\`

`
}
