<template>
  <div class="header-search-box">
    <IxInput borderless prefix="search" :placeholder="placeholder" disabled />
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, inject } from 'vue'

import { appContextToken } from '../../../context'

export default defineComponent({
  setup() {
    const { lang } = inject(appContextToken)!
    const placeholder = computed(() => {
      return lang.value == 'zh' ? '在 idux.site 中搜索' : 'Search in idux.site'
    })

    return { placeholder }
  },
})
</script>
