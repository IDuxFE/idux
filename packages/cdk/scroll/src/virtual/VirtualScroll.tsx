import { computed, defineComponent, provide, ref } from 'vue'
import { useGetKey } from './composables/useGetKey'
import { useItemHeights } from './composables/useItemHeights'
import { useScroll } from './composables/useScroll'
import { getScrollTo } from './utils/getScrollTo'
import VirtualItem from './VirtualItem'
import VirtualScrollBar from './VirtualScrollBar'
import VirtualHolder from './VirtualHolder'
import { virtualScrollToken } from './token'
import { virtualListProps } from './types'

export default defineComponent({
  name: 'IxVirtualScroll',
  props: virtualListProps,
  setup(props, { expose, slots }) {
    const useVirtual = computed(() => props.height > 0 && props.itemHeight > 0)
    const getKey = useGetKey(props)
    const { heights, collectHeights, setItemElement } = useItemHeights(getKey)

    const holderRef = ref<HTMLElement>()
    const fillerRef = ref<HTMLElement>()

    const scrollContext = useScroll(props, holderRef, fillerRef, useVirtual, getKey, heights)

    const context = {
      props,
      slots,
      holderRef,
      fillerRef,
      useVirtual,
      getKey,
      collectHeights,
      ...scrollContext,
    }

    provide(virtualScrollToken, context)

    const scrollTo = getScrollTo(props, holderRef, getKey, heights, collectHeights, scrollContext)
    expose({ scrollTo })

    return () => {
      const { start, end } = scrollContext.scrollState.value
      const getKeyFn = getKey.value
      const itemRender = slots.item ?? props.itemRender
      const children = props.data.slice(start, end + 1).map((item, index) => {
        const key = getKeyFn(item)
        return (
          <VirtualItem key={key} setRef={el => setItemElement(item, el)}>
            {itemRender?.({ item, index: start + index })}
          </VirtualItem>
        )
      })

      return (
        <div class="ix-virtual-scroll" style={{ position: 'relative' }}>
          <VirtualHolder>{children}</VirtualHolder>
          {useVirtual.value && <VirtualScrollBar />}
        </div>
      )
    }
  },
})
