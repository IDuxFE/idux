<template>
  <IxTooltip :title="lang === 'zh' ? '在 Playground 中打开' : 'Open on Playground'">
    <IxIcon name="bug" @click="onClick" />
  </IxTooltip>
</template>

<script lang="ts">
import { defineComponent, inject } from 'vue'

import { appContextToken } from '../../context'

export default defineComponent({
  name: 'GlobalPlayground',
  props: {
    code: {
      type: String,
      default: '',
    },
  },
  setup(props) {
    const { lang } = inject(appContextToken)!

    const onClick = () => {
      const div = document.createElement('div')
      div.style.display = 'none'

      const url = getPlaygroundUrl(props.code)
      div.innerHTML = `<a href=${url} target="_blank" rel="noopener noreferrer"></a>`

      document.body.appendChild(div)
      div.querySelector<HTMLElement>('a')?.click()
      document.body.removeChild(div)
    }

    return {
      onClick,
      lang,
    }
  },
})

const utoa = (data: string) => {
  return btoa(unescape(encodeURIComponent(data)))
}

const getPlaygroundUrl = (source: string) => {
  const code = decodeURIComponent(source)
  const codeMap = {
    'App.vue': code,
  }
  const codeHash = utoa(JSON.stringify(codeMap))

  return `https://playground.idux.site/#${codeHash}`
}
</script>
