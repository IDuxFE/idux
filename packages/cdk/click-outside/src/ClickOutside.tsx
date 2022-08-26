/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import { defineComponent, h, onBeforeUnmount, ref, watch } from 'vue'

import { callEmit } from '@idux/cdk/utils'

import { clickOutsideProps } from './types'
import { useClickOutside } from './useClickOutside'

export default defineComponent({
  name: 'CdkClickOutside',
  props: clickOutsideProps,
  setup(props, { slots }) {
    const elementRef = ref()
    const handler = (evt: MouseEvent) => callEmit(props.onClickOutside, evt)

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
          stop = useClickOutside(elementRef, handler, options)
        }
      },
      { immediate: true, flush: 'post' },
    )

    onBeforeUnmount(cleanup)

    return () => {
      const tag = props.is as string
      return h(tag, { ref: elementRef, class: 'cdk-click-outside' }, slots)
    }
  },
})
