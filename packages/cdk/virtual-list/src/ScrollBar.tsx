import type { ComputedRef, CSSProperties, Ref } from 'vue'
import type { VirtualScrollBarProps } from './types'

import { computed, defineComponent, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import { throttle } from 'lodash-es'
import { on, off, rAF, cancelRAF } from '@idux/cdk/utils'
import { virtualScrollBarProps } from './types'

export default defineComponent({
  name: 'IxVirtualScrollBar',
  props: virtualScrollBarProps,
  setup(props, { emit }) {
    const { visible, delayHidden } = useVisible(props)

    const thumbHight = useThumbHight(props)
    const enableScrollRange = useEnableScrollRange(props)
    const enableHeightRange = useEnableHeightRange(props, thumbHight)
    const thumbTop = useThumbTop(props, enableScrollRange, enableHeightRange)

    const { scrollbarRef, thumbRef, dragging } = useEvents(
      props,
      delayHidden,
      enableScrollRange,
      enableHeightRange,
      thumbTop,
    )

    const scrollbarStyle = useScrollbarStyle(visible)
    const thumbClass = useThumbClass(dragging)
    const thumbStyle = useThumbStyle(thumbHight, thumbTop)

    return { scrollbarRef, scrollbarStyle, thumbRef, thumbClass, thumbStyle, delayHidden }
  },

  render() {
    const { scrollbarStyle, thumbClass, thumbStyle } = this
    return (
      <div ref="scrollbarRef" class="ix-virtual-scrollbar" style={scrollbarStyle}>
        <div ref="thumbRef" class={thumbClass} style={thumbStyle} />
      </div>
    )
  },
})

const getPageY = (evt: MouseEvent | TouchEvent) => {
  return 'touches' in evt ? evt.touches[0].pageY : evt.pageY
}

const useVisible = (props: VirtualScrollBarProps) => {
  const _visible = ref(false)
  let visibleTimeout: NodeJS.Timeout

  const delayHidden = throttle(() => {
    clearTimeout(visibleTimeout)
    _visible.value = true
    visibleTimeout = setTimeout(() => (_visible.value = false), 1200)
  }, 300)

  watch(() => props.scrollTop, delayHidden, { flush: 'post' })

  const visible = computed(() => {
    const { height, scrollHeight } = props
    if (height >= scrollHeight) {
      return false
    }
    return _visible.value
  })

  onBeforeUnmount(() => {
    clearTimeout(visibleTimeout)
  })

  return { visible, delayHidden }
}

const minHight = 20
const useThumbHight = (props: VirtualScrollBarProps) => {
  return computed(() => {
    const { height, count } = props
    let baseHeight = (height / count) * 10
    baseHeight = Math.max(baseHeight, minHight)
    baseHeight = Math.min(baseHeight, height / 2)
    return Math.floor(baseHeight)
  })
}

const useEnableScrollRange = (props: VirtualScrollBarProps) => {
  return computed(() => props.scrollHeight - props.height || 0)
}

const useEnableHeightRange = (props: VirtualScrollBarProps, thumbHight: ComputedRef<number>) => {
  return computed(() => props.height - thumbHight.value || 0)
}

const useThumbTop = (
  props: VirtualScrollBarProps,
  enableScrollRange: ComputedRef<number>,
  enableHeightRange: ComputedRef<number>,
) => {
  return computed(() => {
    const scrollTop = props.scrollTop
    if (scrollTop === 0 || enableScrollRange.value === 0) {
      return 0
    }
    const ptg = scrollTop / enableScrollRange.value
    return ptg * enableHeightRange.value
  })
}

const useEvents = (
  props: VirtualScrollBarProps,
  delayHidden: () => void,
  enableScrollRange: ComputedRef<number>,
  enableHeightRange: ComputedRef<number>,
  thumbTop: ComputedRef<number>,
) => {
  const dragging = ref(false)
  watch(dragging, value => props.onScrollStateChange(value))

  let pageY = 0
  let startTop = 0
  const scrollbarRef = ref<HTMLDivElement>()
  const thumbRef = ref<HTMLDivElement>()
  let rafId: number

  const onScrollbarTouchStart = (evt: TouchEvent) => {
    evt.preventDefault()
  }

  const onScrollbarMouseDown = (evt: MouseEvent) => {
    evt.stopPropagation()
    evt.preventDefault()
  }

  const onScrollbarMouseMove = () => delayHidden()

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

    off(scrollbarRef.value!, 'touchstart', onScrollbarTouchStart)
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

      rafId = rAF(() => props.onScroll(newScrollTop))
    }
  }

  const onMouseUp = () => {
    dragging.value = false
    removeEvents()
  }

  onMounted(() => {
    on(scrollbarRef.value, 'touchstart', onScrollbarTouchStart)
    on(thumbRef.value, 'touchstart', onMouseDown)

    on(scrollbarRef.value, 'mousedown', onScrollbarMouseDown)
    on(scrollbarRef.value, 'mousemove', onScrollbarMouseMove)
    on(thumbRef.value, 'mousedown', onMouseDown)
  })

  onBeforeUnmount(() => {
    removeEvents()

    off(scrollbarRef.value, 'mousedown', onScrollbarMouseDown)
    off(scrollbarRef.value, 'mousemove', onScrollbarMouseMove)
    off(thumbRef.value, 'mousedown', onMouseDown)
  })

  return { scrollbarRef, thumbRef, dragging }
}

const useScrollbarStyle = (visible: ComputedRef<boolean>) => {
  return computed<CSSProperties>(() => {
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
      'ix-virtual-scrollbar-thumb': true,
      'ix-virtual-scrollbar-thumb-moving': dragging.value,
    }
  })
}

const useThumbStyle = (thumbHight: ComputedRef<number>, thumbTop: ComputedRef<number>) => {
  return computed<CSSProperties>(() => {
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
