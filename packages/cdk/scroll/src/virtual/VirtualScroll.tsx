/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import { type ComponentPublicInstance, computed, defineComponent, provide, ref, watch } from 'vue'

import { callEmit, useState } from '@idux/cdk/utils'

import { useContainerHeight } from './composables/useContainerHeight'
import { useGetKey } from './composables/useGetKey'
import { useHeights } from './composables/useHeights'
import { useScrollPlacement } from './composables/useScrollPlacement'
import { useScrollState } from './composables/useScrollState'
import { useScrollTo } from './composables/useScrollTo'
import Holder from './contents/Holder'
import Item from './contents/Item'
import { virtualScrollToken } from './token'
import { virtualListProps } from './types'

export default defineComponent({
  name: 'CdkVirtualScroll',
  props: virtualListProps,
  setup(props, { expose, slots }) {
    const useVirtual = computed(() => props.virtual && props.itemHeight > 0)
    const getKey = useGetKey(props)
    const { heights, collectHeights, heightsUpdateMark, setItem } = useHeights()

    const containerRef = ref<HTMLElement>()
    const holderRef = ref<HTMLElement>()
    const fillerRef = ref<HTMLElement>()

    const containerHeight = useContainerHeight(props, containerRef)

    const [scrollTop, changeScrollTop] = useState(0)
    const { scrollHeight, scrollOffset, startIndex, endIndex } = useScrollState(
      props,
      fillerRef,
      useVirtual,
      getKey,
      scrollTop,
      containerHeight,
      heightsUpdateMark,
      heights,
    )

    const { syncScrollTop } = useScrollPlacement(
      props,
      holderRef,
      scrollTop,
      scrollHeight,
      containerHeight,
      changeScrollTop,
    )

    provide(virtualScrollToken, {
      props,
      slots,
      holderRef,
      fillerRef,
      useVirtual,
      collectHeights,
      scrollTop,
      scrollHeight,
      scrollOffset,
      syncScrollTop,
    })

    const scrollTo = useScrollTo(props, holderRef, getKey, heights, collectHeights, syncScrollTop)
    expose({ scrollTo })

    const mergedData = computed(() => props.dataSource.slice(startIndex.value, endIndex.value + 1))
    watch(mergedData, data => callEmit(props.onScrolledChange, startIndex.value, endIndex.value, data))

    return () => {
      const getKeyFn = getKey.value
      const start = startIndex.value
      const itemRender = slots.item ?? props.itemRender
      const children = mergedData.value.map((item, index) => {
        const key = getKeyFn(item)
        return (
          <Item key={key} ref={instance => setItem(key, instance as ComponentPublicInstance | null)}>
            {itemRender?.({ item, index: start + index })}
          </Item>
        )
      })

      return (
        <div ref={containerRef} class="cdk-virtual-scroll">
          <Holder>{children}</Holder>
        </div>
      )
    }
  },
})
