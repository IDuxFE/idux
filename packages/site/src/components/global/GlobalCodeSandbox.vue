<template>
  <IxTooltip :title="lang === 'zh' ? '在 CodeSandbox 中打开' : 'Open on CodeSandbox'">
    <IxIcon name="code" @click="onClick" />
  </IxTooltip>
</template>

<script lang="ts">
import { defineComponent, inject } from 'vue'

import { appContextToken } from '../../context'
import { getCsbParams } from '../../global/codesandbox'

export default defineComponent({
  name: 'GlobalCodeSandbox',
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

      const parameters = getCsbParams(props.code)
      const url = `https://codesandbox.io/api/v1/sandboxes/define?parameters=${parameters}`
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
</script>
