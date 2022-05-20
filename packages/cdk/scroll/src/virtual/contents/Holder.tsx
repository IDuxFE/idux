/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import type { OriginScroll } from '../composables/useOriginScroll'
import type { CSSProperties, Ref } from 'vue'

import { computed, defineComponent, inject, onBeforeUnmount, onMounted, ref } from 'vue'

import { throttle } from 'lodash-es'

import { offResize, onResize } from '@idux/cdk/resize'
import { callEmit, cancelRAF, off, on, rAF } from '@idux/cdk/utils'

import { virtualScrollToken } from '../token'

export default defineComponent({
  setup(_, { slots }) {
    const {
      props,
      slots: virtualScrollSlots,
      holderRef,
      fillerRef,
      useVirtual,
      collectHeights,
      scrollHeight,
      scrollOffset,
      scrollTop,
      syncScrollTop,
      originScroll,
    } = inject(virtualScrollToken)!

    const style = computed<CSSProperties | undefined>(() => {
      const { height, fullHeight } = props
      if (height <= 0) {
        return undefined
      }
      return {
        [fullHeight ? 'height' : 'maxHeight']: height + 'px',
        overflow: 'auto',
        overflowAnchor: 'none',
      }
    })

    const fillerStyle = computed<CSSProperties | undefined>(() => {
      if (scrollOffset.value === undefined) {
        return undefined
      }
      return { height: `${scrollHeight.value}px`, position: 'relative' }
    })

    const contentStyle = computed<CSSProperties>(() => {
      const offset = scrollOffset.value
      if (offset === undefined) {
        return { display: 'flex', flexDirection: 'column', flexWrap: 'wrap' }
      }
      return {
        display: 'flex',
        flexDirection: 'column',
        flexWrap: 'wrap',
        transform: `translateY(${offset}px)`,
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
      }
    })

    const handleScroll = (evt: Event) => {
      const { scrollTop: newScrollTop } = evt.currentTarget as Element
      if (newScrollTop !== scrollTop.value) {
        syncScrollTop(newScrollTop)
      }
      callEmit(props.onScroll, evt)
    }

    const { handleWheel, handleTouchStart } = useEvents(holderRef, syncScrollTop, originScroll)

    const contentRef = ref<HTMLDivElement>()
    const onContentResize = throttle(collectHeights, 16)
    // 这里不能用 useResizeObserver, 会有 test 爆栈警告, 具体原因后面再排查。
    onMounted(() => onResize(contentRef.value, onContentResize))
    onBeforeUnmount(() => offResize(contentRef.value, onContentResize))

    return () => {
      const virtual = useVirtual.value
      const children = slots.default!()
      const contentRender = virtualScrollSlots.content ?? props.contentRender
      return (
        <div
          ref={holderRef}
          class="cdk-virtual-scroll-holder"
          style={style.value}
          onScroll={handleScroll}
          onWheel={virtual ? handleWheel : undefined}
          onTouchstart={virtual ? handleTouchStart : undefined}
        >
          <div ref={fillerRef} class="cdk-virtual-scroll-filler" style={fillerStyle.value}>
            <div ref={contentRef} class="cdk-virtual-scroll-content" style={contentStyle.value}>
              {contentRender ? contentRender(children) : children}
            </div>
          </div>
        </div>
      )
    }
  },
})

const SMOOTH_PTG = 14 / 15

function useEvents(
  holderRef: Ref<HTMLElement | undefined>,
  syncScrollTop: (newTop: number | ((prev: number) => number)) => void,
  originScroll: OriginScroll,
) {
  let offset = 0
  let rafId: number

  function handleWheel(evt: WheelEvent) {
    if (evt.shiftKey) {
      return
    }

    cancelRAF(rafId)

    const { deltaY } = evt
    offset += deltaY

    // Do nothing when scroll at the edge, Skip check when is in scroll
    if (originScroll(deltaY)) {
      return
    }

    // Proxy of scroll events
    evt.preventDefault()

    rafId = rAF(() => {
      syncScrollTop(top => top + offset)
      offset = 0
    })
  }

  let touched = false
  let touchY = 0
  let intervalId: number

  const handleTouchStart = (evt: TouchEvent) => {
    const element = evt.target as HTMLElement
    removeEvents(element)

    if (evt.touches.length === 1 && !touched) {
      touched = true
      touchY = Math.ceil(evt.touches[0].pageY)

      on(element, 'touchmove', handleTouchMove)
      on(element, 'touchend', handleTouchEnd)
    }
  }

  const touchMoveCallBack = (deltaY: number, smoothOffset?: boolean) => {
    if (originScroll(deltaY, smoothOffset)) {
      return false
    }

    handleWheel({ preventDefault() {}, deltaY } as WheelEvent)
    return true
  }

  const handleTouchMove = (evt: TouchEvent) => {
    if (touched) {
      const currentY = Math.ceil(evt.touches[0].pageY)
      let offsetY = touchY - currentY
      touchY = currentY

      if (touchMoveCallBack(offsetY)) {
        evt.preventDefault()
      }

      // Smooth interval
      clearInterval(intervalId)
      intervalId = setInterval(() => {
        offsetY *= SMOOTH_PTG

        if (!touchMoveCallBack(offsetY, true) || Math.abs(offsetY) <= 0.1) {
          clearInterval(intervalId)
        }
      }, 16)
    }
  }

  const handleTouchEnd = (evt: TouchEvent) => {
    touched = false
    removeEvents(evt.target as HTMLElement)
  }

  const removeEvents = (element: HTMLElement) => {
    off(element, 'touchmove', handleTouchMove)
    off(element, 'touchend', handleTouchEnd)
  }

  onBeforeUnmount(() => {
    cancelRAF(rafId)
    clearInterval(intervalId)
    removeEvents(holderRef.value!)
  })

  return { handleWheel, handleTouchStart }
}

