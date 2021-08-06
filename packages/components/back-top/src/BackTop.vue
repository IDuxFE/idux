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
import { computed, defineComponent, nextTick, onUnmounted, onMounted, ref } from 'vue'
import { throttle } from 'lodash-es'
import { scrollToTop, getScroll } from '@idux/cdk/scroll'
import { on, off } from '@idux/cdk/utils'
import { useGlobalConfig } from '@idux/components/config'
import { IxIcon } from '@idux/components/icon'
import { getTarget } from '@idux/components/utils'
import { backTopProps } from './types'

export default defineComponent({
  name: 'IxBackTop',
  components: { IxIcon },
  props: backTopProps,
  emits: ['click'],
  setup(props, { emit }) {
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
