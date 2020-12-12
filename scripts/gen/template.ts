export function getLessTemplate(compName: string): string {
  return `@import '../../style/themes/index';
@import '../../style/mixins/index';
    
@${compName}-prefix: ~'@{idux-prefix}-${compName}';
    
.@{${compName}-prefix} {
  color: #fff;
}`
}

export function getTypesTemplate(compName: string): string {
  return `export interface ${compName}Props {

}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface ${compName}Component extends ${compName}Props {}
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
import ${compName} from './src/${compName}.vue'

${compName}.install = installComponent(${compName})

export { ${compName} }
export type { ${compName}Component } from './src/types'
`
}

export function getTestTemplate(compName: string): string {
  return `import { mount, MountingOptions, VueWrapper } from '@vue/test-utils'
import { DefineComponent } from 'vue'
import ${compName} from '../src/${compName}.vue'
import { ${compName}Props } from '../src/types'

describe('${compName}.vue', () => {
  let buttonMount: (
    options?: MountingOptions<Partial<${compName}Props>>,
  ) => VueWrapper<InstanceType<DefineComponent<${compName}Props>>>

  beforeEach(() => {
    buttonMount = (options = {}) => {
      return mount<${compName}Props>(${compName}, {
        ...options,
      })
    }
  })

  test('render work', () => {
    const wrapper = buttonMount()
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

export function getDocsZhTemplate(compName: string, moduleName: string): string {
  return `---
category: ${moduleName}
type:
title: ${compName}
subtitle:
cover:
---



## 何时使用



## API

| 属性 | 说明 | 类型  | 全局配置 |
| --- | --- | --- | --- |
| - | - | - | - |

`
}

export function getDomeTemplate(compName: string, moduleName: string): string {
  return `---
order: 0
title:
  zh-CN: 基本
  en-US: Basic
---



## zh-CN



## en-US


  
## demo

\`\`\`html
\`\`\`

`
}
