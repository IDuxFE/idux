/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import type { DrawerProps } from './types'
import type { DrawerConfig } from '@idux/components/config'
import type { ComputedRef, Ref } from 'vue'

import {
  Transition,
  computed,
  defineComponent,
  inject,
  normalizeClass,
  onBeforeUnmount,
  onMounted,
  ref,
  watch,
} from 'vue'

import { isFunction } from 'lodash-es'

import { callEmit, convertCssPixel } from '@idux/cdk/utils'
import { ɵFooter } from '@idux/components/_private/footer'
import { ɵHeader } from '@idux/components/_private/header'

import { DRAWER_TOKEN, drawerToken } from './token'

const drawerTransitionMap = {
  top: 'move-up',
  bottom: 'move-down',
  start: 'move-start',
  end: 'move-end',
}
const horizontalPlacement = ['start', 'end']
const defaultDistance = 160

export default defineComponent({
  inheritAttrs: false,
  setup(_, { attrs }) {
    const {
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
    } = inject(drawerToken)!
    const { close } = inject(DRAWER_TOKEN)!
    const { closable, closeIcon, closeOnEsc, mask, maskClosable } = useConfig(props, config)

    const transitionName = computed(() => `${common.prefixCls}-${drawerTransitionMap[props.placement]}`)
    const isHorizontal = computed(() => horizontalPlacement.includes(props.placement))
    const placementStyle = computed(() => {
      const { width, height, offset, placement } = props
      const horizontal = isHorizontal.value
      const offsetPixel = convertCssPixel(offset)
      let offsetObj
      if (horizontal) {
        const transformPlacement = placement === 'start' ? 'left' : 'right'
        offsetObj = { top: offsetPixel, [transformPlacement]: 0 }
      } else {
        offsetObj = { left: offsetPixel, [placement]: 0 }
      }
      return {
        width: convertCssPixel(width || (horizontal ? config.width : '100%')),
        height: convertCssPixel(height || (horizontal ? '100%' : config.height)),
        ...offsetObj,
      }
    })

    const transformStyle = computed(() => {
      const { placement } = props
      const horizontal = isHorizontal.value
      const distance = level.value * defaultDistance
      let transform
      if (horizontal) {
        transform = distance > 0 ? `translateX(${placement === 'start' ? distance : -distance}px)` : undefined
      } else {
        transform = distance > 0 ? `translateY(${placement === 'top' ? distance : -distance}px)` : undefined
      }
      return transform
    })

    const wrapperClasses = computed(() => {
      const action = levelAction.value
      const prefixCls = mergedPrefixCls.value
      return normalizeClass({
        [`${prefixCls}-wrapper`]: true,
        [`${prefixCls}-${props.placement}`]: true,
        [`${prefixCls}-opened`]: animatedVisible.value,
        [`${prefixCls}-${action}`]: !!action,
        [`${prefixCls}-with-mask`]: mask.value,
      })
    })

    const wrapperStyle = computed(() => {
      const placement = mask.value ? undefined : placementStyle.value
      return { zIndex: currentZIndex.value, transform: transformStyle.value, ...placement }
    })

    const contentStyle = computed(() => {
      return mask.value ? placementStyle.value : undefined
    })

    const wrapperRef = ref<HTMLDivElement>()
    const sentinelStartRef = ref<HTMLDivElement>()
    const sentinelEndRef = ref<HTMLDivElement>()

    const { onWrapperClick, onWrapperKeydown, onContentMousedown, onContentMouseup } = useEvent(
      close,
      mask,
      maskClosable,
      closeOnEsc,
      sentinelStartRef,
      sentinelEndRef,
    )

    const { onEnter, onAfterEnter, onAfterLeave } = useEvents(props, wrapperRef, animatedVisible)

    onMounted(() => {
      watchVisibleChange(props, wrapperRef, sentinelStartRef, mask)
    })

    return () => {
      const prefixCls = mergedPrefixCls.value

      return (
        <div
          v-show={mergedVisible.value}
          ref={wrapperRef}
          class={wrapperClasses.value}
          style={wrapperStyle.value}
          tabindex={-1}
          onClick={onWrapperClick}
          onKeydown={onWrapperKeydown}
        >
          <Transition
            name={props.animatable ? transitionName.value : undefined}
            appear
            onEnter={onEnter}
            onAfterEnter={onAfterEnter}
            onAfterLeave={onAfterLeave}
          >
            <div
              v-show={visible.value}
              role="document"
              class={prefixCls}
              style={contentStyle.value}
              onMousedown={onContentMousedown}
              onMouseup={onContentMouseup}
              {...attrs}
            >
              <div ref={sentinelStartRef} tabindex={0} class={`${prefixCls}-sentinel`} aria-hidden={true}></div>
              <div class={`${prefixCls}-content`}>
                <ɵHeader
                  v-slots={slots}
                  closable={closable.value}
                  closeIcon={closeIcon.value}
                  header={props.header}
                  onClose={close}
                />
                <div class={`${prefixCls}-body`}>{slots.default?.()}</div>
                <ɵFooter v-slots={slots} class={`${prefixCls}-footer`} footer={props.footer}></ɵFooter>
              </div>
              <div ref={sentinelEndRef} tabindex={0} class={`${prefixCls}-sentinel`} aria-hidden={true}></div>
            </div>
          </Transition>
        </div>
      )
    }
  },
})

function useConfig(props: DrawerProps, config: DrawerConfig) {
  const closable = computed(() => props.closable ?? config.closable)
  const closeIcon = computed(() => props.closeIcon ?? config.closeIcon)
  const closeOnEsc = computed(() => props.closeOnEsc ?? config.closeOnEsc)
  const mask = computed(() => props.mask ?? config.mask)
  const maskClosable = computed(() => props.maskClosable ?? config.maskClosable)

  return { closable, closeIcon, closeOnEsc, mask, maskClosable }
}

function watchVisibleChange(
  props: DrawerProps,
  wrapperRef: Ref<HTMLDivElement | undefined>,
  sentinelStartRef: Ref<HTMLDivElement | undefined>,
  mask: ComputedRef<boolean>,
) {
  let lastOutSideActiveElement: HTMLElement | null = null
  watch(
    () => props.visible,
    visible => {
      if (visible) {
        const wrapperElement = wrapperRef.value!
        const activeElement = document.activeElement
        if (!wrapperElement.contains(activeElement)) {
          lastOutSideActiveElement = activeElement as HTMLElement
          sentinelStartRef.value?.focus()
        }
      } else {
        if (mask.value) {
          lastOutSideActiveElement?.focus?.()
          lastOutSideActiveElement = null
        }
      }
    },
    { immediate: true },
  )
}

function useEvent(
  close: (evt: Event) => void,
  mask: ComputedRef<boolean>,
  maskClosable: ComputedRef<boolean>,
  closeOnEsc: ComputedRef<boolean>,
  sentinelStartRef: Ref<HTMLDivElement | undefined>,
  sentinelEndRef: Ref<HTMLDivElement | undefined>,
) {
  let timeId: number | undefined
  let mouseDown = false

  const clearTimer = () => {
    if (timeId) {
      clearTimeout(timeId)
      timeId = undefined
    }
  }

  const onWrapperClick = (evt: MouseEvent) => {
    if (evt.target === evt.currentTarget && !mouseDown && mask.value && maskClosable.value) {
      close(evt)
    }
  }

  const onWrapperKeydown = (evt: KeyboardEvent) => {
    if (closeOnEsc.value && evt.code === 'Escape') {
      evt.stopPropagation()
      close(evt)
      return
    }

    if (evt.code === 'Tab') {
      const activeElement = document.activeElement
      const sentinelStartElement = sentinelStartRef.value
      const sentinelEndElement = sentinelEndRef.value
      if (evt.shiftKey) {
        if (activeElement === sentinelStartElement) {
          sentinelEndElement?.focus()
        }
      } else if (activeElement === sentinelEndElement) {
        sentinelStartElement?.focus()
      }
    }
  }

  const onContentMousedown = () => {
    clearTimer()
    mouseDown = true
  }

  const onContentMouseup = () => {
    if (mouseDown) {
      timeId = setTimeout(() => (mouseDown = false))
    }
  }

  onBeforeUnmount(() => clearTimer())

  return { onContentMousedown, onContentMouseup, onWrapperClick, onWrapperKeydown }
}

function useEvents(
  props: DrawerProps,
  wrapperRef: Ref<HTMLDivElement | undefined>,
  animatedVisible: Ref<boolean | undefined>,
) {
  let lastOutSideActiveElement: HTMLElement | null = null
  const onEnter = () => {
    const wrapperElement = wrapperRef.value!
    const activeElement = document.activeElement
    if (!wrapperElement.contains(activeElement)) {
      lastOutSideActiveElement = activeElement as HTMLElement
    }
  }

  const onAfterEnter = () => {
    const wrapperElement = wrapperRef.value!
    const activeElement = document.activeElement
    if (!wrapperElement.contains(activeElement)) {
      wrapperElement.focus()
    }

    callEmit(props.onAfterOpen)
    animatedVisible.value = true
  }

  const onAfterLeave = () => {
    if (lastOutSideActiveElement && isFunction(lastOutSideActiveElement.focus)) {
      const wrapperElement = wrapperRef.value!
      const activeElement = document.activeElement

      if (
        !activeElement ||
        activeElement === document.body ||
        activeElement === wrapperElement ||
        wrapperElement.contains(activeElement)
      ) {
        lastOutSideActiveElement.focus()
      }
    }

    callEmit(props.onAfterClose)
    animatedVisible.value = false
  }
  return { onEnter, onAfterEnter, onAfterLeave }
}
