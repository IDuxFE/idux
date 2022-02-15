/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import { computed, defineComponent, normalizeClass, provide } from 'vue'

import { Logger, convertCssPixel } from '@idux/cdk/utils'
import { useGlobalConfig } from '@idux/components/config'
import { useFormAccessor } from '@idux/components/utils'

import Checkbox from './Checkbox'
import { checkboxGroupToken } from './token'
import { checkboxGroupProps } from './types'

export default defineComponent({
  name: 'IxCheckboxGroup',
  props: checkboxGroupProps,
  setup(props, { slots }) {
    const common = useGlobalConfig('common')
    const mergedPrefixCls = computed(() => `${common.prefixCls}-checkbox-group`)
    const accessor = useFormAccessor()
    provide(checkboxGroupToken, { props, accessor })

    const classes = computed(() => {
      const { gap } = props
      const prefixCls = mergedPrefixCls.value
      return normalizeClass({
        [prefixCls]: true,
        [`${prefixCls}-with-gap`]: gap != null,
      })
    })

    const style = computed(() => {
      const { gap } = props
      return gap != null ? `gap: ${convertCssPixel(gap)};` : undefined
    })

    return () => {
      const { options, dataSource } = props
      if (options) {
        Logger.warn('components/checkbox', '`options` was deprecated, please use `dataSource` instead')
      }
      const data = options ?? dataSource
      const children = data ? data.map(item => <Checkbox {...item} />) : slots.default?.()
      return (
        <div class={classes.value} style={style.value}>
          {children}
        </div>
      )
    }
  },
})
