/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import type { PopconfirmProps } from './types'
import type { Slots, VNode } from 'vue'

import { computed, defineComponent, provide, ref } from 'vue'

import { callEmit, isPromise, useControlledProp } from '@idux/cdk/utils'
import { ɵOverlay } from '@idux/components/_private'
import { useGlobalConfig } from '@idux/components/config'
import { ɵUseConfigProps } from '@idux/components/tooltip'

import PopconfirmFooter from './PopconfirmFooter'
import { popconfirmToken } from './token'
import { popconfirmProps } from './types'

const defaultOffset: [number, number] = [0, 12]

export default defineComponent({
  name: 'IxPopconfirm',
  props: popconfirmProps,
  setup(props, { slots }) {
    const common = useGlobalConfig('common')
    const mergedPrefixCls = computed(() => `${common.prefixCls}-popconfirm`)
    const config = useGlobalConfig('popconfirm')

    const { visible, setVisible } = useVisible(props)

    const configProps = ɵUseConfigProps(props, config, mergedPrefixCls, setVisible)

    const { cancelLoading, okLoading, cancel, ok } = useTrigger(props, setVisible)

    provide(popconfirmToken, {
      props,
      slots,
      common,
      config,
      mergedPrefixCls,
      visible,
      cancelLoading,
      okLoading,
      cancel,
      ok,
    })

    return () => {
      const prefixCls = mergedPrefixCls.value
      return (
        <ɵOverlay
          visible={visible.value}
          v-slots={{ default: slots.default, content: () => renderContent(props, slots, prefixCls) }}
          class={prefixCls}
          transitionName={`${common.prefixCls}-fade`}
          {...configProps.value}
          offset={defaultOffset}
          showArrow
        />
      )
    }
  },
})

const renderContent = (props: PopconfirmProps, slots: Slots, prefixCls: string) => {
  if (!(slots.title || props.title)) {
    return null
  }

  const child: VNode[] = []
  if (slots.title || props.title) {
    child.push(<div class={`${prefixCls}-title`}>{slots.title?.() ?? props.title}</div>)
  }
  child.push(<PopconfirmFooter />)

  return child
}
function useVisible(props: PopconfirmProps) {
  const [visible, setVisible] = useControlledProp(props, 'visible', false)

  return { visible, setVisible }
}

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
