/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import { defineComponent, h, onBeforeUnmount, ref, watch } from 'vue'

import { callEmit } from '@idux/cdk/utils'

import { resizeObserverProps } from './types'
import { useResizeObserver } from './useResizeObserver'

export default defineComponent({
  name: 'CdkResizeObserver',
  props: resizeObserverProps,
  setup(props, { slots }) {
    const elementRef = ref()
    const handlerResize = (evt: ResizeObserverEntry) => callEmit(props.onResize, evt)

    let stopHandler: (() => void) | undefined

    const cleanup = () => {
      if (stopHandler) {
        stopHandler()
        stopHandler = undefined
      }
    }

    watch(
      [() => props.disabled, () => props.options, () => props.onResize],
      ([disabled, options, onResize]) => {
        cleanup()
        if (!disabled && onResize) {
          stopHandler = useResizeObserver(elementRef, handlerResize, options).stop
        }
      },
      {
        immediate: true,
        flush: 'post',
      },
    )

    onBeforeUnmount(cleanup)

    return () => {
      const tag = props.is as string
      return h(tag, { ref: elementRef, class: 'cdk-resize-observer' }, slots)
    }
  },
})
