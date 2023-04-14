/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import { computed, defineComponent, inject, normalizeClass, shallowRef, watchEffect } from 'vue'

import { IxIcon } from '@idux/components/icon'
import { useKey } from '@idux/components/utils'

import { tabsToken } from '../tokens'
import { tabNavProps } from '../types'

export default defineComponent({
  name: 'IxTabNav',
  props: tabNavProps,
  setup(props, { slots }) {
    const key = useKey()

    const { props: tabsProps, mergedPrefixCls, handleTabClick, handleTabClose } = inject(tabsToken)!

    const prefixCls = computed(() => `${mergedPrefixCls.value}-nav-tab`)
    const mergedClosable = computed(() => props.closable ?? tabsProps.closable)

    const elementRef = shallowRef<HTMLElement>()

    const classes = computed(() => {
      const { disabled, selected } = props
      return normalizeClass({
        [`${prefixCls.value}`]: true,
        [`${prefixCls.value}-disabled`]: disabled,
        [`${prefixCls.value}-selected`]: selected,
      })
    })

    watchEffect(() => {
      const element = elementRef.value
      if (element && props.selected) {
        props.onSelected(element)
      }
    })

    const handleClick = (evt: Event) => {
      if (!props.disabled) {
        handleTabClick(key, evt)
      }
    }

    const handleClose = (evt: Event) => {
      if (!props.disabled) {
        evt.stopPropagation()
        handleTabClose(key)
      }
    }

    return () => {
      if (props.closed) {
        return null
      }
      const titleNode = slots.title
        ? slots.title({ key, disabled: props.disabled, selected: props.selected, title: props.title })
        : props.title
      return (
        <div ref={elementRef} class={classes.value} onClick={handleClick}>
          <span class={`${prefixCls.value}-label`}>{titleNode}</span>
          {mergedClosable.value && (
            <span class={`${mergedPrefixCls.value}-nav-close-icon`} onClick={handleClose}>
              <IxIcon name="close"></IxIcon>
            </span>
          )}
        </div>
      )
    }
  },
})
