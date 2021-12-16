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

        const selectedTab = ref('develop')
        const expanded = ref(false)
        const showDevDemo = ref(false)
    
        return { goLink, selectedTab, expanded, showDevDemo }
      },
    }
    </script>
    `
}

export const getExampleTemplate = (single: boolean, first: string, second?: string): string => {
  if (single) {
    return `
  <IxRow gutter="8">
    <IxCol span="24">
		${first}
	  </IxCol>
  </IxRow>
`
  }
  return `
  <IxRow gutter="16">
    <IxCol lg="12" span="24">
      ${first}
    </IxCol>
    <IxCol lg="12" span="24">
      ${second}
    </IxCol>
  </IxRow>
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
  codeHtml: string
  code: string
}): string => {
  const { packageName, componentName, demoName, zhTitle, enTitle, zhDescription, enDescription, codeHtml, code } =
    options
  return `
<template>
  <global-code-box
    packageName="${packageName}"
    componentName="${componentName}"
    demoName="${demoName}"
    code="${encodeURIComponent(code)}"
    :title="lang==='zh' ? '${zhTitle}' : '${enTitle}'"
  >
    <template #description>
      <template v-if="lang==='zh'">${zhDescription}</template>
      <template v-if="lang==='en'">${enDescription}</template>
    </template>
    <template #rawCode><raw-demo></raw-demo></template>
    <template #highlightCode><div v-pre>${codeHtml}</div></template>
  </global-code-box>
</template>
<script lang="ts">
import { computed, defineComponent, inject, ref } from 'vue'
import { appContextToken } from '@idux/site/context'
import ${demoName} from './${demoName}.vue'

export default defineComponent({
  name: '${packageName}-${componentName}-${demoName}',
  components:{ 'raw-demo': ${demoName} },
  setup() {
    const { lang } = inject(appContextToken)!
    return { lang }
  },
})
</script>
`
}
