<template>
  <div v-if="!grid" :class="`${prefixCls}-list-item`">
    <slot></slot>
  </div>
  <IxCol v-else :xs="grid.xs" :sm="grid.sm" :md="grid.md" :lg="grid.lg" :xl="grid.xl">
    <slot></slot>
  </IxCol>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useGlobalConfig } from '@idux/components/config'
import { IxCol } from '@idux/components/grid'
import { listItemWrapProps } from './types'

export default defineComponent({
  components: { IxCol },
  props: listItemWrapProps,
  setup() {
    const { prefixCls } = useGlobalConfig('common')
    return {
      prefixCls,
    }
  },
})
</script>
