/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import {
  type ComponentPublicInstance,
  computed,
  defineComponent,
  nextTick,
  onBeforeUnmount,
  onMounted,
  onUpdated,
  provide,
  ref,
  watch,
} from 'vue'

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
import { CdkScrollbar } from '../scrollbar'
import { useScroll } from '../useScroll'

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

    const horizontalOverflowed = computed(() => containerScrollWidth.value > Math.ceil(containerSize.value.width))
    const verticalOverflowed = computed(() => containerScrollHeight.value > Math.ceil(containerSize.value.height))

    const holderRef = ref<HTMLElement>()
    const fillerHorizontalRef = ref<HTMLElement>()
    const fillerVerticalRef = ref<HTMLElement>()

    const containerSize = useContainerSize(props, holderRef)

    const [scroll, changeScroll] = useState<Scroll>({ top: 0, left: 0 })

    const {
      scrollTop: containerScrollTop,
      scrollLeft: containerScrollLeft,
      scrollHeight: containerScrollHeight,
      scrollWidth: containerScrollWidth,
      syncScroll: syncContainerScroll,
      init: initContainerScroll,
      update: updateContainerScroll,
      destroy: destroyContainerScroll,
    } = useScroll(holderRef, {
      simulatedScroll: props.scrollMode !== 'native',
      setContainerScroll: false,
      onScroll: (top, left) => {
        syncScroll({ top, left }, true)
      },
    })

    const onHorizontalScroll = (offset: number) => {
      syncScroll({ left: offset }, true)
    }
    const onVerticalScroll = (offset: number) => {
      syncScroll({ top: offset }, true)
    }

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
      containerSize,
      changeScroll,
      syncContainerScroll,
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

    const classes = computed(() => ({
      'cdk-virtual-scroll': true,
      'cdk-virtual-scroll-simulated-scroll': props.scrollMode !== 'native',
      'cdk-virtual-scroll-overflowed-horizontal': horizontalOverflowed.value,
      'cdk-virtual-scroll-overflowed-vertical': verticalOverflowed.value,
    }))

    provide(virtualScrollToken, {
      props,
      slots,
      containerSize,
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

    const scrollTo = useScrollTo(props, holderRef, getKey, getRowHeight, getColWidth, syncScroll)
    const getHolderElement = () => holderRef.value
    expose({ scrollTo, getHolderElement })

    watch([topIndex, leftIndex], () =>
      callEmit(props.onScrolledChange, topIndex.value, bottomIndex.value, mergedData.value),
    )

    onMounted(() => {
      collectSize()
      initContainerScroll()
      watch([scrollWidth, scrollHeight], () => {
        nextTick(() => updateContainerScroll())
      })
    })
    onUpdated(collectSize)
    onBeforeUnmount(destroyContainerScroll)

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
        <div class={classes.value}>
          <Holder>{rows}</Holder>
          {props.scrollMode === 'simulated' && (
            <CdkScrollbar
              v-show={verticalOverflowed.value}
              containerSize={containerSize.value.height}
              scrollRange={containerScrollHeight.value}
              scrollOffset={containerScrollTop.value}
              onScroll={onVerticalScroll}
            />
          )}
          {props.scrollMode === 'simulated' && (
            <CdkScrollbar
              v-show={horizontalOverflowed.value}
              horizontal
              containerSize={containerSize.value.width}
              scrollRange={containerScrollWidth.value}
              scrollOffset={containerScrollLeft.value}
              onScroll={onHorizontalScroll}
            />
          )}
        </div>
      )
    }
  },
})
