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

import Radio from './Radio'
import { radioGroupToken } from './token'
import { radioGroupProps } from './types'

export default defineComponent({
  name: 'IxRadioGroup',
  props: radioGroupProps,
  setup(props, { slots }) {
    const { accessor, control } = useValueAccessor()
    useFormItemRegister(control)
    provide(radioGroupToken, { props, accessor })

    const common = useGlobalConfig('common')
    const mergedPrefixCls = computed(() => `${common.prefixCls}-radio-group`)

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
      const { options } = props
      const children = options ? options.map(option => <Radio {...option}></Radio>) : slots.default?.()
      return (
        <div class={classes.value} style={style.value}>
          {children}
        </div>
      )
    }
  },
})
