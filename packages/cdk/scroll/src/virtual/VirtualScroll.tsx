/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import { computed, defineComponent, provide, ref } from 'vue'

import Holder from './Holder'
import Item from './Item'
import ScrollBar from './ScrollBar'
import { useGetKey } from './composables/useGetKey'
import { useItemHeights } from './composables/useItemHeights'
import { useScroll } from './composables/useScroll'
import { virtualScrollToken } from './token'
import { virtualListProps } from './types'
import { getScrollTo } from './utils/getScrollTo'

export default defineComponent({
  name: 'CdkVirtualScroll',
  props: virtualListProps,
  setup(props, { expose, slots }) {
    const useVirtual = computed(() => props.virtual && props.height > 0 && props.itemHeight > 0)
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
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          <Item key={key} ref={elementOrInstance => setItemElement(item, elementOrInstance as any)}>
            {itemRender?.({ item, index: start + index })}
          </Item>
        )
      })

      return (
        <div class="cdk-virtual-scroll" style={{ position: 'relative' }}>
          <Holder>{children}</Holder>
          {useVirtual.value && <ScrollBar />}
        </div>
      )
    }
  },
})
