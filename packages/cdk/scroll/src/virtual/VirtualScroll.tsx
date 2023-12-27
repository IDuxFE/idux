/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import { type ComponentPublicInstance, computed, defineComponent, onMounted, onUpdated, provide, ref, watch } from 'vue'

import { Logger, callEmit, useState } from '@idux/cdk/utils'

import { useContainerSize } from './composables/useContainerSize'
import { useGetKey } from './composables/useGetKey'
import { useRenderPool } from './composables/useRenderPool'
import { type Scroll, useScrollPlacement } from './composables/useScrollPlacement'
import { useScrollState } from './composables/useScrollState'
import { useScrollTo } from './composables/useScrollTo'
import { useSizeCollect } from './composables/useSizeCollect'
import Col from './contents/Col'
import Holder from './contents/Holder'
import Row from './contents/Row'
import { virtualScrollToken } from './token'
import { type VirtualScrollEnabled, virtualListProps } from './types'
import { isRowData } from './utils'

export default defineComponent({
  name: 'CdkVirtualScroll',
  props: virtualListProps,
  setup(props, { expose, slots }) {
    if (__DEV__) {
      if (props.itemHeight) {
        Logger.warn('cdk/scroll', 'itemHeight is deprecated, use rowHeight instead')
      }
      if (props.itemRender) {
        Logger.warn('cdk/scroll', 'itemRender is deprecated, use rowRender instead')
      }
    }

    const useVirtual = computed(() => props.virtual && props.itemHeight > 0)
    const getKey = useGetKey(props)
    const { collectSize, sizeUpdateMark, setRow, setCol, getRowHeight, getColWidth, clearItems } = useSizeCollect(props)

    const enabled = computed<VirtualScrollEnabled>(() => {
      const enabled = props.virtual
      let resolvedEnabled: VirtualScrollEnabled

      if (enabled === true) {
        resolvedEnabled = { horizontal: true, vertical: true }
      } else if (!enabled) {
        resolvedEnabled = { horizontal: false, vertical: false }
      } else {
        resolvedEnabled = enabled
      }

      return {
        horizontal: resolvedEnabled.horizontal && props.width !== 0,
        vertical: resolvedEnabled.vertical && props.height !== 0 && props.height !== 'auto',
      }
    })

    const containerRef = ref<HTMLElement>()
    const holderRef = ref<HTMLElement>()
    const fillerHorizontalRef = ref<HTMLElement>()
    const fillerVerticalRef = ref<HTMLElement>()

    const containerSize = useContainerSize(props, containerRef)

    const [scroll, changeScroll] = useState<Scroll>({ top: 0, left: 0 })

    const {
      scrollHeight,
      scrollWidth,
      scrollOffsetTop,
      scrollOffsetLeft,
      topIndex,
      leftIndex,
      rightIndex,
      bottomIndex,
    } = useScrollState(props, enabled, getKey, scroll, containerSize, sizeUpdateMark, getRowHeight, getColWidth)

    const { syncScroll, handleScroll } = useScrollPlacement(
      props,
      holderRef,
      scroll,
      scrollHeight,
      scrollWidth,
      containerSize,
      changeScroll,
    )

    const pool = useRenderPool(props, topIndex, bottomIndex, leftIndex, rightIndex, getKey)
    const mergedData = computed(() => {
      return pool.value.map(row => {
        if (!isRowData(row.item)) {
          return row.item
        }

        return {
          ...row.item,
          data: row.cols?.map(col => col.item) ?? [],
        }
      })
    })

    provide(virtualScrollToken, {
      props,
      slots,
      enabled,
      holderRef,
      fillerHorizontalRef,
      fillerVerticalRef,
      useVirtual,
      collectSize,
      scroll,
      scrollHeight,
      scrollWidth,
      scrollOffsetTop,
      scrollOffsetLeft,
      syncScroll,
      handleScroll,
      topIndex,
      bottomIndex,
      leftIndex,
      rightIndex,
      renderedData: mergedData,
    })

    const scrollTo = useScrollTo(props, holderRef, getKey, getRowHeight, collectSize, syncScroll)
    const getHolderElement = () => holderRef.value
    expose({ scrollTo, getHolderElement })

    watch([topIndex, leftIndex], () =>
      callEmit(props.onScrolledChange, topIndex.value, bottomIndex.value, mergedData.value),
    )

    onMounted(collectSize)
    onUpdated(collectSize)

    return () => {
      const rowRender = slots.row ?? slots.item ?? props.rowRender ?? props.itemRender
      const colRender = slots.col ?? props.colRender

      clearItems()

      const rows = pool.value.map(row => {
        const { key, item, itemKey, index } = row
        if (!isRowData(item)) {
          return (
            <Row
              key={key}
              item={item}
              index={index}
              v-slots={{ default: rowRender }}
              ref={instance => {
                setRow(itemKey, instance as ComponentPublicInstance | null)
                setCol(itemKey, itemKey, instance as ComponentPublicInstance | null)
              }}
            />
          )
        }

        const cols = row.cols?.map(col => {
          const { key: colKey, item: colItem, itemKey: colItemKey, index: colIndex } = col

          return (
            <Col
              key={colKey}
              row={item}
              rowIndex={index}
              item={colItem}
              index={colIndex}
              v-slots={{ default: colRender }}
              ref={instance => setCol(itemKey, colItemKey, instance as ComponentPublicInstance | null)}
            />
          )
        })

        return (
          <Row
            key={key}
            item={item}
            index={index}
            children={cols}
            v-slots={{ default: rowRender }}
            ref={instance => setRow(itemKey, instance as ComponentPublicInstance | null)}
          />
        )
      })

      return (
        <div ref={containerRef} class="cdk-virtual-scroll">
          <Holder>{rows}</Holder>
        </div>
      )
    }
  },
})
