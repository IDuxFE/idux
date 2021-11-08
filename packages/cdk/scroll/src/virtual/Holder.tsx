/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import type { OriginScroll } from './composables/useScroll'
import type { ComputedRef, Ref, StyleValue } from 'vue'

import { computed, defineComponent, inject, onBeforeUnmount, onMounted, ref, watch } from 'vue'

import { isNil, throttle } from 'lodash-es'

import { isFirefox } from '@idux/cdk/platform'
import { callEmit, cancelRAF, off, offResize, on, onResize, rAF } from '@idux/cdk/utils'

import { virtualScrollToken } from './token'

export default defineComponent({
  setup(_, { slots }) {
    const {
      props,
      holderRef,
      fillerRef,
      useVirtual,
      collectHeights,
      scrollState,
      scrollTop,
      scrollMoving,
      syncScrollTop,
      originScroll,
    } = inject(virtualScrollToken)!

    const style = computed<StyleValue | undefined>(() => {
      const { height, fullHeight } = props
      if (height <= 0) {
        return undefined
      }
      return {
        [fullHeight ? 'height' : 'maxHeight']: height + 'px',
        overflowY: useVirtual.value ? 'hidden' : 'auto',
        overflowAnchor: 'none',
        pointerEvents: useVirtual.value && scrollMoving.value ? 'none' : undefined,
      }
    })

    const onScroll = (evt: Event) => {
      const { scrollTop: newScrollTop } = evt.currentTarget as Element
      if (newScrollTop !== scrollTop.value) {
        syncScrollTop(newScrollTop)
      }
      callEmit(props.onScroll, evt)
    }

    const fillerStyle = computed<StyleValue | undefined>(() => {
      const { offset, scrollHeight } = scrollState.value
      if (isNil(offset)) {
        return undefined
      }
      return { height: `${scrollHeight}px`, position: 'relative', overflow: 'hidden' }
    })

    const contentStyle = computed<StyleValue>(() => {
      const { offset } = scrollState.value
      if (isNil(offset)) {
        return {
          display: 'flex',
          flexDirection: 'column',
        }
      }
      return {
        display: 'flex',
        flexDirection: 'column',
        transform: `translateY(${offset}px)`,
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
      }
    })

    useEvents(holderRef, useVirtual, syncScrollTop, originScroll)

    const contentRef = ref<HTMLDivElement>()
    const onContentResize = throttle(collectHeights, 16)

    onMounted(() => onResize(contentRef.value, onContentResize))
    onBeforeUnmount(() => offResize(contentRef.value, onContentResize))

    return () => {
      const children = props.contentRender ? props.contentRender(slots.default!()) : slots.default!()
      return (
        <div ref={holderRef} class="cdk-virtual-scroll-holder" style={style.value} onScroll={onScroll}>
          <div ref={fillerRef} class="cdk-virtual-scroll-filler" style={fillerStyle.value}>
            <div ref={contentRef} class="cdk-virtual-scroll-content" style={contentStyle.value}>
              {children}
            </div>
          </div>
        </div>
      )
    }
  },
})

function useEvents(
  holderRef: Ref<HTMLElement | undefined>,
  useVirtual: ComputedRef<boolean>,
  syncScrollTop: (newTop: number | ((prev: number) => number)) => void,
  originScroll: OriginScroll,
) {
  // Since this added in global,should use ref to keep update
  const { onWheel, onFireFoxScroll } = useFrameWheel(useVirtual, originScroll, offsetY => {
    syncScrollTop(top => {
      const newTop = top + offsetY
      return newTop
    })
  })

  // Mobile touch move
  useMobileTouchMove(holderRef, useVirtual, (deltaY, smoothOffset) => {
    if (originScroll(deltaY, smoothOffset)) {
      return false
    }

    onWheel({ preventDefault() {}, deltaY } as WheelEvent)
    return true
  })

  // Firefox only
  const onMozMousePixelScroll = (evt: Event) => {
    if (useVirtual.value) {
      evt.preventDefault()
    }
  }

  const removeEventListener = (element: HTMLElement | undefined) => {
    off(element, 'wheel', onWheel)
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    off(element, 'DOMMouseScroll', onFireFoxScroll as any)
    off(element, 'MozMousePixelScroll', onMozMousePixelScroll)
  }

  onMounted(() => {
    watch(
      holderRef,
      (currElement, prevElement) => {
        removeEventListener(prevElement)
        on(currElement, 'wheel', onWheel)
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        on(currElement, 'DOMMouseScroll', onFireFoxScroll as any)
        on(currElement, 'MozMousePixelScroll', onMozMousePixelScroll)
      },
      { immediate: true },
    )
  })

  onBeforeUnmount(() => removeEventListener(holderRef.value))
}

interface FireFoxDOMMouseScrollEvent {
  detail: number
  preventDefault: () => void
}

const useFrameWheel = (inVirtual: Ref<boolean>, originScroll: OriginScroll, onWheelDelta: (offset: number) => void) => {
  let offset = 0
  let rafId: number

  // Firefox patch
  let wheelValue: number
  let isMouseScroll = false

  function onWheel(evt: WheelEvent) {
    if (!inVirtual.value) {
      return
    }

    cancelRAF(rafId)

    const { deltaY } = evt
    offset += deltaY
    wheelValue = deltaY

    // Do nothing when scroll at the edge, Skip check when is in scroll
    if (originScroll(deltaY)) {
      return
    }

    // Proxy of scroll events
    if (!isFirefox) {
      evt.preventDefault()
    }

    rafId = rAF(() => {
      // Patch a multiple for Firefox to fix wheel number too small
      // ref: https://github.com/ant-design/ant-design/issues/26372#issuecomment-679460266
      const patchMultiple = isMouseScroll ? 10 : 1
      onWheelDelta(offset * patchMultiple)
      offset = 0
    })
  }

  // A patch for firefox
  function onFireFoxScroll(evt: FireFoxDOMMouseScrollEvent) {
    if (!inVirtual.value) {
      return
    }
    isMouseScroll = evt.detail === wheelValue
  }

  return { onWheel, onFireFoxScroll }
}

const SMOOTH_PTG = 14 / 15
function useMobileTouchMove(
  holderRef: Ref<HTMLElement | undefined>,
  inVirtual: Ref<boolean>,
  callback: (offsetY: number, smoothOffset?: boolean) => boolean,
): void {
  let touched = false
  let touchY = 0

  // Smooth scroll
  let intervalId: number

  const cleanUpEvents = (element: HTMLElement) => {
    off(element, 'touchmove', onTouchMove)
    off(element, 'touchend', onTouchEnd)
  }

  const onTouchMove = (evt: TouchEvent) => {
    if (touched) {
      const currentY = Math.ceil(evt.touches[0].pageY)
      let offsetY = touchY - currentY
      touchY = currentY

      if (callback(offsetY)) {
        evt.preventDefault()
      }

      // Smooth interval
      clearInterval(intervalId)
      intervalId = setInterval(() => {
        offsetY *= SMOOTH_PTG

        if (!callback(offsetY, true) || Math.abs(offsetY) <= 0.1) {
          clearInterval(intervalId)
        }
      }, 16)
    }
  }

  const onTouchEnd = (evt: TouchEvent) => {
    touched = false

    cleanUpEvents(evt.target as HTMLElement)
  }

  const onTouchStart = (evt: TouchEvent) => {
    const element = evt.target as HTMLElement
    cleanUpEvents(element)

    if (evt.touches.length === 1 && !touched) {
      touched = true
      touchY = Math.ceil(evt.touches[0].pageY)

      on(element, 'touchmove', onTouchMove)
      on(element, 'touchend', onTouchEnd)
    }
  }

  onMounted(() => {
    watch(
      [holderRef, inVirtual],
      ([currElement, currInVirtual], [prevElement]) => {
        off(prevElement, 'touchstart', onTouchStart)
        cleanUpEvents(prevElement!)
        clearInterval(intervalId)
        if (currInVirtual) {
          on(currElement, 'touchstart', onTouchStart)
        }
      },
      { immediate: true },
    )
  })
}
