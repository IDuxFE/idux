/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import type { ComponentPublicInstance } from 'vue'

import { computed, defineComponent, provide, ref, watch } from 'vue'

import { callEmit, useState } from '@idux/cdk/utils'

import { useGetKey } from './composables/useGetKey'
import { useHeights } from './composables/useHeights'
import { useOriginScroll } from './composables/useOriginScroll'
import { useScrollPlacement } from './composables/useScrollPlacement'
import { useScrollState } from './composables/useScrollState'
import { useScrollTo } from './composables/useScrollTo'
import { useScrollVisible } from './composables/useScrollVisible'
import Holder from './contents/Holder'
import Item from './contents/Item'
import ScrollBar from './contents/ScrollBar'
import { virtualScrollToken } from './token'
import { virtualListProps } from './types'

export default defineComponent({
  name: 'CdkVirtualScroll',
  props: virtualListProps,
  setup(props, { expose, slots }) {
    const useVirtual = computed(() => props.virtual && props.height > 0 && props.itemHeight > 0)
    const getKey = useGetKey(props)
    const { heights, collectHeights, heightsUpdateMark, setItem } = useHeights()

    const holderRef = ref<HTMLElement>()
    const fillerRef = ref<HTMLElement>()

    const [scrollTop, changeScrollTop] = useState(0)
    const [scrollMoving, changeScrollMoving] = useState(false)
    const { scrollHeight, scrollOffset, startIndex, endIndex } = useScrollState(
      props,
      fillerRef,
      useVirtual,
      getKey,
      scrollTop,
      heightsUpdateMark,
      heights,
    )
    const { scrollVisible, showScroll, hideScroll } = useScrollVisible(props, scrollTop, scrollHeight)
    const { scrolledTop, scrolledBottom, syncScrollTop } = useScrollPlacement(
      props,
      holderRef,
      scrollTop,
      scrollHeight,
      changeScrollTop,
    )
    const originScroll = useOriginScroll(scrolledTop, scrolledBottom)

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
      scrollVisible,
      showScroll,
      hideScroll,
      scrollMoving,
      changeScrollMoving,
      syncScrollTop,
      originScroll,
    })

    const scrollTo = useScrollTo(props, holderRef, getKey, heights, collectHeights, hideScroll, syncScrollTop)
    expose({ scrollTo })

    const mergedData = computed(() => props.dataSource.slice(startIndex.value, endIndex.value + 1))
    watch(mergedData, data => callEmit(props.onScrolledChange, startIndex.value, endIndex.value, data))

    const handleMouseEnterWrapper = () => {
      if (!scrollMoving.value) {
        showScroll()
      }
    }

    const handleMouseLeaveWrapper = () => {
      if (!scrollMoving.value) {
        hideScroll()
      }
    }

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
        <div
          class="cdk-virtual-scroll"
          style={{ position: 'relative' }}
          onMouseenter={handleMouseEnterWrapper}
          onMouseleave={handleMouseLeaveWrapper}
        >
          <Holder>{children}</Holder>
          {useVirtual.value && <ScrollBar />}
        </div>
      )
    }
  },
})
