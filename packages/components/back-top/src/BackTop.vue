<template>
  <transition name="ix-fade">
    <div v-show="visible" class="ix-back-top" @click.stop="handleClick">
      <slot>
        <ix-icon name="vertical-align-top" />
      </slot>
    </div>
  </transition>
</template>

<script lang="ts">
import type { BackTopProps } from './types'

import { computed, defineComponent, nextTick, onUnmounted, onMounted, ref } from 'vue'
import throttle from 'lodash/throttle'
import { IxIcon } from '@idux/components/icon'
import { PropTypes, withUndefined, on, off, scrollToTop, getScroll } from '@idux/cdk/utils'
import { getTarget } from '@idux/components/utils'
import { useGlobalConfig } from '@idux/components/config'

export default defineComponent({
  name: 'IxBackTop',
  components: { IxIcon },
  props: {
    target: withUndefined(PropTypes.oneOfType([PropTypes.string, HTMLElement])),
    duration: PropTypes.number,
    visibilityHeight: PropTypes.number,
  },
  emits: ['click'],
  setup(props: BackTopProps, { emit }) {
    const backTopConfig = useGlobalConfig('backTop')
    const eventType = 'scroll'
    const visible = ref(false)
    const container = ref<Window | HTMLElement>(null as unknown as HTMLElement)
    const duration = computed(() => props.duration ?? backTopConfig.duration)

    const handleScroll = () => {
      const { scrollTop } = getScroll(container.value)
      visible.value = scrollTop >= (props.visibilityHeight ?? backTopConfig.visibilityHeight)
    }
    const handleClick = (event: MouseEvent) => {
      scrollToTop({ top: 0, duration: duration.value, target: container.value })
      emit('click', event)
    }

    const throttledScrollHandler = throttle(handleScroll, 300)

    onMounted(() => {
      nextTick(() => {
        container.value = getTarget(props.target)
        on(container.value, eventType, throttledScrollHandler)
        handleScroll()
      })
    })

    onUnmounted(() => {
      off(container.value, eventType, throttledScrollHandler)
    })

    return {
      visible,
      handleClick,
    }
  },
})
</script>
