/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import { computed, defineComponent, nextTick, ref } from 'vue'

import { useGlobalConfig } from '@idux/components/config'

import { waveProps } from './types'

export default defineComponent({
  name: 'ɵWave',
  props: waveProps,
  setup(_, { expose }) {
    const common = useGlobalConfig('common')
    const mergedPrefixCls = computed(() => `${common.prefixCls}-wave`)

    const selfRef = ref<HTMLElement>()

    const play = () => {
      nextTick(() => {
        if (selfRef.value && selfRef.value.parentElement && selfRef.value.animate) {
          const borderColor = getComputedStyle(selfRef.value.parentElement).borderColor
          selfRef.value.animate(
            [
              {
                // from
                opacity: 0.6,
                boxShadow: `0 0 1px 0 ${borderColor}`,
                zIndex: 1,
                easing: 'cubic-bezier(0, 0, 0.2, 1)',
              },
              {
                // to
                opacity: 0,
                zIndex: 0,
                boxShadow: `0 0 1px 5px ${borderColor}`,
              },
            ],
            600,
          )
        }
      })
    }

    expose({
      play,
    })

    return () => {
      return <div ref={selfRef} aria-hidden class={mergedPrefixCls.value} />
    }
  },
})
