/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import { type VNodeChild, computed, defineComponent, normalizeClass, provide } from 'vue'

import { isNil } from 'lodash-es'

import { Logger, convertCssPixel } from '@idux/cdk/utils'
import { useGlobalConfig } from '@idux/components/config'
import { useFormAccessor } from '@idux/components/form'

import Radio from './Radio'
import { radioGroupToken } from './token'
import { radioGroupProps } from './types'

export default defineComponent({
  name: 'IxRadioGroup',
  props: radioGroupProps,
  setup(props, { slots }) {
    const accessor = useFormAccessor()

    provide(radioGroupToken, { props, accessor })

    const common = useGlobalConfig('common')
    const mergedPrefixCls = computed(() => `${common.prefixCls}-radio-group`)

    const classes = computed(() => {
      const { gap } = props
      const prefixCls = mergedPrefixCls.value
      return normalizeClass({
        [prefixCls]: true,
        [`${prefixCls}-with-gap`]: !isNil(gap),
      })
    })

    const style = computed(() => {
      const { gap } = props
      return gap != null ? `gap: ${convertCssPixel(gap)};` : undefined
    })

    return () => {
      const { options, dataSource } = props
      if (options) {
        Logger.warn('components/radio', '`options` was deprecated, please use `dataSource` instead')
      }
      const data = options ?? dataSource
      let children: VNodeChild[] | undefined
      if (data) {
        children = data.map(item => {
          const { key, value } = item
          return <Radio {...item} key={key ?? value} value={value ?? key} />
        })
      } else {
        children = slots.default ? slots.default() : undefined
      }
      return (
        <div class={classes.value} style={style.value}>
          {children}
        </div>
      )
    }
  },
})
