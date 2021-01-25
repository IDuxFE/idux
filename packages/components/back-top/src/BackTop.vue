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
import type { SetupContext } from 'vue'
import type { BackTopProps } from './types'

import { defineComponent, ref, onUnmounted, onMounted, nextTick } from 'vue'
import { IxIcon } from '@idux/components/icon'
import { PropTypes, withUndefined, isString, isHTMLElement, on, off, raf } from '@idux/cdk/utils'
import { easeInOutQuad } from '@idux/components/core/utils'
import { useGlobalConfig } from '@idux/components/core/config'
import throttle from 'lodash/throttle'
import { Logger } from '@idux/components/core/logger'

const getTarget = (target: HTMLElement | string | undefined) => {
  const defaultTarget = window

  if (isString(target)) {
    const contaniner = document.querySelector<HTMLElement>(target)

    if (contaniner) {
      return contaniner
    }

    Logger.warn(`target does not exist: ${target}, default value are already used: window.`)
    return defaultTarget
  }

  if (isHTMLElement(target)) {
    return target as HTMLElement
  }

  return defaultTarget
}

const getCurrentScrollTop = (currTarget: Window | HTMLElement) => {
  if (currTarget === window) {
    return window.pageYOffset || document.body.scrollTop || document.documentElement.scrollTop
  }

  return (currTarget as HTMLElement).scrollTop
}

const scrollTo = (y: number, duration: number, container: HTMLElement | Window) => {
  const scrollTop = getCurrentScrollTop(container)
  const startTime = Date.now()
  const change = y - scrollTop

  const frameFunc = () => {
    const time = Date.now() - startTime
    const nextScrollTop = easeInOutQuad(time > duration ? duration : time, scrollTop, change, duration)

    if (container === window) {
      container.scrollTo(window.pageXOffset, nextScrollTop)
    } else {
      ;(container as HTMLElement).scrollTop = nextScrollTop
    }

    if (time < duration) {
      raf(frameFunc)
    }
  }

  raf(frameFunc)
}

export default defineComponent({
  name: 'IxBackTop',
  components: { IxIcon },
  props: {
    target: withUndefined(PropTypes.oneOfType([PropTypes.string, HTMLElement])),
    duration: PropTypes.number,
    visibilityHeight: PropTypes.number,
  },
  emits: ['click'],
  setup(props: BackTopProps, { emit }: SetupContext) {
    const backTopConfig = useGlobalConfig('backTop')
    const eventType = 'scroll'
    const visible = ref(false)
    const container = ref<Window | HTMLElement>((null as unknown) as HTMLElement)

    const handleScroll = () => {
      visible.value = getCurrentScrollTop(container.value) >= (props.visibilityHeight ?? backTopConfig.visibilityHeight)
    }
    const handleClick = (event: MouseEvent) => {
      scrollTo(0, props.duration ?? backTopConfig.duration, container.value)
      emit('click', event)
    }

    const throttledScrollHandler = throttle(handleScroll, 300)

    onMounted(async () => {
      await nextTick()
      container.value = getTarget(props.target)
      on(container.value, eventType, throttledScrollHandler)
      handleScroll()
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
