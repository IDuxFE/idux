/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import { computed, defineComponent, inject } from 'vue'

import { useKey } from '@idux/components/utils'

import { tabsToken } from './tokens'
import { tabNavProps } from './types'

export default defineComponent({
  name: 'IxTabNav',
  props: tabNavProps,
  setup(props, { slots }) {
    const key = useKey()
    const { selectedKey, mergedPrefixCls, handleTabClick } = inject(tabsToken)!

    const isSelected = computed(() => selectedKey.value === key)
    const prefixCls = computed(() => `${mergedPrefixCls.value}-nav`)
    const classes = computed(() => {
      return {
        [`${prefixCls.value}-tab`]: true,
        [`${prefixCls.value}-tab-selected`]: isSelected.value,
        [`${prefixCls.value}-tab-disabled`]: props.disabled,
      }
    })

    const onClick = (evt: Event) => {
      if (!props.disabled) {
        handleTabClick(key, evt)
      }
    }

    return () => {
      const tab = <span class={`${prefixCls.value}-tab-label`}> {slots.title?.() ?? props.title}</span>
      return (
        <div class={classes.value} data-key={key} onClick={onClick}>
          {tab}
        </div>
      )
    }
  },
})
