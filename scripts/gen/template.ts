export function getLessTemplate(compName: string): string {
  return `@import '../../style/default.less';

@${compName}-prefix: ~'@{idux-prefix}-${compName}';

.@{${compName}-prefix} {

}
`
}

export function getTypesTemplate(compName: string): string {
  return `import type { DefineComponent } from 'vue'

interface ${compName}OriginalProps {
}

export type ${compName}Props = Readonly<${compName}OriginalProps>

export type ${compName}Component = InstanceType<DefineComponent<${compName}Props>>
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
export * from './src/types'
`
}

export function getTestTemplate(compName: string): string {
  return `import { mount, MountingOptions, VueWrapper } from '@vue/test-utils'
import { DefineComponent } from 'vue'
import { renderWork } from '@tests'
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



## en


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
