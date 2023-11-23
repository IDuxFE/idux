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
import { useThemeToken } from '@idux/components/theme'

import Checkbox from './Checkbox'
import { checkboxGroupToken } from './token'
import { checkboxGroupProps } from './types'

export default defineComponent({
  name: 'IxCheckboxGroup',
  props: checkboxGroupProps,
  setup(props, { slots }) {
    const common = useGlobalConfig('common')
    const { globalHashId, hashId } = useThemeToken('checkbox')
    const mergedPrefixCls = computed(() => `${common.prefixCls}-checkbox-group`)
    const { accessor, control } = useAccessorAndControl()
    useFormItemRegister(control)
    provide(checkboxGroupToken, { props, accessor })

    const mergedGap = computed(() => {
      return props.gap ?? (props.buttoned ? 0 : 8)
    })

    const classes = computed(() => {
      const { buttoned } = props
      const gap = mergedGap.value
      const prefixCls = mergedPrefixCls.value
      return normalizeClass({
        [globalHashId.value]: !!globalHashId.value,
        [hashId.value]: !!hashId.value,
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
          return <Checkbox {...item} key={key ?? value} value={value ?? key} />
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
