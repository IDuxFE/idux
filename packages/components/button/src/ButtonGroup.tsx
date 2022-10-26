/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import { computed, defineComponent, normalizeClass, provide } from 'vue'

import { convertCssPixel } from '@idux/cdk/utils'
import { useGlobalConfig } from '@idux/components/config'

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
        [`${prefixCls}-with-gap`]: !!gap,
      })
    })

    const style = computed(() => {
      const { gap } = props
      return gap ? `gap: ${convertCssPixel(gap)};` : undefined
    })

    provide(buttonToken, props)

    return () => (
      <div class={classes.value} style={style.value}>
        {slots.default && slots.default()}
      </div>
    )
  },
})
