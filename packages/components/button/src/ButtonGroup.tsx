/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import { computed, defineComponent, normalizeClass, provide } from 'vue'

import { useGlobalConfig } from '@idux/components/config'
import { IxSpace } from '@idux/components/space'

import { buttonToken } from './token'
import { buttonGroupProps } from './types'

export default defineComponent({
  name: 'IxButtonGroup',
  props: buttonGroupProps,
  setup(props, { slots }) {
    const common = useGlobalConfig('common')
    const mergedPrefixCls = computed(() => `${common.prefixCls}-button-group`)

    const classes = computed(() => {
      const { gap } = props
      const prefixCls = mergedPrefixCls.value
      return normalizeClass({
        [prefixCls]: true,
        [`${prefixCls}-compact`]: !gap || gap === '0',
      })
    })

    provide(buttonToken, props)

    return () => (
      <IxSpace class={classes.value} block={props.block} size={props.gap}>
        {slots.default && slots.default()}
      </IxSpace>
    )
  },
})
