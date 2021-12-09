/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import type { DividerProps } from './types'
import type { DividerConfig } from '@idux/components/config'
import type { ComputedRef } from 'vue'

import { computed, defineComponent } from 'vue'

import { hasSlot } from '@idux/cdk/utils'
import { useGlobalConfig } from '@idux/components/config'

import { dividerProps } from './types'

export default defineComponent({
  name: 'IxDivider',
  props: dividerProps,
  setup(props, { slots }) {
    const common = useGlobalConfig('common')
    const mergedPrefixCls = computed(() => `${common.prefixCls}-divider`)
    const dividerConfig = useGlobalConfig('divider')
    const withText = computed(() => hasSlot(slots))
    const className = useClassName(props, dividerConfig, withText, mergedPrefixCls)

    return () => {
      const prefixCls = mergedPrefixCls.value
      return (
        <div class={className.value}>
          {withText.value && <span class={`${prefixCls}-inner-text`}>{slots.default?.()}</span>}
        </div>
      )
    }
  },
})

function useClassName(
  props: DividerProps,
  config: DividerConfig,
  withText: ComputedRef<boolean>,
  mergedPrefixCls: ComputedRef<string>,
) {
  return computed(() => {
    const prefixCls = mergedPrefixCls.value
    const position = props.position || config.position
    const type = props.type || config.type
    const dashed = props.dashed || config.dashed
    const plain = props.plain || config.plain

    return [
      `${prefixCls}-${type}`,
      {
        [`${prefixCls}`]: true,
        [`${prefixCls}-with-text`]: withText.value,
        [`${prefixCls}-dashed`]: dashed,
        [`${prefixCls}-plain`]: plain && withText.value,
        [`${prefixCls}-with-text-${position}`]: type === 'horizontal' && withText.value,
      },
    ]
  })
}
