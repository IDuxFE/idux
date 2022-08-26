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
    const handler = (evt: ResizeObserverEntry) => callEmit(props.onResize, evt)

    let stop: (() => void) | undefined
    const cleanup = () => {
      if (stop) {
        stop()
        stop = undefined
      }
    }

    watch(
      [() => props.disabled, () => props.options],
      ([disabled, options]) => {
        cleanup()
        if (!disabled) {
          stop = useResizeObserver(elementRef, handler, options).stop
        }
      },
      { immediate: true, flush: 'post' },
    )

    onBeforeUnmount(cleanup)

    return () => {
      const tag = props.is as string
      return h(tag, { ref: elementRef, class: 'cdk-resize-observer' }, slots)
    }
  },
})
