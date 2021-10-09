<template>
  <IxSpace>
    <span>isMatched: </span>
    <IxCheckbox disabled :checked="isXs">XS</IxCheckbox>
    <IxCheckbox disabled :checked="isSmOrLg">SM or LG</IxCheckbox>
  </IxSpace>
  <br />
  <IxSpace>
    <span>useBreakpoints: </span>
    <IxCheckbox disabled :checked="breakpointsState.matches">1024 ~ 1366</IxCheckbox>
  </IxSpace>
  <br />
  <IxSpace>
    <span>useBreakpointsMatch: </span>
    <IxCheckbox disabled :checked="matchState.xs">XS</IxCheckbox>
    <IxCheckbox disabled :checked="matchState.sm">SM</IxCheckbox>
    <IxCheckbox disabled :checked="matchState.md">1024 ~ 1366</IxCheckbox>
    <IxCheckbox disabled :checked="matchState.all">All</IxCheckbox>
  </IxSpace>
  <br />
  <IxSpace>
    <span>screens: </span>
    <IxCheckbox disabled :checked="screens.xs">XS</IxCheckbox>
    <IxCheckbox disabled :checked="screens.sm">SM</IxCheckbox>
    <IxCheckbox disabled :checked="screens.md">MD</IxCheckbox>
    <IxCheckbox disabled :checked="screens.lg">LG</IxCheckbox>
    <IxCheckbox disabled :checked="screens.xl">XL</IxCheckbox>
  </IxSpace>
</template>

<script lang="ts">
import { defineComponent, watchEffect } from 'vue'

import { BREAKPOINTS, isMatched, useBreakpoints, useBreakpointsMatch, useScreens } from '@idux/cdk/breakpoint'

export default defineComponent({
  setup() {
    const { xs, sm, lg } = BREAKPOINTS
    const isXs = isMatched(xs)
    const isSmOrLg = isMatched([sm, lg])

    const md = '(min-width: 1024px) and (max-width: 1365.99px)'
    const breakpointsState = useBreakpoints(md)
    watchEffect(() => {
      console.log('useBreakpoints', breakpointsState.medias)
    })

    const all = 'all'
    const matchState = useBreakpointsMatch({ xs, sm, md, all })

    const screens = useScreens()

    return { isXs, isSmOrLg, breakpointsState, matchState, screens }
  },
})
</script>
