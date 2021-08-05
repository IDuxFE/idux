<template>
  <ix-space>
    <span>isMatched: </span>
    <ix-checkbox disabled :checked="isXs">XS</ix-checkbox>
    <ix-checkbox disabled :checked="isSmOrLg">SM or LG</ix-checkbox>
  </ix-space>
  <br />
  <ix-space>
    <span>useBreakpoints: </span>
    <ix-checkbox disabled :checked="breakpointsState.matches">1024 ~ 1366</ix-checkbox>
  </ix-space>
  <br />
  <ix-space>
    <span>useBreakpointsMatch: </span>
    <ix-checkbox disabled :checked="matchState.xs">XS</ix-checkbox>
    <ix-checkbox disabled :checked="matchState.sm">SM</ix-checkbox>
    <ix-checkbox disabled :checked="matchState.md">1024 ~ 1366</ix-checkbox>
    <ix-checkbox disabled :checked="matchState.all">All</ix-checkbox>
  </ix-space>
  <br />
  <ix-space>
    <span>screens: </span>
    <ix-checkbox disabled :checked="screens.xs">XS</ix-checkbox>
    <ix-checkbox disabled :checked="screens.sm">SM</ix-checkbox>
    <ix-checkbox disabled :checked="screens.md">MD</ix-checkbox>
    <ix-checkbox disabled :checked="screens.lg">LG</ix-checkbox>
    <ix-checkbox disabled :checked="screens.xl">XL</ix-checkbox>
  </ix-space>
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
