/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import type { TableColumnMerged } from '../composables/useColumns'

import {
  type CSSProperties,
  type VNodeChild,
  computed,
  defineComponent,
  inject,
  normalizeClass,
  onBeforeUnmount,
  onMounted,
  provide,
  ref,
  watch,
} from 'vue'

import { debounce, isNumber } from 'lodash-es'

import { offResize, onResize } from '@idux/cdk/resize'
import {
  CdkVirtualScroll,
  type VirtualColRenderFn,
  type VirtualContentRenderFn,
  type VirtualRowRenderFn,
  type VirtualScrollRowData,
} from '@idux/cdk/scroll'
import { Logger, type VKey, callEmit, convertArray, convertElement, isVisibleElement } from '@idux/cdk/utils'
import { ɵEmpty } from '@idux/components/_private/empty'

import ColGroup from './ColGroup'
import FixedHolder from './FixedHolder'
import StickyScroll from './StickyScroll'
import Body from './body/Body'
import BodyRowSingle from './body/BodyRowSingle'
import MeasureRow from './body/MeasureRow'
import { renderBodyCell, renderBodyCells } from './body/RenderBodyCells'
import { renderBodyRow } from './body/RenderBodyRow'
import Head from './head/Head'
import Foot from './tfoot/Foot'
import { type FlattedData } from '../composables/useDataSource'
import { TABLE_TOKEN, tableBodyToken } from '../token'
import { modifyVirtualData } from '../utils'

export default defineComponent({
  setup() {
    const {
      props,
      slots,
      expandable,
      mergedPrefixCls,
      mergedInsetShadow,
      mergedVirtual,
      mergedVirtualItemHeight,
      mergedVirtualColWidth,
      mergedAutoHeight,
      columnWidths,
      changeColumnWidth,
      flattedData,
      flattedColumns,
      fixedColumns,
      getVirtualColWidth,
      isSticky,
      mergedSticky,
      virtualScrollRef,
      scrollBodyRef,
      scrollContentRef,
      handleScroll,
      pingedStart,
      pingedEnd,
      scrollWidth,
      scrollHeight,
      scrollHorizontalOverflowed,
      scrollVerticalOverflowed,
      hasFixed,
      tableLayout,
    } = inject(TABLE_TOKEN)!

    const mainTableRef = ref<HTMLDivElement>()
    const mainTableWidth = ref(0)

    const showMeasure = computed(
      () => mergedAutoHeight.value || !!scrollWidth.value || isSticky.value || mergedVirtual.value.horizontal,
    )

    const _changeColumnWidth = (key: VKey, width: number | false) => {
      if (isVisibleElement(mainTableRef.value)) {
        changeColumnWidth(key, width)
      }
    }

    provide(tableBodyToken, { mainTableWidth, changeColumnWidth: _changeColumnWidth })

    const triggerScroll = () => {
      const currentTarget = convertElement(scrollBodyRef)
      if (currentTarget) {
        handleScroll({ currentTarget } as unknown as Event)
      }
    }

    const handleWrapperResize = (evt: ResizeObserverEntry) => {
      const { offsetWidth } = evt.target as HTMLDivElement
      if (offsetWidth !== mainTableWidth.value) {
        mainTableWidth.value = offsetWidth
      }
    }

    onMounted(() => {
      triggerScroll()

      watch([() => props.dataSource, scrollWidth], ([, width]) => {
        if (width) {
          triggerScroll()
        }
      })

      // see https://github.com/IDuxFE/idux/issues/1140
      const handlerColumnWidthsChange = () => {
        const currScrollLeft = convertElement(scrollBodyRef)?.scrollLeft
        if (currScrollLeft === 0) {
          triggerScroll()
        }
      }
      watch(columnWidths, debounce(handlerColumnWidthsChange, 16))

      onResize(mainTableRef.value, handleWrapperResize)
    })

    onBeforeUnmount(() => offResize(mainTableRef.value, handleWrapperResize))

    const classes = computed(() => {
      const prefixCls = mergedPrefixCls.value
      return normalizeClass({
        [`${prefixCls}-container`]: true,
        [`${prefixCls}-ping-start`]: pingedStart.value,
        [`${prefixCls}-ping-end`]: pingedEnd.value,
        [`${prefixCls}-fixed-layout`]: tableLayout.value === 'fixed',
        [`${prefixCls}-fixed-column`]: hasFixed.value,
        [`${prefixCls}-inset-shadow`]: mergedInsetShadow.value,
        [`${prefixCls}-scroll-horizontal`]: scrollHorizontalOverflowed.value,
        [`${prefixCls}-scroll-vertical`]: scrollVerticalOverflowed.value,
      })
    })

    const contentStyle = computed<CSSProperties>(() => {
      const height = scrollHeight.value
      const overflowX = mergedVirtual.value.horizontal ? 'hidden' : 'auto'
      const overflowY = mergedVirtual.value.vertical ? 'hidden' : 'auto'
      const fullHeight = props.scroll?.fullHeight
      return { overflowX, overflowY, [fullHeight ? 'height' : 'maxHeight']: height }
    })

    const tableStyle = computed<CSSProperties>(() => {
      return {
        tableLayout: tableLayout.value,
        width: scrollWidth.value,
        minWidth: scrollWidth.value ? '100%' : undefined,
      }
    })

    const handleScrolledChange = (startIndex: number, endIndex: number, visibleData: FlattedData[]) => {
      callEmit(
        props.onScrolledChange,
        startIndex,
        endIndex,
        visibleData.map(item => item.record),
      )
    }

    const virtualData = computed<VirtualScrollRowData<TableColumnMerged>[]>(() => {
      if (!mergedVirtual.value.vertical && !mergedVirtual.value.horizontal) {
        return []
      }

      return flattedData.value.map(data => {
        return {
          ...data,
          data: flattedColumns.value,
        }
      })
    })

    const renderMeasureRow = (columns: TableColumnMerged[] | undefined) => {
      if (!showMeasure.value || !columns) {
        return
      }

      return <MeasureRow columns={columns} />
    }

    const renderAlert = (columns: TableColumnMerged[] | undefined) => {
      if (!slots.alert) {
        return
      }

      return (
        <BodyRowSingle class={`${mergedPrefixCls.value}-alert-row`} columns={columns}>
          {slots.alert()}
        </BodyRowSingle>
      )
    }

    const renderEmpty = (columns: TableColumnMerged[] | undefined) => {
      if (flattedData.value.length > 0) {
        return
      }

      return (
        <BodyRowSingle class={`${mergedPrefixCls.value}-empty-row`} columns={columns} isEmpty>
          <ɵEmpty v-slots={slots} empty={props.empty} />
        </BodyRowSingle>
      )
    }

    const _renderBody = (
      columns: TableColumnMerged[] | undefined,
      data: FlattedData[] | undefined,
      children: VNodeChild | undefined,
    ) => {
      let contentNodes: VNodeChild

      if (children) {
        contentNodes = children
      } else if (data?.length) {
        const rows: VNodeChild[] = []
        data.forEach((item, rowIndex) => {
          const cells = renderBodyCells(columns ?? [], item, rowIndex)
          rows.push(
            ...convertArray(
              renderBodyRow(item, columns, rowIndex, slots, expandable.value, mergedPrefixCls.value, cells),
            ),
          )
        })

        contentNodes = rows
      }

      return (
        <Body>
          {renderAlert(columns)}
          {renderMeasureRow(columns)}
          {renderEmpty(columns)}
          {contentNodes}
        </Body>
      )
    }

    const renderBody = () => _renderBody(flattedColumns.value, flattedData.value)
    const renderVirtualBody = (columns: TableColumnMerged[] | undefined, children: VNodeChild) =>
      _renderBody(columns, undefined, children)

    return () => {
      const prefixCls = mergedPrefixCls.value
      const autoHeight = mergedAutoHeight.value
      const virtual = mergedVirtual.value
      const children = slots.default ? slots.default() : []

      if (autoHeight || scrollHeight.value || isSticky.value || virtual.horizontal) {
        const { offsetTop } = mergedSticky.value
        if (!props.headless) {
          children.push(<FixedHolder offsetTop={offsetTop}></FixedHolder>)
        }

        if ((virtual.vertical && (props.scroll || autoHeight)) || (!virtual.vertical && virtual.horizontal)) {
          const rowRender: VirtualRowRenderFn<FlattedData> = ({ item, index, children }) =>
            renderBodyRow(
              item,
              (item as unknown as VirtualScrollRowData<TableColumnMerged>).data,
              index,
              slots,
              expandable.value,
              prefixCls,
              children,
            )
          const colRender: VirtualColRenderFn<VirtualScrollRowData<TableColumnMerged>> = ({
            row,
            item,
            index,
            rowIndex,
          }) => renderBodyCell(item, row, rowIndex, index)

          const contentRender: VirtualContentRenderFn = (children, { renderedData }) => {
            const columns = flattedData.value.length
              ? (renderedData[0] as VirtualScrollRowData<TableColumnMerged> | undefined)?.data
              : flattedColumns.value

            return (
              <table ref={scrollContentRef} class={`${prefixCls}-table`} style={tableStyle.value}>
                {columns ? <ColGroup columns={columns}></ColGroup> : undefined}
                {renderVirtualBody(columns, children)}
                {false && <Foot></Foot>}
              </table>
            )
          }
          const colModifier = (renderedRow: FlattedData, renderedCols: TableColumnMerged[]) => {
            const { fixedStartColumns, fixedEndColumns } = fixedColumns.value
            return modifyVirtualData(
              renderedRow,
              renderedCols,
              flattedColumns.value,
              flattedData.value,
              fixedStartColumns,
              fixedEndColumns,
              false,
            )
          }
          const { scroll, onScrolledBottom } = props

          if (__DEV__ && virtual.vertical && !autoHeight && !isNumber(scroll?.height)) {
            Logger.warn(
              'components/table',
              '`scroll.height` must is a valid number when enable vertical virtual scroll',
            )
          }

          children.push(
            <CdkVirtualScroll
              ref={virtualScrollRef}
              class={`${prefixCls}-body-virtual-scroll`}
              dataSource={virtualData.value}
              colModifier={colModifier}
              fullHeight={scroll?.fullHeight}
              getKey={item => item.rowKey ?? item.key}
              height={mergedAutoHeight.value ? '100%' : (scroll?.height as number)}
              width={'100%'}
              rowHeight={mergedVirtualItemHeight.value}
              colWidth={mergedVirtualColWidth.value}
              getColWidth={getVirtualColWidth}
              rowRender={rowRender}
              colRender={colRender}
              contentRender={contentRender}
              virtual={mergedVirtual.value}
              scrollMode={props.virtualScrollMode}
              bufferSize={props.virtualBufferSize}
              bufferOffset={props.virtualBufferOffset}
              onScroll={handleScroll}
              onScrolledBottom={onScrolledBottom}
              onScrolledChange={handleScrolledChange}
            />,
          )
        } else {
          children.push(
            <div ref={scrollBodyRef} class={`${prefixCls}-content`} style={contentStyle.value} onScroll={handleScroll}>
              <table ref={scrollContentRef} class={`${prefixCls}-table`} style={tableStyle.value}>
                <ColGroup></ColGroup>
                {renderBody()}
                {false && <Foot></Foot>}
              </table>
            </div>,
          )
        }

        if (isSticky.value) {
          children.push(<StickyScroll></StickyScroll>)
        }
      } else {
        children.push(
          <div ref={scrollBodyRef} class={`${prefixCls}-content`} style={contentStyle.value} onScroll={handleScroll}>
            <table ref={scrollContentRef} class={`${prefixCls}-table`} style={tableStyle.value}>
              <ColGroup></ColGroup>
              {!props.headless && <Head></Head>}
              {renderBody()}
              {false && <Foot></Foot>}
            </table>
          </div>,
        )
      }

      return (
        <div ref={mainTableRef} class={classes.value}>
          {children}
        </div>
      )
    }
  },
})
