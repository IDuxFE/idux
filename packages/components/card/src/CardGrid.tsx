/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import { computed, defineComponent, inject } from 'vue'

import { useGlobalConfig } from '@idux/components/config'
import { IxCol } from '@idux/components/grid'

import { cardToken } from './token'
import { cardGridProps } from './types'

export default defineComponent({
  name: 'IxCardGrid',
  props: cardGridProps,
  setup(props, { slots }) {
    const common = useGlobalConfig('common')
    const mergedPrefixCls = computed(() => `${common.prefixCls}-card-grid`)
    const { hoverable } = inject(cardToken)!

    const classes = computed(() => {
      const prefixCls = mergedPrefixCls.value
      return {
        [prefixCls]: true,
        [`${prefixCls}-hoverable`]: props.hoverable ?? hoverable.value,
      }
    })

    return () => <IxCol class={classes.value}>{slots.default?.()}</IxCol>
  },
})
