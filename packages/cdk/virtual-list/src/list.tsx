import type { CSSProperties, ComponentPublicInstance, ComputedRef, Ref } from 'vue'
import type { VirtualItemRenderFn, VirtualFillerInstance, VirtualListProps, VirtualScrollBarInstance } from './types'

import { ref, defineComponent, computed } from 'vue'
import Item from './item'
import Filler from './filler'
import ScrollBar from './scrollBar'
import { virtualListProps } from './types'
import { useEvents } from './utils/useEvents'
import { useItemKey, useItems } from './utils/useItem'
import { useScrollBar } from './utils/useScrollBar'
import { useScrollTo } from './utils/useScrollTo'

export default defineComponent({
  name: 'IxVirtualList',
  props: virtualListProps,
  setup(props) {
    const useVirtual = computed(() => props.virtual && props.height > 0 && props.itemHeight > 0)
    const scrollBarRef = ref<VirtualScrollBarInstance>()
    const { componentRef, componentElement } = useComponentRef()
    const fillerRef = ref<VirtualFillerInstance>()

    const { heights, collectHeight, setItemInstance } = useItems(props)

    const { scrollTop, scrollMoving, scrollState, originScroll, syncScrollTop, setScrollMoving } = useScrollBar(
      props,
      scrollBarRef,
      componentElement,
      fillerRef,
      useVirtual,
      heights,
    )

    const componentStyle = useComponentStyle(props, useVirtual, scrollMoving)

    // When data size reduce. It may trigger native scroll event back to fit scroll position
    const onFallbackScroll = (evt: Event) => {
      const { scrollTop: newScrollTop } = evt.currentTarget as Element
      if (newScrollTop !== scrollTop.value) {
        syncScrollTop(newScrollTop)
      }
      // Trigger origin onScroll
      props.onScroll?.(evt)
    }

    const scrollTo = useScrollTo(props, scrollBarRef, componentElement, heights, collectHeight, syncScrollTop)

    useEvents(componentElement, useVirtual, syncScrollTop, originScroll)

    return {
      useVirtual,
      collectHeight,
      setItemInstance,
      componentRef,
      componentStyle,
      onFallbackScroll,
      fillerRef,
      scrollBarRef,
      scrollState,
      scrollTop,
      syncScrollTop,
      setScrollMoving,
      scrollTo,
    }
  },

  render() {
    const { $props, $slots, data } = this
    const CompTag = this.component as any
    const { start, end, scrollHeight, offset } = this.scrollState
    const itemRender = $slots.item ?? this.itemRender
    const children = useChildren($props, data, start, end, this.setItemInstance, itemRender!)
    return (
      <div class="ix-virtual-list" style={{ position: 'relative' }}>
        <CompTag
          ref="componentRef"
          class="ix-virtual-list-holder"
          style={this.componentStyle}
          onScroll={this.onFallbackScroll}
        >
          <Filler ref="fillerRef" scrollHeight={scrollHeight} offset={offset} onResize={this.collectHeight}>
            {children}
          </Filler>
        </CompTag>
        {this.useVirtual && (
          <ScrollBar
            ref="scrollBarRef"
            count={data.length}
            height={this.height}
            scrollHeight={scrollHeight}
            scrollTop={this.scrollTop}
            onScroll={this.syncScrollTop}
            onScrollStateChange={this.setScrollMoving}
          />
        )}
      </div>
    )
  },
})

const useComponentRef = () => {
  const componentRef = ref<ComponentPublicInstance | HTMLElement>()
  const componentElement = computed<HTMLElement | undefined>(() => {
    const elementOrInstance = componentRef.value
    if (!elementOrInstance) {
      return undefined
    }
    return '$el' in elementOrInstance ? elementOrInstance.$el : elementOrInstance
  })
  return { componentRef, componentElement }
}

const useComponentStyle = (props: VirtualListProps, useVirtual: ComputedRef<boolean>, scrollMoving: Ref<boolean>) => {
  return computed<CSSProperties | null>(() => {
    const { height, fullHeight } = props
    if (height <= 0) {
      return null
    }
    return {
      [fullHeight ? 'height' : 'maxHeight']: height + 'px',
      overflowY: useVirtual.value ? 'hidden' : 'auto',
      overflowAnchor: 'none',
      pointerEvents: useVirtual.value && scrollMoving.value ? 'none' : undefined,
    }
  })
}

const useChildren = (
  props: VirtualListProps,
  data: unknown[],
  startIndex: number,
  endIndex: number,
  setItemRef: (item: unknown, element: HTMLElement) => void,
  itemRender: VirtualItemRenderFn,
) => {
  return data.slice(startIndex, endIndex + 1).map((item, index) => {
    const key = useItemKey(props, item)
    const itemIndex = startIndex + index
    const itemNode = itemRender({ item, index: itemIndex })
    return (
      <Item key={key} setRef={ele => setItemRef(item, ele)}>
        {itemNode}
      </Item>
    )
  })
}
