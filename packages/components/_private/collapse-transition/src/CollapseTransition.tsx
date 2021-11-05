/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import { Transition, computed, defineComponent } from 'vue'

import { callEmit } from '@idux/cdk/utils'
import { useGlobalConfig } from '@idux/components/config'

import { collapseTransitionProps } from './types'

export default defineComponent({
  props: collapseTransitionProps,
  setup(props, { slots }) {
    const common = useGlobalConfig('common')
    const mergedPrefixCls = computed(() => `${common.prefixCls}-collapse-transition`)

    const onBeforeEnter = (el: HTMLElement) => {
      const mode = props.mode
      el.style[mode] = `0px`
      el.style.opacity = '0'
    }
    const onEnter = (el: HTMLElement) => {
      const mode = props.mode
      el.style[mode] = `${mode === 'width' ? el.scrollWidth : el.scrollHeight}px`
      el.style.opacity = '1'
    }
    const onAfterEnter = (el: HTMLElement) => {
      const mode = props.mode
      el.style[mode] = ''
      el.style.opacity = ''

      callEmit(props.onAfterEnter)
    }
    const onBeforeLeave = (el: HTMLElement) => {
      const mode = props.mode
      el.style[mode] = `${mode === 'width' ? el.offsetWidth : el.offsetHeight}px`
    }
    const onLeave = (el: HTMLElement) => {
      const mode = props.mode
      el.style[mode] = `0px`
      el.style.opacity = '0'
    }
    const onAfterLeave = (el: HTMLElement) => {
      const mode = props.mode
      el.style[mode] = ''
      el.style.opacity = ''

      callEmit(props.onAfterLeave)
    }

    return () => {
      const { appear, name = mergedPrefixCls.value } = props
      return (
        <Transition
          appear={appear}
          name={name}
          onBeforeEnter={onBeforeEnter}
          onEnter={onEnter}
          onAfterEnter={onAfterEnter}
          onBeforeLeave={onBeforeLeave}
          onLeave={onLeave}
          onAfterLeave={onAfterLeave}
        >
          {slots.default!()}
        </Transition>
      )
    }
  },
})
