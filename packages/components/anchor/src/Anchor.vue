<template>
  <component :is="tag" :target="target" :offset="offsetTop">
    <div class="ix-anchor-wrapper" :style="wrapperStyle">
      <div ref="anchorRef" class="ix-anchor">
        <div class="ix-anchor-ink">
          <span v-if="!hideLinkBall" :class="inkBallClasses" :style="{ top: inkBallTop }" />
        </div>
        <slot></slot>
      </div>
    </div>
  </component>
</template>
<script lang="ts">
import type { AnchorProps, AnchorLinkProps } from './types'

import { computed, defineComponent, provide, ref } from 'vue'
import { IxAffix } from '@idux/components/affix'
import { useGlobalConfig } from '@idux/components/config'
import { anchorToken } from './token'
import { anchorPropsDef } from './types'
import { useInkBall, useLinks, useScroll } from './useAnchor'

export default defineComponent({
  name: 'IxAnchor',
  components: { IxAffix },
  props: anchorPropsDef,
  emits: ['change', 'click'],
  setup(props: AnchorProps, { emit }) {
    const tag = computed(() => (props.affix ? 'ix-affix' : 'div'))

    const config = useGlobalConfig('anchor')
    const hideLinkBall = computed(() => props.hideLinkBall ?? config.hideLinkBall)
    const bounds = computed(() => props.bounds ?? config.bounds)
    const wrapperStyle = computed(() => {
      const { offsetTop } = props
      return { maxHeight: offsetTop ? `calc(100vh - ${offsetTop}px)` : '100vh' }
    })

    const anchorRef = ref<HTMLDivElement>()

    const { links, activeLink, registerLink, unregisterLink, setActiveLink } = useLinks(emit)
    const { inkBallClasses, inkBallTop } = useInkBall(anchorRef, activeLink)
    const { scrollTo } = useScroll(props, links, bounds, setActiveLink)

    const handleLinkClick = (evt: MouseEvent, linkProps: AnchorLinkProps) => {
      emit('click', evt, linkProps)
      scrollTo(linkProps.href)
    }

    provide(anchorToken, { activeLink, registerLink, unregisterLink, handleLinkClick })

    return {
      tag,
      wrapperStyle,
      anchorRef,
      hideLinkBall,
      inkBallClasses,
      inkBallTop,
    }
  },
})
</script>
