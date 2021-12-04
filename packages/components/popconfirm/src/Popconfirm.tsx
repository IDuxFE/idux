/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import type { PopconfirmProps } from './types'

import { computed, defineComponent, provide, ref } from 'vue'

import { callEmit, isPromise } from '@idux/cdk/utils'
import { ɵOverlay } from '@idux/components/_private'
import { useGlobalConfig } from '@idux/components/config'
import { ɵUseTooltipOverlay } from '@idux/components/tooltip'

import PopconfirmContent from './PopconfirmContent'
import { popconfirmToken } from './token'
import { popconfirmProps } from './types'

export default defineComponent({
  name: 'IxPopconfirm',
  props: popconfirmProps,
  setup(props, { slots, expose }) {
    const common = useGlobalConfig('common')
    const mergedPrefixCls = computed(() => `${common.prefixCls}-popconfirm`)
    const config = useGlobalConfig('popconfirm')

    const { overlayRef, updatePopper, visible, setVisible, overlayProps } = ɵUseTooltipOverlay(
      props,
      config,
      mergedPrefixCls,
    )

    const { cancelLoading, okLoading, cancel, ok } = useTrigger(props, setVisible)

    provide(popconfirmToken, {
      props,
      slots,
      mergedPrefixCls,
      visible,
      cancelLoading,
      okLoading,
      cancel,
      ok,
    })

    expose({ updatePopper, cancel, ok })

    return () => {
      const prefixCls = mergedPrefixCls.value
      return (
        <ɵOverlay
          ref={overlayRef}
          v-slots={{ default: slots.default, content: () => <PopconfirmContent /> }}
          class={prefixCls}
          transitionName={`${common.prefixCls}-fade`}
          {...overlayProps.value}
        />
      )
    }
  },
})

function useTrigger(props: PopconfirmProps, setVisible: (value: boolean) => void) {
  const cancelLoading = ref(false)
  const cancel = async (evt?: Event | unknown) => {
    let result = callEmit(props.onCancel, evt)
    if (isPromise(result)) {
      cancelLoading.value = true
      result = await result
      cancelLoading.value = false
    }
    if (result === false) {
      return
    }
    setVisible(false)
  }

  const okLoading = ref(false)
  const ok = async (evt?: Event | unknown) => {
    let result = callEmit(props.onOk, evt)
    if (isPromise(result)) {
      okLoading.value = true
      result = await result
      okLoading.value = false
    }
    if (result === false) {
      return
    }
    setVisible(false)
  }

  return { cancelLoading, okLoading, cancel, ok }
}
