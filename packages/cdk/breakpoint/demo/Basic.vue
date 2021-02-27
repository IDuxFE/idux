<template>
  <div>
    <p>isSmallScreen: {{ isSmallScreen }}</p>
    <p>layoutChanges: {{ layoutChanges.matches }}</p>
  </div>
</template>

<script lang="ts">
import { defineComponent, watchEffect } from 'vue'
import { Breakpoints, isMatchedBreakpoint, observeBreakpoint } from '@idux/cdk/breakpoint'

export default defineComponent({
  setup() {
    const { sm, lg } = Breakpoints
    const isSmallScreen = isMatchedBreakpoint(sm)
    const layoutChanges = observeBreakpoint([sm, lg])
    watchEffect(() => {
      console.log('breakpoints', layoutChanges.value.breakpoints)
      console.log('matches', layoutChanges.value.matches)
    })
    return { isSmallScreen, layoutChanges }
  },
})
</script>
