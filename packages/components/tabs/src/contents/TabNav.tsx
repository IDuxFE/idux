/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import {
  computed,
  defineComponent,
  inject,
  normalizeClass,
  onBeforeUnmount,
  onMounted,
  onUpdated,
  shallowRef,
  watchEffect,
} from 'vue'

import { useKey } from '@idux/cdk/utils'
import { IxIcon } from '@idux/components/icon'

import { tabsToken } from '../tokens'
import { tabNavProps } from '../types'
import { getMarginSize } from '../utils'

export default defineComponent({
  name: 'IxTabNav',
  props: tabNavProps,
  setup(props, { slots }) {
    const key = useKey()

    const {
      props: tabsProps,
      mergedPrefixCls,
      handleTabClick,
      handleTabClose,
      navAttrs,
      isHorizontal,
    } = inject(tabsToken)!

    const prefixCls = computed(() => `${mergedPrefixCls.value}-nav-tab`)
    const mergedClosable = computed(() => props.closable ?? tabsProps.closable)
    const sizeProp = computed(() => (isHorizontal.value ? 'offsetWidth' : 'offsetHeight'))
    const offsetProp = computed(() => (isHorizontal.value ? 'offsetLeft' : 'offsetTop'))

    const elementRef = shallowRef<HTMLElement>()

    const setNavAttr = (el: HTMLElement | undefined) => {
      let attr = undefined
      if (el) {
        attr = {
          size: el[sizeProp.value] + getMarginSize(el, isHorizontal.value),
          offset: el[offsetProp.value],
        }
      }
      navAttrs[key] = attr
    }

    onMounted(() => setNavAttr(elementRef.value))
    onUpdated(() => setNavAttr(elementRef.value))
    onBeforeUnmount(() => setNavAttr(undefined))

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
