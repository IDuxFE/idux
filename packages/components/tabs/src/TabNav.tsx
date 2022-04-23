/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import { computed, defineComponent, inject, normalizeClass, ref, watchEffect } from 'vue'

import { useKey } from '@idux/components/utils'

import { tabsToken } from './tokens'
import { tabNavProps } from './types'

export default defineComponent({
  name: 'IxTabNav',
  props: tabNavProps,
  setup(props, { slots }) {
    const key = useKey()

    const { selectedKey, selectedElRef, mergedPrefixCls, handleTabClick } = inject(tabsToken)!

    const selfElRef = ref<HTMLElement | null>(null)
    const isSelected = computed(() => (selectedKey.value ?? props.defaultSelectedKey) === key)
    const prefixCls = computed(() => `${mergedPrefixCls.value}-nav`)
    const classes = computed(() => {
      return normalizeClass({
        [`${prefixCls.value}-tab`]: true,
        [`${prefixCls.value}-tab-selected`]: isSelected.value,
        [`${prefixCls.value}-tab-disabled`]: props.disabled,
      })
    })

    watchEffect(() => {
      if (isSelected.value && selfElRef.value) {
        selectedElRef.value = selfElRef.value
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
        <div class={classes.value} onClick={onClick} ref={selfElRef}>
          {tab}
        </div>
      )
    }
  },
})
