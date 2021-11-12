/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import type { ModalProps } from './types'
import type { ComputedRef } from 'vue'

import { computed, defineComponent, onBeforeUnmount, provide, ref, watchEffect } from 'vue'

import { CdkPortal } from '@idux/cdk/portal'
import { BlockScrollStrategy } from '@idux/cdk/scroll'
import { callEmit, isPromise, useControlledProp } from '@idux/cdk/utils'
import { ɵMask } from '@idux/components/_private'
import { useGlobalConfig } from '@idux/components/config'

import ModalWrapper from './ModalWrapper'
import { MODAL_TOKEN, modalToken } from './token'
import { modalProps } from './types'

export default defineComponent({
  name: 'IxModal',
  inheritAttrs: false,
  props: modalProps,
  setup(props, { slots, expose, attrs }) {
    const common = useGlobalConfig('common')
    const mergedPrefixCls = computed(() => `${common.prefixCls}-modal`)
    const config = useGlobalConfig('modal')
    const mask = computed(() => props.mask ?? config.mask)
    const zIndex = computed(() => props.zIndex ?? config.zIndex)
    const { visible, setVisible, animatedVisible, mergedVisible } = useVisible(props, mask)
    const { cancelLoading, okLoading, open, close, cancel, ok } = useTrigger(props, setVisible)

    provide(modalToken, {
      props,
      slots,
      common,
      config,
      mergedPrefixCls,
      visible,
      animatedVisible,
      mergedVisible,
      cancelLoading,
      okLoading,
    })

    const apis = { open, close, cancel, ok }
    provide(MODAL_TOKEN, apis)
    expose(apis)

    return () => {
      if (!mergedVisible.value && props.destroyOnHide) {
        return null
      }

      return (
        <CdkPortal target={`${mergedPrefixCls.value}-container`} load={visible.value}>
          <ɵMask
            class={`${mergedPrefixCls.value}-mask`}
            mask={mask.value}
            visible={visible.value}
            zIndex={zIndex.value}
          />
          <ModalWrapper {...attrs}></ModalWrapper>
        </CdkPortal>
      )
    }
  },
})

function useVisible(props: ModalProps, mask: ComputedRef<boolean>) {
  const [visible, setVisible] = useControlledProp(props, 'visible', false)

  const animatedVisible = ref<boolean>()

  const mergedVisible = computed(() => {
    const currVisible = visible.value
    const currAnimatedVisible = animatedVisible.value
    if (currAnimatedVisible === undefined || currVisible) {
      return currVisible
    }
    return currAnimatedVisible
  })

  let scrollStrategy: BlockScrollStrategy | undefined

  watchEffect(() => {
    if (mask.value) {
      if (mergedVisible.value) {
        if (!scrollStrategy) {
          scrollStrategy = new BlockScrollStrategy()
        }
        scrollStrategy.enable()
      } else {
        scrollStrategy?.disable()
      }
    }
  })

  onBeforeUnmount(() => scrollStrategy?.disable())

  return { visible, setVisible, animatedVisible, mergedVisible }
}

function useTrigger(props: ModalProps, setVisible: (value: boolean) => void) {
  const open = () => setVisible(true)

  const close = async (evt?: Event | unknown) => {
    const result = await callEmit(props.onClose, evt)
    if (result === false) {
      return
    }
    setVisible(false)
  }

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

  return { cancelLoading, okLoading, open, close, cancel, ok }
}
