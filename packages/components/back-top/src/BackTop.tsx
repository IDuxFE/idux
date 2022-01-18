/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import { Transition, computed, defineComponent, nextTick, onMounted, onUnmounted, ref } from 'vue'

import { throttle } from 'lodash-es'

import { getScroll, scrollToTop } from '@idux/cdk/scroll'
import { callEmit, off, on } from '@idux/cdk/utils'
import { useGlobalConfig } from '@idux/components/config'
import { IxIcon } from '@idux/components/icon'
import { covertTarget } from '@idux/components/utils'

import { backTopProps } from './types'

export default defineComponent({
  name: 'IxBackTop',
  props: backTopProps,
  setup(props, { slots }) {
    const common = useGlobalConfig('common')
    const mergedPrefixCls = computed(() => `${common.prefixCls}-back-top`)
    const config = useGlobalConfig('backTop')
    const eventType = 'scroll'
    const visible = ref(false)
    const container = ref<Window | HTMLElement>(null as unknown as HTMLElement)
    const duration = computed(() => props.duration ?? config.duration)

    const handleScroll = () => {
      const { scrollTop } = getScroll(container.value)
      visible.value = scrollTop >= (props.visibilityHeight ?? config.visibilityHeight)
    }
    const handleClick = (evt: MouseEvent) => {
      evt.stopPropagation()
      scrollToTop({ top: 0, duration: duration.value, target: container.value })
      callEmit(props.onClick, evt)
    }

    const throttledScrollHandler = throttle(handleScroll, 300)

    onMounted(() => {
      nextTick(() => {
        container.value = covertTarget(props.target)
        on(container.value, eventType, throttledScrollHandler)
        handleScroll()
      })
    })

    onUnmounted(() => {
      off(container.value, eventType, throttledScrollHandler)
    })

    return () => {
      return (
        <Transition name={`${common.prefixCls}-fade`}>
          <div v-show={visible.value} class={mergedPrefixCls.value} onClick={handleClick}>
            {slots.default ? slots.default() : <IxIcon name="vertical-align-top" />}
          </div>
        </Transition>
      )
    }
  },
})
