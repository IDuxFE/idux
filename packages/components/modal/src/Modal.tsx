/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import { type ComputedRef, computed, defineComponent, onBeforeUnmount, onMounted, provide, ref, watch } from 'vue'

import { CdkPortal } from '@idux/cdk/portal'
import { BlockScrollStrategy, type ScrollStrategy } from '@idux/cdk/scroll'
import { callEmit, isPromise, useControlledProp } from '@idux/cdk/utils'
import { ɵMask } from '@idux/components/_private/mask'
import { useGlobalConfig } from '@idux/components/config'

import ModalWrapper from './ModalWrapper'
import { MODAL_TOKEN, modalToken } from './token'
import { type ModalProps, modalProps } from './types'

export default defineComponent({
  name: 'IxModal',
  inheritAttrs: false,
  props: modalProps,
  setup(props, { slots, expose, attrs }) {
    const common = useGlobalConfig('common')
    const mergedPrefixCls = computed(() => `${common.prefixCls}-modal`)
    const locale = useGlobalConfig('locale')
    const config = useGlobalConfig('modal')
    const mask = computed(() => props.mask ?? config.mask)
    const zIndex = computed(() => props.zIndex ?? config.zIndex)
    const { visible, setVisible, animatedVisible, mergedVisible } = useVisible(props)

    const { cancelLoading, okLoading, open, close, cancel, ok } = useTrigger(props, setVisible)

    provide(modalToken, {
      props,
      slots,
      common,
      locale,
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

    useScrollStrategy(props, mask, mergedVisible)
    const target = computed(() => props.target ?? config.target ?? `${mergedPrefixCls.value}-container`)

    return () => {
      if (!mergedVisible.value && props.destroyOnHide) {
        return null
      }

      return (
        <CdkPortal target={target.value} load={visible.value}>
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

function useVisible(props: ModalProps) {
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

  return { visible, setVisible, animatedVisible, mergedVisible }
}

function useScrollStrategy(props: ModalProps, mask: ComputedRef<boolean>, mergedVisible: ComputedRef<boolean>) {
  let scrollStrategy: ScrollStrategy | undefined

  onMounted(() => {
    watch(
      [mask, mergedVisible],
      ([maskValue, visible]) => {
        if (!maskValue || !visible) {
          scrollStrategy?.disable()
          return
        }
        if (!scrollStrategy) {
          scrollStrategy = props.scrollStrategy ?? new BlockScrollStrategy()
        }
        scrollStrategy.enable()
      },
      { immediate: true },
    )
  })

  onBeforeUnmount(() => scrollStrategy?.disable())
}

function useTrigger(props: ModalProps, setVisible: (value: boolean) => void) {
  const open = () => setVisible(true)
  const hide = (result: boolean | unknown) => {
    result !== false && setVisible(false)
  }

  const close = async (evt?: Event | unknown) => {
    const result = await callEmit(props.onBeforeClose, evt)
    hide(result)
    result !== false && callEmit(props.onClose, evt)
  }

  const cancelLoading = ref(false)
  const cancel = async (evt?: Event | unknown) => {
    let result = callEmit(props.onCancel, evt)
    if (isPromise(result)) {
      cancelLoading.value = true
      result = await result
      hide(result)
      cancelLoading.value = false
      return
    }
    hide(result)
  }

  const okLoading = ref(false)
  const ok = async (evt?: Event | unknown) => {
    let result = callEmit(props.onOk, evt)
    if (isPromise(result)) {
      okLoading.value = true
      result = await result
      hide(result)
      okLoading.value = false
      return
    }
    hide(result)
  }

  return { cancelLoading, okLoading, open, close, cancel, ok }
}
