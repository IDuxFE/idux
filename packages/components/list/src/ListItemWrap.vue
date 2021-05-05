<template>
  <div v-if="!grid" class="ix-list-item">
    <slot></slot>
  </div>
  <ix-col v-else :xs="grid.xs" :sm="grid.sm" :md="grid.md" :lg="grid.lg" :xl="grid.xl">
    <slot></slot>
  </ix-col>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { IxCol } from '@idux/components/grid'
import { ListItemWrapPropTypes } from './types'

export default defineComponent({
  components: {
    IxCol,
  },
  props: ListItemWrapPropTypes,
})
</script>
