/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import { type VNodeChild, computed, defineComponent, normalizeClass, provide } from 'vue'

import { useAccessorAndControl } from '@idux/cdk/forms'
import { useGlobalConfig } from '@idux/components/config'
import { useFormItemRegister } from '@idux/components/form'
import { IxSpace } from '@idux/components/space'

import Radio from './Radio'
import { radioGroupToken } from './token'
import { radioGroupProps } from './types'

export default defineComponent({
  name: 'IxRadioGroup',
  props: radioGroupProps,
  setup(props, { slots }) {
    const common = useGlobalConfig('common')
    const mergedPrefixCls = computed(() => `${common.prefixCls}-radio-group`)
    const { accessor, control } = useAccessorAndControl()
    useFormItemRegister(control)
    provide(radioGroupToken, { props, accessor })

    const mergedGap = computed(() => {
      return props.gap ?? (props.buttoned ? 0 : 8)
    })

    const classes = computed(() => {
      const { buttoned } = props
      const gap = mergedGap.value
      const prefixCls = mergedPrefixCls.value
      return normalizeClass({
        [prefixCls]: true,
        [`${common.prefixCls}-button-group`]: buttoned,
        [`${common.prefixCls}-button-group-compact`]: buttoned && (!gap || gap === '0'),
      })
    })

    return () => {
      const { dataSource } = props
      let children: VNodeChild[] | undefined
      if (dataSource) {
        children = dataSource.map(item => {
          // TODO: remove value
          const { key, value } = item
          return <Radio {...item} key={key ?? value} value={value ?? key} />
        })
      } else {
        children = slots.default ? slots.default() : undefined
      }
      return (
        <IxSpace class={classes.value} size={mergedGap.value}>
          {children}
        </IxSpace>
      )
    }
  },
})
