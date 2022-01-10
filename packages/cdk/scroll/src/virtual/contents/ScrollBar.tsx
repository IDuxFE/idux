/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import type { SyncScrollTop } from '../composables/useScrollPlacement'
import type { VirtualScrollProps } from '../types'
import type { ComputedRef, Ref, StyleValue } from 'vue'

import { computed, defineComponent, inject, onBeforeUnmount, ref } from 'vue'

import { cancelRAF, off, on, rAF } from '@idux/cdk/utils'

import { virtualScrollToken } from '../token'

export default defineComponent({
  setup() {
    const { props, scrollTop, scrollHeight, syncScrollTop, scrollMoving, changeScrollMoving, scrollVisible } =
      inject(virtualScrollToken)!

    const thumbHight = useThumbHight(props)
    const enableScrollRange = useEnableScrollRange(props, scrollHeight)
    const enableHeightRange = useEnableHeightRange(props, thumbHight)
    const thumbTop = useThumbTop(scrollTop, enableScrollRange, enableHeightRange)

    const {
      scrollBarRef,
      handleScrollbarMouseDown,
      handleScrollbarTouchStart,
      thumbRef,
      handleThumbMouseDown,
      handleThumbMouseMove,
      handleThumbMouseUp,
    } = useEvents(enableScrollRange, enableHeightRange, thumbTop, scrollMoving, changeScrollMoving, syncScrollTop)

    const style = useStyle(scrollVisible)
    const thumbClass = useThumbClass(scrollMoving)
    const thumbStyle = useThumbStyle(thumbHight, thumbTop)

    return () => (
      <div
        ref={scrollBarRef}
        class="cdk-virtual-scroll-bar"
        style={style.value}
        onMousedown={handleScrollbarMouseDown}
        onTouchstart={handleScrollbarTouchStart}
      >
        <div
          ref={thumbRef}
          class={thumbClass.value}
          style={thumbStyle.value}
          onMousedown={handleThumbMouseDown}
          onTouchstart={handleThumbMouseDown}
          onTouchmove={handleThumbMouseMove}
          onTouchend={handleThumbMouseUp}
        />
      </div>
    )
  },
})

const getPageY = (evt: MouseEvent | TouchEvent) => {
  return 'touches' in evt ? evt.touches[0].pageY : evt.pageY
}

const minHight = 20
const useThumbHight = (props: VirtualScrollProps) => {
  return computed(() => {
    const { height, dataSource } = props
    let baseHeight = (height / dataSource.length) * 10
    baseHeight = Math.max(baseHeight, minHight)
    baseHeight = Math.min(baseHeight, height / 2)
    return Math.floor(baseHeight)
  })
}

const useEnableScrollRange = (props: VirtualScrollProps, scrollHeight: Ref<number>) => {
  return computed(() => scrollHeight.value - props.height)
}

const useEnableHeightRange = (props: VirtualScrollProps, thumbHight: ComputedRef<number>) => {
  return computed(() => props.height - thumbHight.value || 0)
}

const useThumbTop = (
  scrollTop: Ref<number>,
  enableScrollRange: ComputedRef<number>,
  enableHeightRange: ComputedRef<number>,
) => {
  return computed(() => {
    const _scrollTop = scrollTop.value
    if (_scrollTop === 0 || enableScrollRange.value === 0) {
      return 0
    }
    const ptg = _scrollTop / enableScrollRange.value
    return ptg * enableHeightRange.value
  })
}

const useEvents = (
  enableScrollRange: ComputedRef<number>,
  enableHeightRange: ComputedRef<number>,
  thumbTop: ComputedRef<number>,
  scrollMoving: Ref<boolean>,
  changeScrollMoving: (value: boolean) => void,
  syncScrollTop: SyncScrollTop,
) => {
  let pageY = 0
  let startTop = 0
  const scrollBarRef = ref<HTMLElement>()
  const thumbRef = ref<HTMLDivElement>()
  let rafId: number

  const handleScrollbarTouchStart = (evt: TouchEvent) => {
    evt.preventDefault()
  }

  const handleScrollbarMouseDown = (evt: MouseEvent) => {
    evt.stopPropagation()
    evt.preventDefault()
  }

  const handleThumbMouseDown = (evt: MouseEvent | TouchEvent) => {
    changeScrollMoving(true)
    pageY = getPageY(evt)
    startTop = thumbTop.value
    patchEvents()
    evt.stopPropagation()
    evt.preventDefault()
  }

  const handleThumbMouseMove = (evt: MouseEvent | TouchEvent) => {
    cancelRAF(rafId)
    if (scrollMoving.value) {
      const offsetY = getPageY(evt) - pageY
      const newTop = startTop + offsetY

      const ptg = enableHeightRange.value ? newTop / enableHeightRange.value : 0
      const newScrollTop = Math.ceil(ptg * enableScrollRange.value)

      rafId = rAF(() => syncScrollTop(newScrollTop))
    }
  }

  const handleThumbMouseUp = () => {
    changeScrollMoving(false)
    removeEvents()
  }

  const patchEvents = () => {
    on(window, 'mousemove', handleThumbMouseMove)
    on(window, 'mouseup', handleThumbMouseUp)
  }

  const removeEvents = () => {
    off(window, 'mousemove', handleThumbMouseMove)
    off(window, 'mouseup', handleThumbMouseUp)

    cancelRAF(rafId)
  }

  onBeforeUnmount(() => {
    removeEvents()
    cancelRAF(rafId)
  })

  return {
    scrollBarRef,
    handleScrollbarMouseDown,
    handleScrollbarTouchStart,
    thumbRef,
    handleThumbMouseDown,
    handleThumbMouseMove,
    handleThumbMouseUp,
  }
}

const useStyle = (visible: ComputedRef<boolean>) => {
  return computed<StyleValue>(() => {
    return {
      width: '8px',
      top: 0,
      bottom: 0,
      right: 0,
      position: 'absolute',
      display: visible.value ? undefined : 'none',
    }
  })
}

const useThumbClass = (scrollMoving: Ref<boolean>) => {
  return computed(() => {
    return {
      'cdk-virtual-scroll-thumb': true,
      'cdk-virtual-scroll-thumb-moving': scrollMoving.value,
    }
  })
}

const useThumbStyle = (thumbHight: ComputedRef<number>, thumbTop: ComputedRef<number>) => {
  return computed<StyleValue>(() => {
    return {
      width: '100%',
      height: thumbHight.value + 'px',
      top: thumbTop.value + 'px',
      left: 0,
      position: 'absolute',
      background: 'rgba(0, 0, 0, 0.5)',
      borderRadius: '99px',
      cursor: 'pointer',
      userSelect: 'none',
    }
  })
}
