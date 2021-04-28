<template>
  <a :class="ixLinkCls" :href="href" :data-href="href" :title="title" @click="goAnchor">
    <slot>{{ title }}</slot>
  </a>
</template>
<script lang="ts">
import type { LinkProps } from './types'
import { computed, defineComponent, onMounted, onUnmounted, watch, inject } from 'vue'
import { linkPropsDef } from './types'
import { anchorToken } from './token'

export default defineComponent({
  name: 'IxLink',
  props: linkPropsDef,
  setup(props: LinkProps) {
    const prefix = 'ix-anchor-link'

    const { activeLink, handleScrollTo, handleLinkClick, unregisterLink, registerLink } = inject(anchorToken)!

    const ixLinkCls = computed(() => {
      return [`${prefix}`, activeLink.value === props.href ? `${prefix}-active` : '']
    })

    const goAnchor = (evt: MouseEvent) => {
      handleLinkClick(evt, props)
      handleScrollTo(props.href)
    }

    watch(
      () => props.href,
      (newHref, oldHref) => {
        if (newHref !== oldHref) {
          unregisterLink(oldHref)
          registerLink(newHref)
        }
      },
    )

    onMounted(() => {
      registerLink(props.href)
    })

    onUnmounted(() => {
      unregisterLink(props.href)
    })

    return { ixLinkCls, goAnchor }
  },
})
</script>
