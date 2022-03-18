/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import { computed, defineComponent, inject, normalizeClass } from 'vue'

import { callEmit } from '@idux/cdk/utils'
import { IxCheckbox } from '@idux/components/checkbox'
import { IxIcon } from '@idux/components/icon'

import { checkableListContext } from './token'
import { checkableListItemProps } from './types'

export default defineComponent({
  props: checkableListItemProps,
  setup(props, { slots }) {
    const { mergedPrefixCls } = inject(checkableListContext)!

    const onCheckChange = (value: number | boolean | string) => {
      callEmit(props.onCheckChange, !!value)
    }
    const onRemove = () => {
      callEmit(props.onRemove)
    }

    const renderLabel = (prefixCls: string) => {
      const { checked, value, disabled, checkable } = props

      if (checkable) {
        return (
          <IxCheckbox
            class={`${prefixCls}-checkbox`}
            v-slots={slots}
            label={props.label}
            value={value}
            checked={checked}
            disabled={disabled}
            onChange={onCheckChange}
          />
        )
      }

      return <label class={`${prefixCls}-label`}>{slots.default?.() ?? props.label}</label>
    }

    const classes = computed(() => {
      const prefixCls = `${mergedPrefixCls.value}-item`

      return normalizeClass({
        [prefixCls]: true,
        [`${prefixCls}-disabled`]: props.disabled,
      })
    })

    return () => {
      const prefixCls = `${mergedPrefixCls.value}-item`

      return (
        <li class={classes.value}>
          {renderLabel(prefixCls)}
          {props.removable && !props.disabled && (
            <IxIcon class={`${prefixCls}-close-icon`} name="close" onClick={onRemove} />
          )}
        </li>
      )
    }
  },
})
