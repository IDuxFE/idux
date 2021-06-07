<template>
  <ix-row v-if="isUseGrid" :gutter="gutter"><slot /></ix-row>
  <div v-else><slot /></div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { IxRow } from '@idux/components/grid'
import { listWrapProps } from './types'

export default defineComponent({
  components: { IxRow },
  props: listWrapProps,
})
</script>
