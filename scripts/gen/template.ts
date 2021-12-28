export function getThemesTemplate(): string {
  return `@import '../index.less';
@import './default.variable.less';
`
}

export function getThemesVariableTemplate(isPrivate: boolean): string {
  return `@import '${isPrivate ? '../../../../' : '../../../'}style/themes/default.less';`
}

export function getLessTemplate(compName: string, isPrivate: boolean): string {
  return `@import '${isPrivate ? '../../../' : '../../'}style/mixins/reset.less';

.@{${compName}-prefix} {
  .reset-component();
}
`
}

export function getThemesIndexTemplate(category: 'cdk' | 'components' | 'pro'): string {
  return `// style dependencies
import '@idux/${category}/style/core/default'

import './default.less'
`
}

export function getTypesTemplate(upperFirstName: string, camelCaseName: string): string {
  return `import type { DefineComponent, HTMLAttributes } from 'vue'
import type { IxInnerPropTypes, IxPublicPropTypes } from '@idux/cdk/utils'

import { IxPropTypes } from '@idux/cdk/utils'

export const ${camelCaseName}Props = {
  
}

export type ${upperFirstName}Props = IxInnerPropTypes<typeof ${camelCaseName}Props>
export type ${upperFirstName}PublicProps = IxPublicPropTypes<typeof ${camelCaseName}Props>
export type ${upperFirstName}Component = DefineComponent<Omit<HTMLAttributes, keyof ${upperFirstName}PublicProps> & ${upperFirstName}PublicProps>
export type ${upperFirstName}Instance = InstanceType<DefineComponent<${upperFirstName}Props>>
`
}

export function getTsxTemplate(upperFirstName: string, camelCaseName: string): string {
  return `import { defineComponent } from 'vue'
import { ${camelCaseName}Props } from './types'

export default defineComponent({
  name: 'Ix${upperFirstName}',
  props: ${camelCaseName}Props,
  setup(props) {

  }
})
`
}

export function getIndexTemplate(compName: string): string {
  return `import type { ${compName}Component } from './src/types'

import ${compName} from './src/${compName}'

const Ix${compName} = ${compName} as unknown as ${compName}Component

export { Ix${compName} }

export type { ${compName}Instance, ${compName}Component, ${compName}PublicProps as ${compName}Props } from './src/types'
`
}

export function getTestTemplate(compName: string): string {
  return `import { mount, MountingOptions } from '@vue/test-utils'
import { renderWork } from '@tests'
import ${compName} from '../src/${compName}'
import { ${compName}Props } from '../src/types'

describe('${compName}', () => {
  const ${compName}Mount = (options?: MountingOptions<Partial<${compName}Props>>) => mount(${compName}, { ...(options as MountingOptions<${compName}Props>)})

  renderWork<${compName}Props>(${compName},{
    props: { },
  })

  test('xxx work', async () => {
    const wrapper = ${compName}Mount({ props: { xxx: 'Xxx' } })

    expect(wrapper.classes()).toContain('ix-Xxx')

    await wrapper.setProps({ xxx: 'Yyy' })

    expect(wrapper.classes()).toContain('ix-Yyy')
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

export function getDocsTemplate(moduleName: string, compName: string, type = '', isEn = false): string {
  const [enType, zhType] = type.split('_')
  return `---
category: ${moduleName}
type: ${isEn ? enType || '' : zhType || ''}
order: 0
title: ${compName}
subtitle:
---

## API

### Ix${compName}

#### ${compName}Props

${
  isEn
    ? '| Name | Description | Type | Default | Global Config | Remark |'
    : '| 名称 | 说明 | 类型  | 默认值 | 全局配置 | 备注 |'
}
| --- | --- | --- | --- | --- | --- |
| - | - | - | - | ✅ | - |

#### ${compName}Slots

${isEn ? '| Name | Description | Parameter Type | Remark |' : '| 名称 | 说明 | 参数类型 | 备注 |'}
| --- | --- | --- | --- |
| - | - | - | - |

#### ${compName}Methods

${isEn ? '| Name | Description | Parameter Type | Remark |' : '| 名称 | 说明 | 参数类型 | 备注 |'}
| --- | --- | --- | --- |
| - | - | - | - |
`
}

export function getDesignTemplate(isEn = false): string {
  return `## ${isEn ? 'Description' : '组件定义'}

## ${isEn ? 'Usage scenarios' : '使用场景'}`
}

export function getDemoTemplate(): string {
  return `---
order: 0
title:
  zh: 基本使用
  en: Basic usage
---

## zh

最简单的用法。

## en

The simplest usage.
`
}

export function getDemoVueTemplate(compName: string): string {
  return `<template>
  <Ix${compName}></Ix${compName}>
</template>

<script setup lang="ts">
import { ref } from 'vue'

</script>

<style scoped lang="less">
</style>
`
}
