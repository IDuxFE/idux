/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import { computed, defineComponent, inject, normalizeClass } from 'vue'

import { useGlobalConfig } from '@idux/components/config'
import { IxCol } from '@idux/components/grid'
import { useThemeToken } from '@idux/components/theme'

import { cardToken } from './token'
import { cardGridProps } from './types'
import { getThemeTokens } from '../theme'

export default defineComponent({
  name: 'IxCardGrid',
  props: cardGridProps,
  setup(props, { slots }) {
    const common = useGlobalConfig('common')
    const { globalHashId, hashId, registerToken } = useThemeToken('card')
    registerToken(getThemeTokens)

    const mergedPrefixCls = computed(() => `${common.prefixCls}-card-grid`)
    const { hoverable } = inject(cardToken)!

    const classes = computed(() => {
      const prefixCls = mergedPrefixCls.value
      return normalizeClass({
        [globalHashId.value]: !!globalHashId.value,
        [hashId.value]: !!hashId.value,
        [prefixCls]: true,
        [`${prefixCls}-hoverable`]: props.hoverable ?? hoverable.value,
      })
    })

    return () => <IxCol class={classes.value}>{slots.default?.()}</IxCol>
  },
})
