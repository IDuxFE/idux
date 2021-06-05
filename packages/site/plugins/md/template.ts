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

export const getExampleTemplate = (single: boolean, first: string, second?: string): string => {
  if (single) {
    return `
  <ix-row gutter="8">
    <ix-col span="24">
		${first}
	  </ix-col>
  </ix-row>
`
  }
  return `
  <ix-row gutter="16">
    <ix-col lg="12" span="24">
      ${first}
    </ix-col>
    <ix-col lg="12" span="24">
      ${second}
    </ix-col>
  </ix-row>
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
  return `
<template>
  <global-code-box
    packageName="${packageName}"
    componentName="${componentName}"
    demoName="${demoName}"
    :title="lang==='zh' ? '${zhTitle}' : '${enTitle}'"
    :copied="copied"
    @copy="onCopy"
  >
    <template #description>
    <span v-if="lang==='zh'">${zhDescription}</span>
    <span v-if="lang==='en'">${enDescription}</span>
    </template>
    <template #rawCode><raw-demo></raw-demo></template>
    <template #highlightCode><div v-pre>${code}</div></template>
  </global-code-box>
</template>
<script lang="ts">
import { computed, defineComponent, inject, ref } from 'vue'
import { useClipboard } from '@idux/cdk/clipboard'
import { appContextToken } from '@idux/site/context'
import ${demoName} from './${demoName}.vue'

export default defineComponent({
  name: '${packageName}-${componentName}-${demoName}',
  components:{ 'raw-demo': ${demoName} },
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

    const { lang } = inject(appContextToken)!
    return { copied, onCopy, lang }
  },
})
</script>
`
}
