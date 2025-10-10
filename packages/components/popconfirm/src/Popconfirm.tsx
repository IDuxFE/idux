/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import { computed, defineComponent, provide, ref } from 'vue'

import { callEmit, isPromise } from '@idux/cdk/utils'
import { ɵOverlay } from '@idux/components/_private/overlay'
import { useGlobalConfig } from '@idux/components/config'
import { useThemeToken } from '@idux/components/theme'
import { ɵUseTooltipOverlay } from '@idux/components/tooltip'

import PopconfirmContent from './PopconfirmContent'
import { popconfirmToken } from './token'
import { type PopconfirmProps, popconfirmProps } from './types'
import { getThemeTokens } from '../theme'

export default defineComponent({
  name: 'IxPopconfirm',
  props: popconfirmProps,
  setup(props, { slots, expose }) {
    const common = useGlobalConfig('common')
    const { globalHashId, hashId, registerToken } = useThemeToken('popconfirm')
    registerToken(getThemeTokens)

    const locale = useGlobalConfig('locale')
    const config = useGlobalConfig('popconfirm')
    const mergedPrefixCls = computed(() => `${common.prefixCls}-popconfirm`)
    const { overlayRef, updatePopper, visible, setVisible, overlayProps } = ɵUseTooltipOverlay(
      props,
      config,
      mergedPrefixCls,
    )

    const { cancelLoading, okLoading, cancel, ok } = useTrigger(props, setVisible)

    provide(popconfirmToken, {
      props,
      locale,
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
      const { default: defaultSlot, ...restSlots } = slots
      return (
        <ɵOverlay
          ref={overlayRef}
          v-slots={{ default: defaultSlot, content: () => <PopconfirmContent v-slots={restSlots} /> }}
          class={[prefixCls, globalHashId.value, hashId.value]}
          transitionName={`${common.prefixCls}-fade`}
          {...overlayProps.value}
        />
      )
    }
  },
})

function useTrigger(props: PopconfirmProps, setVisible: (value: boolean) => void) {
  const hide = (result: boolean | unknown) => {
    result !== false && setVisible(false)
  }

  const cancelLoading = ref(false)
  const cancel = async (evt?: Event | unknown) => {
    let result = callEmit(props.onCancel, evt)
    if (isPromise(result)) {
      cancelLoading.value = true
      result = await result.finally(() => {
        cancelLoading.value = false
      })
    }
    hide(result)
  }

  const okLoading = ref(false)
  const ok = async (evt?: Event | unknown) => {
    let result = callEmit(props.onOk, evt)
    if (isPromise(result)) {
      okLoading.value = true
      result = await result.finally(() => {
        okLoading.value = false
      })
    }
    hide(result)
  }

  return { cancelLoading, okLoading, cancel, ok }
}
