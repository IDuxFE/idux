/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import { VNodeChild, computed, defineComponent, inject, normalizeClass } from 'vue'

import { callEmit } from '@idux/cdk/utils'
import { IxCheckbox } from '@idux/components/checkbox'
import { IxIcon } from '@idux/components/icon'
import { convertStringVNode } from '@idux/components/utils'

import { transferListContext } from '../token'
import { transferListItemProps } from '../types'

export default defineComponent({
  props: transferListItemProps,
  setup(props, { slots }) {
    const { mergedPrefixCls } = inject(transferListContext)!

    const onCheckChange = (value: number | boolean | string) => {
      callEmit(props.onCheckChange, !!value)
    }
    const onRemove = () => {
      callEmit(props.onRemove)
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

      const children: VNodeChild[] = []
      if (props.checkable) {
        children.push(
          <IxCheckbox
            class={`${prefixCls}-checkbox`}
            v-slots={slots}
            label={props.label}
            value={props.value}
            checked={props.checked}
            disabled={props.disabled}
            onChange={onCheckChange}
          />,
        )
      } else {
        const labelNode = convertStringVNode(slots.default, props.label)
        children.push(<label class={`${prefixCls}-label`}>{labelNode}</label>)
      }

      if (props.removable && !props.disabled) {
        children.push(
          <div class={`${prefixCls}-close-icon`} onClick={onRemove}>
            <IxIcon name="close" />
          </div>,
        )
      }

      return <li class={classes.value}>{children}</li>
    }
  },
})
