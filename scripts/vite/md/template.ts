import { camelCase, upperFirst } from 'lodash'

export const getComponentScript = (componentName: string, imports: string[], components: string[]): string => {
  return `
    <script lang='ts'>
    import { ref } from 'vue'
    
    ${imports.join('\n')}
    
    export default {
      name: '${componentName}',
      components: { ${components.join(',')} },
      setup() {
        const goLink = (link: string) => {
          if (window) {
            window.location.hash = link
          }
        }
        const expanded = ref(false)
        const expandAll = () => {
          expanded.value = !expanded.value
        }
    
        return { goLink, expanded, expandAll }
      },
    }
    </script>
    `
}

export const getExampleTemplate = (isAlone: boolean, first: string, second?: string): string => {
  if (isAlone) {
    return `
  <div>
	  <div>
		${first}
	  </div>
  </div>
`
  }
  return `
  <div style="display: flex;">
    <div style="flex: 1; width: 50%; padding-right: 16px">
      ${first}
    </div>
    <div style="flex: 1; width: 50%; padding-left: 16px">
      ${second}
    </div>
  </div>
`
}

export const getDemoTemplate = (options: {
  packageName: string
  componentName: string
  demoName: string
  zhTitle: string
  enTitle: string
  zhDescription: string
  enDescription: string
  code: string
}): string => {
  const { packageName, componentName, demoName, zhTitle, enTitle, zhDescription, enDescription, code } = options
  const demoComponentName = upperFirst(camelCase(demoName))
  return `
<template>
  <global-code-box
    packageName="${packageName}"
    componentName="${componentName}"
    demoName="${demoName}"
    :title="language==='zh' ? '${zhTitle}' : '${enTitle}'"
    :copied="copied"
    @copy="onCopy"
  >
    <template #description>
    <span v-if="language==='zh'">${zhDescription}</span>
    <span v-if="language==='en'">${enDescription}</span>
    </template>
    <template #rawCode><raw-demo></raw-demo></template>
    <template #highlightCode><div v-pre>${code}</div></template>
  </global-code-box>
</template>
<script lang="ts">
import { computed, defineComponent, inject, ref } from 'vue'
import { useClipboard } from '@idux/cdk/clipboard'
import ${demoComponentName} from './${demoComponentName}.vue'

export default defineComponent({
  name: '${packageName}-${componentName}-${demoName}',
  components:{ 'raw-demo': ${demoComponentName} },
  setup() {
    const { copy } = useClipboard()
    const copied = ref(false)
    const onCopy = () => {
      if (copied.value) { return }
      // TODO 
      copy('copied').then(successful => {
        copied.value = true
        console.log('copied ', successful)
        setTimeout(() => (copied.value = false), 1000)
      })
    }

    const language = inject('language') as Ref<string>
    return { copied, onCopy, language }
  },
})
</script>
`
}
