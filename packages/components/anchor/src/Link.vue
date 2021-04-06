<template>
  <a :class="ixLinkCls" :href="href" :data-href="href" :title="title" @click="goAnchor">
    <slot>{{ title }}</slot>
  </a>
</template>
<script lang="ts">
import { computed, defineComponent, onMounted, onUnmounted, watch, inject } from 'vue'
import { AnchorLinksProps, Anchor } from './types'
import { PropTypes } from '@idux/cdk/utils'
import { anchorToken } from './util'

export default defineComponent({
  name: 'IxLink',
  props: {
    href: PropTypes.string,
    title: PropTypes.string,
  },
  setup(props: AnchorLinksProps) {
    const prefix = 'ix-anchor-link'

    const Anchor = inject(anchorToken) as Anchor
    const AnchorContext = Anchor.context;

    const ixLinkCls = computed(() => {
      return [`${prefix}`, Anchor.activeLink.value === props.href ? `${prefix}-active` : '']
    })

    const goAnchor = (e: Event) => {
      const { href, title } = props
      AnchorContext.emit('click', e, { href, title })
      Anchor.handleScrollTo(props.href)
    }

    watch(
      () => props.href,
      (newHref, oldHref) => {
        if (newHref !== oldHref) {
          Anchor.unregisterLink(oldHref)
          Anchor.registerLink(newHref)
        }
      },
    )
    onMounted(() => {
      Anchor.registerLink(props.href)
    })
    onUnmounted(() => {
      Anchor.unregisterLink(props.href)
    })
    return {
      ixLinkCls,
      goAnchor,
    }
  },
})
</script>
