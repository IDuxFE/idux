/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import { computed, defineComponent, provide } from 'vue'

import { isNil } from 'lodash-es'

import { useValueAccessor } from '@idux/cdk/forms'
import { convertCssPixel } from '@idux/cdk/utils'
import { useGlobalConfig } from '@idux/components/config'
import { useFormItemRegister } from '@idux/components/form'

import Checkbox from './Checkbox'
import { checkboxGroupToken } from './token'
import { checkboxGroupProps } from './types'

export default defineComponent({
  name: 'IxCheckboxGroup',
  props: checkboxGroupProps,
  setup(props, { slots }) {
    const { accessor, control } = useValueAccessor()
    useFormItemRegister(control)
    provide(checkboxGroupToken, { props, accessor })

    const common = useGlobalConfig('common')
    const mergedPrefixCls = computed(() => `${common.prefixCls}-checkbox-group`)

    const classes = computed(() => {
      const { gap } = props
      const prefixCls = mergedPrefixCls.value
      return {
        [prefixCls]: true,
        [`${prefixCls}-with-gap`]: !isNil(gap),
      }
    })

    const style = computed(() => {
      const { gap } = props
      return gap !== 0 ? `gap: ${convertCssPixel(gap)};` : undefined
    })

    return () => {
      const child = props.options ? props.options.map(option => <Checkbox {...option} />) : slots.default?.()
      return (
        <div class={classes.value} style={style.value}>
          {child}
        </div>
      )
    }
  },
})
