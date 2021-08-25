<template>
  <div v-if="!grid" class="ix-list-item">
    <slot></slot>
  </div>
  <IxCol v-else :xs="grid.xs" :sm="grid.sm" :md="grid.md" :lg="grid.lg" :xl="grid.xl">
    <slot></slot>
  </IxCol>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { IxCol } from '@idux/components/grid'
import { listItemWrapProps } from './types'

export default defineComponent({
  components: { IxCol },
  props: listItemWrapProps,
})
</script>
