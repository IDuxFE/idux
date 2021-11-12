/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import type { DrawerProps } from './types'
import type { ComputedRef, Ref } from 'vue'

import { computed, defineComponent, inject, onBeforeUnmount, onMounted, provide, ref, watch, watchEffect } from 'vue'

import { CdkPortal, useTarget } from '@idux/cdk/portal'
import { BlockScrollStrategy } from '@idux/cdk/scroll'
import { callEmit, useControlledProp } from '@idux/cdk/utils'
import { ɵMask } from '@idux/components/_private'
import { useGlobalConfig } from '@idux/components/config'

import DrawerWrapper from './DrawerWrapper'
import { DRAWER_TOKEN, drawerToken } from './token'
import { drawerProps } from './types'

export default defineComponent({
  name: 'IxDrawer',
  inheritAttrs: false,
  props: drawerProps,
  setup(props, { slots, expose, attrs }) {
    const common = useGlobalConfig('common')
    const mergedPrefixCls = computed(() => `${common.prefixCls}-drawer`)
    const config = useGlobalConfig('drawer')
    const mask = computed(() => props.mask ?? config.mask)
    const zIndex = computed(() => props.zIndex ?? config.zIndex)

    const { visible, setVisible, animatedVisible, mergedVisible } = useVisible(props, mask)
    const { open, close } = useTrigger(props, setVisible)
    const { level, levelAction, push, pull } = useLevel(visible)

    provide(drawerToken, {
      props,
      slots,
      common,
      config,
      mergedPrefixCls,
      visible,
      animatedVisible,
      mergedVisible,
      level,
      levelAction,
      push,
      pull,
    })

    const apis = { open, close }
    provide(DRAWER_TOKEN, apis)
    expose(apis)

    return () => {
      if (!mergedVisible.value && props.destroyOnHide) {
        return null
      }
      const { target } = props
      return (
        <CdkPortal target={target ?? `${mergedPrefixCls.value}-container`} load={visible.value}>
          <ɵMask
            class={`${mergedPrefixCls.value}-mask`}
            mask={mask.value}
            visible={visible.value}
            zIndex={zIndex.value}
          />
          <DrawerWrapper {...attrs}></DrawerWrapper>
        </CdkPortal>
      )
    }
  },
})

function useVisible(props: DrawerProps, mask: ComputedRef<boolean>) {
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

  const target = computed(() => {
    const { target } = props
    return target ? useTarget(target) : undefined
  })

  watch(target, value => scrollStrategy?.update({ target: value }))

  watchEffect(() => {
    if (mask.value) {
      if (mergedVisible.value) {
        if (!scrollStrategy) {
          scrollStrategy = new BlockScrollStrategy({ target: target.value })
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

function useTrigger(props: DrawerProps, setVisible: (visible: boolean) => void) {
  const open = () => setVisible(true)

  const close = async (evt?: Event | unknown) => {
    const result = await callEmit(props.onClose, evt)
    if (result === false) {
      return
    }
    setVisible(false)
  }

  return { open, close }
}

function useLevel(visible: Ref<boolean>) {
  const parentContext = inject(drawerToken, null)

  const level = ref(0)
  const levelAction = ref<'push' | 'pull'>()

  const push = () => {
    level.value++
    parentContext?.push()
  }

  const pull = () => {
    level.value--
    parentContext?.pull()
  }

  watch(visible, value => {
    if (value) {
      parentContext?.push()
    } else {
      parentContext?.pull()
      levelAction.value = undefined
    }
  })

  watch(level, (currLevel, prevLevel) => {
    levelAction.value = currLevel > prevLevel ? 'push' : 'pull'
  })

  onMounted(() => {
    if (visible.value) {
      parentContext?.push()
    }
  })

  onBeforeUnmount(() => {
    if (visible.value) {
      parentContext?.pull()
    }
  })

  return { level, levelAction, push, pull }
}
