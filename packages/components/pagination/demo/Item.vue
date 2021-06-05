<template>
  <ix-pagination :pageIndex="1" :total="500" :itemRender="itemRender" />
  <br />
  <ix-pagination :pageIndex="1" :total="500">
    <template #item="{ type, original }">
      <ix-button v-if="type === 'prev'" mode="text" size="small">Previous</ix-button>
      <ix-button v-else-if="type === 'next'" mode="text" size="small">Next</ix-button>
      <component :is="original" v-else />
    </template>
  </ix-pagination>
</template>

<script lang="ts">
import { defineComponent, h } from 'vue'
import { PaginationItemRenderOptions } from '@idux/components/config'
import { IxButton } from '@idux/components/button'

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
