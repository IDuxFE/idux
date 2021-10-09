<template>
  <IxPagination :pageIndex="1" :total="500" :itemRender="itemRender" />
  <br />
  <IxPagination :pageIndex="1" :total="500">
    <template #item="{ type, original }">
      <IxButton v-if="type === 'prev'" mode="text" size="small">Previous</IxButton>
      <IxButton v-else-if="type === 'next'" mode="text" size="small">Next</IxButton>
      <component :is="original" v-else />
    </template>
  </IxPagination>
</template>

<script lang="ts">
import { defineComponent, h } from 'vue'

import { IxButton } from '@idux/components/button'
import { PaginationItemRenderOptions } from '@idux/components/config'

export default defineComponent({
  setup() {
    const itemRender = (options: PaginationItemRenderOptions) => {
      const { type, original } = options
      if (type === 'prev' || type === 'next') {
        const text = type === 'prev' ? 'Previous' : 'Next'
        return h(IxButton, { mode: 'text', size: 'small' }, { default: () => text })
      }
      return original
    }
    return { itemRender }
  },
})
</script>
