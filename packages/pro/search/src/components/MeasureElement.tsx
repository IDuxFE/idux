/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import { defineComponent, inject, onMounted, ref, watch } from 'vue'

import { callEmit } from '@idux/cdk/utils'

import { useElementWidthMeasure } from '../composables/useElementWidthMeasure'
import { proSearchContext } from '../token'
import { measureElementProps } from '../types'

export default defineComponent({
  props: measureElementProps,
  setup(props, { slots }) {
    const { mergedPrefixCls } = inject(proSearchContext)!
    const measureElRef = ref<HTMLElement>()
    const measureElWidth = useElementWidthMeasure(measureElRef)

    onMounted(() => {
      watch(measureElWidth, width => {
        callEmit(props.onWidthChange, width)
      })
    })

    return () => (
      <span class={`${mergedPrefixCls.value}-measure-element`} ref={measureElRef}>
        {slots.default?.()}
      </span>
    )
  },
})
