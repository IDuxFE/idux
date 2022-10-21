import { resolve } from 'path'

import { existsSync, readFileSync } from 'fs-extra'
import { loadFront } from 'yaml-front-matter'

import marked from './marked'
import { withoutSuffix } from './utils'

export function parseDemoDocs(id: string, raw: string): string {
  const [filename, , componentName, packageName] = id.split('/').reverse()
  const demoName = withoutSuffix(filename)
  const { __content: content, title } = loadFront(raw)

  const { zhDescription, enDescription, codeHtml, code } = parseContent(id, content, demoName)

  return `
<script lang="ts">
import { computed, defineComponent, inject, ref } from 'vue'
import { appContextToken } from '@idux/site/context'
import ${demoName} from './${demoName}.vue'

export default defineComponent({
  name: '${demoName}',
  components:{ 'raw-demo': ${demoName} },
  setup() {
    const { lang } = inject(appContextToken)!
    return { lang }
  },
})
</script>
<template>
  <GlobalCodeBox
    packageName="${packageName}"
    componentName="${componentName}"
    demoName="${demoName}"
    code="${encodeURIComponent(code)}"
    :title="lang ==='zh' ? '${title.zh}' : '${title.en}'"
  >
    <template #description>
      <template v-if="lang==='zh'">${zhDescription}</template>
      <template v-if="lang==='en'">${enDescription}</template>
    </template>
    <template #rawCode><raw-demo></raw-demo></template>
    <template #highlightCode><div v-pre>${codeHtml}</div></template>
  </GlobalCodeBox>
</template>
`
}

function parseContent(id: string, content: string, demoName: string) {
  const lexer = new marked.Lexer()
  const tokens = lexer.lex(content)

  let flag = 'zh' // 0 zh, 1 en
  let zh = ''
  let en = ''
  let codeHtml = ''
  let code = ''

  tokens.forEach(item => {
    if (item.type === 'heading' && item.depth === 2) {
      if (item.text === 'en') {
        flag = 'en'
      }
      return
    }

    if (flag === 'en') {
      en += marked(item.raw)
    } else {
      zh += marked(item.raw)
    }
  })

  const vueFileName = demoName + '.vue'
  const vueFilePath = resolve(id.replace(`${demoName}.md`, ''), vueFileName)
  if (existsSync(vueFilePath)) {
    code = readFileSync(vueFilePath, 'utf-8')
    codeHtml = marked('```html \r\n' + code + '\r\n ```')
  } else {
    // eslint-disable-next-line no-console
    console.warn(`The demo source file ${vueFilePath} not exist`)
  }

  return { zhDescription: zh, enDescription: en, codeHtml, code }
}
