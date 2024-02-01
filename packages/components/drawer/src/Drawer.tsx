/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import {
  type ComputedRef,
  type Ref,
  computed,
  defineComponent,
  inject,
  nextTick,
  onBeforeUnmount,
  onDeactivated,
  onMounted,
  provide,
  ref,
  toRef,
  watch,
} from 'vue'

import { CdkPortal } from '@idux/cdk/portal'
import { useResizeObserver } from '@idux/cdk/resize'
import { BlockScrollStrategy, type ScrollStrategy } from '@idux/cdk/scroll'
import { callEmit, useControlledProp } from '@idux/cdk/utils'
import { ɵMask } from '@idux/components/_private/mask'
import { useGlobalConfig } from '@idux/components/config'
import { useThemeToken } from '@idux/components/theme'
import { usePortalTarget, useZIndex } from '@idux/components/utils'

import DrawerWrapper from './DrawerWrapper'
import { DRAWER_TOKEN, drawerToken } from './token'
import { type DrawerProps, drawerProps } from './types'
import { getThemeTokens } from '../theme'

export default defineComponent({
  name: 'IxDrawer',
  inheritAttrs: false,
  props: drawerProps,
  setup(props, { slots, expose, attrs }) {
    const common = useGlobalConfig('common')
    const { registerToken } = useThemeToken('drawer')
    registerToken(getThemeTokens)

    const config = useGlobalConfig('drawer')
    const mergedPrefixCls = computed(() => `${common.prefixCls}-drawer`)
    const mergedPortalTarget = usePortalTarget(props, config, common, mergedPrefixCls)

    const mask = computed(() => props.mask ?? config.mask)
    const mergedDistance = computed(() => props.distance ?? config.distance)

    const { loaded, delayedLoaded, visible, setVisible, animatedVisible, isAnimating, mergedVisible } =
      useVisible(props)
    const currentZIndex = useZIndex(toRef(props, 'zIndex'), toRef(common, 'overlayZIndex'), visible)

    const drawerElRef = ref<HTMLElement>()

    const { open, close } = useTrigger(props, setVisible)
    const { levelAction, distance, push, pull } = useLevel(props, visible, mergedDistance, drawerElRef)

    provide(drawerToken, {
      props,
      slots,
      common,
      config,
      mergedPrefixCls,
      drawerElRef,
      visible,
      delayedLoaded,
      animatedVisible,
      isAnimating,
      mergedVisible,
      currentZIndex,
      levelAction,
      distance,
      push,
      pull,
    })

    const apis = { open, close }
    provide(DRAWER_TOKEN, apis)
    expose(apis)

    useScrollStrategy(props, mask, mergedVisible)

    return () => {
      if (!mergedVisible.value && props.destroyOnHide) {
        return null
      }
      return (
        <CdkPortal target={mergedPortalTarget.value} load={loaded.value}>
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

  // because portal is lazy loaded, actual visible at the first time should be delayed
  // or else transition animation will behave unexpectedly
  const loaded = ref<boolean>(false)
  const delayedLoaded = ref<boolean>(false)
  const delayedVisible = ref<boolean>(false)
  const isAnimating = ref(false)
  const animatedVisible = ref<boolean>(false)

  watch(
    visible,
    v => {
      if (v && !loaded.value) {
        loaded.value = true

        nextTick(() => {
          delayedLoaded.value = true
          delayedVisible.value = true
        })
      } else {
        delayedVisible.value = v
      }

      isAnimating.value = true
    },
    {
      immediate: true,
    },
  )

  const mergedVisible = computed(() => visible.value || (isAnimating.value ? animatedVisible.value : visible.value))

  onDeactivated(() => {
    if (mergedVisible.value && props.closeOnDeactivated) {
      setVisible(false)
    }
  })

  return { loaded, delayedLoaded, visible: delayedVisible, setVisible, animatedVisible, isAnimating, mergedVisible }
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

function useLevel(
  props: DrawerProps,
  visible: Ref<boolean>,
  mergedDistance: ComputedRef<number>,
  drawerElRef: Ref<HTMLElement | undefined>,
) {
  const parentContext = inject(drawerToken, null)

  const level = ref(0)
  const distance = ref(0)
  const levelAction = ref<'push' | 'pull'>()
  const drawerSize = ref(0)
  const sizeAttrName = computed(() => (['top', 'bottom'].includes(props.placement) ? 'height' : 'width'))

  let sizeUpdateCb: (() => void) | undefined

  useResizeObserver(drawerElRef, ({ contentRect }) => {
    drawerSize.value = contentRect[sizeAttrName.value] ?? 0

    sizeUpdateCb?.()
  })

  const onSizeUpdate = (cb: () => void) => {
    sizeUpdateCb = () => {
      cb()
      sizeUpdateCb = undefined
    }
  }

  const updateDistance = (childSize: number) => {
    const minDisatance = Math.min(drawerSize.value, mergedDistance.value)
    if (!drawerSize.value || !childSize || drawerSize.value - childSize >= minDisatance) {
      distance.value = 0
    } else {
      distance.value = minDisatance - (drawerSize.value - childSize)
    }
  }

  const push = (childSize: number) => {
    level.value++

    updateDistance(childSize)
    pushParent()
  }

  const pull = (childSize: number) => {
    level.value--

    updateDistance(childSize)
    pullParent()
  }

  const pushParent = () => {
    if (parentContext?.props.placement !== props.placement) {
      return
    }

    parentContext?.push(drawerSize.value + distance.value)
  }
  const pullParent = () => {
    if (parentContext?.props.placement !== props.placement) {
      return
    }

    parentContext?.pull(visible.value ? drawerSize.value + distance.value : 0)
  }

  watch(visible, value => {
    if (value) {
      onSizeUpdate(pushParent)
    } else {
      pullParent()
      levelAction.value = undefined
    }
  })

  watch(level, (currLevel, prevLevel) => {
    levelAction.value = currLevel > prevLevel ? 'push' : 'pull'
  })

  onMounted(() => {
    if (visible.value) {
      pushParent()
    }
  })

  onBeforeUnmount(() => {
    if (visible.value) {
      pullParent()
    }
  })

  return { levelAction, distance, push, pull }
}
