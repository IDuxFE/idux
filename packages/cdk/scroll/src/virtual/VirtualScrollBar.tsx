import type { ComputedRef, Ref, StyleValue } from 'vue'

import { computed, defineComponent, inject, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import { on, off, rAF, cancelRAF } from '@idux/cdk/utils'
import { virtualScrollToken } from './token'
import { VirtualScrollProps } from './types'
import { ScrollBarState, SyncScrollTop } from './composables/useScroll'

export default defineComponent({
  setup() {
    const { props, scrollState, scrollTop, hideScrollBar, syncScrollTop, setScrollMoving, scrollBarVisible } =
      inject(virtualScrollToken)!

    const thumbHight = useThumbHight(props)
    const enableScrollRange = useEnableScrollRange(props, scrollState)
    const enableHeightRange = useEnableHeightRange(props, thumbHight)
    const thumbTop = useThumbTop(scrollTop, enableScrollRange, enableHeightRange)

    const { scrollBarRef, thumbRef, dragging } = useEvents(
      enableScrollRange,
      enableHeightRange,
      thumbTop,
      setScrollMoving,
      hideScrollBar,
      syncScrollTop,
    )

    const style = useStyle(scrollBarVisible)
    const thumbClass = useThumbClass(dragging)
    const thumbStyle = useThumbStyle(thumbHight, thumbTop)

    return () => (
      <div ref={scrollBarRef} class="ix-virtual-scroll-bar" style={style.value}>
        <div ref={thumbRef} class={thumbClass.value} style={thumbStyle.value} />
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
    const { height, data } = props
    let baseHeight = (height / data.length) * 10
    baseHeight = Math.max(baseHeight, minHight)
    baseHeight = Math.min(baseHeight, height / 2)
    return Math.floor(baseHeight)
  })
}

const useEnableScrollRange = (props: VirtualScrollProps, scrollState: ComputedRef<ScrollBarState>) => {
  return computed(() => scrollState.value.scrollHeight - props.height)
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
  setScrollMoving: (value: boolean) => void,
  hideScrollBar: () => void,
  syncScrollTop: SyncScrollTop,
) => {
  const dragging = ref(false)
  watch(dragging, value => setScrollMoving(value))

  let pageY = 0
  let startTop = 0
  const scrollBarRef = ref<HTMLElement>()
  const thumbRef = ref<HTMLDivElement>()
  let rafId: number

  const onScrollbarTouchStart = (evt: TouchEvent) => {
    evt.preventDefault()
  }

  const onScrollbarMouseDown = (evt: MouseEvent) => {
    evt.stopPropagation()
    evt.preventDefault()
  }

  const patchEvents = () => {
    on(window, 'mousemove', onMouseMove)
    on(window, 'mouseup', onMouseUp)

    on(thumbRef.value, 'touchmove', onMouseMove)
    on(thumbRef.value, 'touchend', onMouseUp)
  }

  const removeEvents = () => {
    off(window, 'mousemove', onMouseMove)
    off(window, 'mouseup', onMouseUp)

    off(thumbRef.value, 'touchmove', onMouseMove)
    off(thumbRef.value, 'touchend', onMouseUp)

    off(scrollBarRef.value!, 'touchstart', onScrollbarTouchStart)
    off(thumbRef.value, 'touchstart', onMouseDown)

    cancelRAF(rafId)
  }

  const onMouseDown = (evt: MouseEvent | TouchEvent) => {
    dragging.value = true
    pageY = getPageY(evt)
    startTop = thumbTop.value
    patchEvents()
    evt.stopPropagation()
    evt.preventDefault()
  }

  const onMouseMove = (evt: MouseEvent | TouchEvent) => {
    cancelRAF(rafId)
    if (dragging.value) {
      const offsetY = getPageY(evt) - pageY
      const newTop = startTop + offsetY

      const ptg = enableHeightRange.value ? newTop / enableHeightRange.value : 0
      const newScrollTop = Math.ceil(ptg * enableScrollRange.value)

      rafId = rAF(() => syncScrollTop(newScrollTop))
    }
  }

  const onMouseUp = () => {
    dragging.value = false
    removeEvents()
  }

  onMounted(() => {
    on(scrollBarRef.value, 'touchstart', onScrollbarTouchStart)
    on(thumbRef.value, 'touchstart', onMouseDown)

    on(scrollBarRef.value, 'mousedown', onScrollbarMouseDown)
    on(scrollBarRef.value, 'mousemove', hideScrollBar)
    on(thumbRef.value, 'mousedown', onMouseDown)
  })

  onBeforeUnmount(() => {
    removeEvents()

    off(scrollBarRef.value, 'mousedown', onScrollbarMouseDown)
    off(scrollBarRef.value, 'mousemove', hideScrollBar)
    off(thumbRef.value, 'mousedown', onMouseDown)
  })

  return { scrollBarRef, thumbRef, dragging }
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

const useThumbClass = (dragging: Ref<boolean>) => {
  return computed(() => {
    return {
      'ix-virtual-scroll-thumb': true,
      'ix-virtual-scroll-thumb-moving': dragging.value,
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
