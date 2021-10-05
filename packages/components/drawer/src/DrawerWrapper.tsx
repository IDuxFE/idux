import { ComputedRef, Ref } from 'vue'

import { computed, defineComponent, inject, ref, Transition } from 'vue'
import { callEmit } from '@idux/cdk/utils'

import DrawerBody from './DrawerBody'
import { drawerToken, DRAWER_TOKEN } from './token'
import { DrawerConfig } from '@idux/components/config'
import { DrawerProps } from './types'

export default defineComponent({
  inheritAttrs: false,
  setup() {
    const { props, config, animatedVisible } = inject(drawerToken)!
    const { close } = inject(DRAWER_TOKEN)!
    const { mask, maskClosable, closeOnEsc, zIndex } = useConfig(props, config)

    const placement = computed(() => props.placement ?? 'right')

    const drawerTransition = computed(() => {
      const drawerTransitionMap = {
        left: [`${prefixCls}-move-left`],
        right: [`${prefixCls}-move-right`],
        top: [`${prefixCls}-move-up`],
        bottom: [`${prefixCls}-move-down`],
      }
      return drawerTransitionMap[placement.value]
    })

    const classes = useClasses(props)

    const wrapperRef = ref<HTMLDivElement>()

    const { onWrapperClick, onWrapperKeydown } = useEvent(close, mask, maskClosable, closeOnEsc)

    const { onAfterEnter, onAfterLeave } = useEvents(props, wrapperRef, animatedVisible)

    return () => {
      return (
        <Transition name={drawerTransition.value} appear onAfterEnter={onAfterEnter} onAfterLeave={onAfterLeave}>
          <div
            v-show={animatedVisible.value}
            ref={wrapperRef}
            class={classes.value}
            style={{ zIndex: zIndex.value }}
            onClick={onWrapperClick}
            onKeydown={onWrapperKeydown}
          >
            <DrawerBody></DrawerBody>
          </div>
        </Transition>
      )
    }
  },
})

const useConfig = (props: DrawerProps, config: DrawerConfig) => {
  const closeOnEsc = computed(() => props.closeOnEsc ?? config.closeOnEsc)
  const mask = computed(() => props.mask ?? config.mask)
  const maskClosable = computed(() => props.maskClosable ?? config.maskClosable)
  const zIndex = computed(() => props.zIndex ?? config.zIndex)

  return { mask, maskClosable, closeOnEsc, zIndex }
}

const useClasses = (props: DrawerProps) => {
  return computed(() => {
    return [[`${prefixCls}-drawer-wrapper`], props.containerClassName]
  })
}

const useEvent = (
  close: (evt: Event) => void,
  mask: ComputedRef<boolean>,
  maskClosable: ComputedRef<boolean>,
  closeOnEsc: ComputedRef<boolean>,
) => {
  const onWrapperClick = (evt: MouseEvent) => {
    if (evt.target === evt.currentTarget && mask.value && maskClosable.value) {
      close(evt)
    }
  }

  const onWrapperKeydown = (evt: KeyboardEvent) => {
    if (closeOnEsc.value && evt.code === 'Escape') {
      evt.stopPropagation()
      close(evt)
      return
    }
  }

  return { onWrapperClick, onWrapperKeydown }
}

const useEvents = (props: DrawerProps, wrapperRef: Ref<HTMLDivElement | undefined>, animatedVisible: Ref<boolean>) => {
  const onAfterEnter = () => {
    const wrapperElement = wrapperRef.value!
    wrapperElement.focus()

    callEmit(props.onAfterOpen)
  }

  const onAfterLeave = () => {
    callEmit(props.onAfterClose)
    animatedVisible.value = false
  }
  return { onAfterEnter, onAfterLeave }
}
