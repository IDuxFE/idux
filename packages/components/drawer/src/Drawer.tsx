/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import type { DrawerProps } from './types'
import type { ScrollStrategy } from '@idux/cdk/scroll'
import type { ComputedRef, Ref } from 'vue'

import { computed, defineComponent, inject, onBeforeUnmount, onMounted, provide, ref, toRef, watch } from 'vue'

import { CdkPortal } from '@idux/cdk/portal'
import { BlockScrollStrategy } from '@idux/cdk/scroll'
import { callEmit, useControlledProp, useZIndex } from '@idux/cdk/utils'
import { ɵMask } from '@idux/components/_private/mask'
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

    const { visible, setVisible, animatedVisible, mergedVisible } = useVisible(props)
    const { currentZIndex } = useZIndex(toRef(props, 'zIndex'), toRef(common, 'zIndex'), visible)

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
      currentZIndex,
      level,
      levelAction,
      push,
      pull,
    })

    const apis = { open, close }
    provide(DRAWER_TOKEN, apis)
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
            zIndex={currentZIndex.value}
          />
          <DrawerWrapper {...attrs}></DrawerWrapper>
        </CdkPortal>
      )
    }
  },
})

function useVisible(props: DrawerProps) {
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

function useScrollStrategy(props: DrawerProps, mask: ComputedRef<boolean>, mergedVisible: ComputedRef<boolean>) {
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
function useTrigger(props: DrawerProps, setVisible: (visible: boolean) => void) {
  const open = () => setVisible(true)

  const close = async (evt?: Event | unknown) => {
    const result = await callEmit(props.onBeforeClose, evt)
    if (result === false) {
      return
    }
    setVisible(false)
    callEmit(props.onClose, evt)
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
