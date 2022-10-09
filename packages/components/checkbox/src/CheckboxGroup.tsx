/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import { type VNodeChild, computed, defineComponent, normalizeClass, provide } from 'vue'

import { isNil } from 'lodash-es'

import { useAccessorAndControl } from '@idux/cdk/forms'
import { convertCssPixel } from '@idux/cdk/utils'
import { useGlobalConfig } from '@idux/components/config'
import { useFormItemRegister } from '@idux/components/form'
import { IxSpace } from '@idux/components/space'

import Checkbox from './Checkbox'
import { checkboxGroupToken } from './token'
import { checkboxGroupProps } from './types'

export default defineComponent({
  name: 'IxCheckboxGroup',
  props: checkboxGroupProps,
  setup(props, { slots }) {
    const common = useGlobalConfig('common')
    const mergedPrefixCls = computed(() => `${common.prefixCls}-checkbox-group`)
    const { accessor, control } = useAccessorAndControl()
    useFormItemRegister(control)
    provide(checkboxGroupToken, { props, accessor })

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
      const { dataSource, vertical } = props

      let children: VNodeChild[] | undefined
      if (dataSource) {
        children = dataSource.map(item => {
          // TODO: remove value
          const { key, value } = item
          return <Checkbox {...item} key={key ?? value} value={value ?? key} />
        })
      } else {
        children = slots.default ? slots.default() : undefined
      }
      return (
        <div class={classes.value} style={style.value}>
          {vertical ? <IxSpace vertical={true}>{children}</IxSpace> : children}
        </div>
      )
    }
  },
})
