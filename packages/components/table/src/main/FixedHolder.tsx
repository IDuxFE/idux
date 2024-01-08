/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import type { FlattedData } from '../composables/useDataSource'

import {
  type CSSProperties,
  type Ref,
  computed,
  defineComponent,
  inject,
  onBeforeUnmount,
  onMounted,
  ref,
  watch,
} from 'vue'

import {
  CdkVirtualScroll,
  type VirtualColRenderFn,
  type VirtualContentRenderFn,
  type VirtualRowRenderFn,
  type VirtualScrollInstance,
  type VirtualScrollRowData,
} from '@idux/cdk/scroll'
import { convertCssPixel, off, on } from '@idux/cdk/utils'

import ColGroup from './ColGroup'
import Head from './head/Head'
import { renderHeaderCell } from './head/RenderHeaderCells'
import { renderHeaderRow } from './head/RenderHeaderRow'
import { type TableColumnMergedExtra, flatColumns } from '../composables/useColumns'
import { TABLE_TOKEN } from '../token'
import { modifyVirtualData } from '../utils'

export default defineComponent({
  props: {
    offsetTop: { type: Number, default: undefined },
    offsetBottom: { type: Number, default: undefined },
  },
  setup(props) {
    const {
      props: tableProps,
      mergedPrefixCls,
      mergedVirtual,
      mergedVirtualColWidth,
      scrollHeadRef,
      handleScroll,
      scrollWidth,
      flattedData,
      flattedColumns,
      fixedColumns,
      mergedRows,
      isSticky,
    } = inject(TABLE_TOKEN)!

    const virtualScrollRef = ref<VirtualScrollInstance>()

    onMounted(() => {
      watch(
        virtualScrollRef,
        virtualScroll => {
          if (virtualScroll) {
            scrollHeadRef.value = virtualScroll.getHolderElement()
            scrollHeadRef.value.style.overflow = 'hidden'
          }
        },
        {
          immediate: true,
        },
      )
    })

    useScrollEvents(scrollHeadRef, handleScroll)

    const isMaxContent = computed(() => scrollWidth.value === 'max-content')
    const hasData = computed(() => flattedData.value.length > 0)
    const classes = computed(() => {
      const prefixCls = mergedPrefixCls.value
      return {
        [`${prefixCls}-fixed-holder`]: true,
        [`${prefixCls}-sticky-holder`]: isSticky.value,
      }
    })
    const style = computed<CSSProperties>(() => {
      const sticky = isSticky.value
      const { offsetTop, offsetBottom } = props
      return {
        overflow: 'hidden',
        top: sticky ? convertCssPixel(offsetTop) : undefined,
        bottom: sticky ? convertCssPixel(offsetBottom) : undefined,
      }
    })

    const virtualData = computed<VirtualScrollRowData<TableColumnMergedExtra>[]>(() => {
      if (!mergedVirtual.value.horizontal) {
        return []
      }

      return mergedRows.value.rows.map((columns, rowIdx) => {
        return {
          key: rowIdx,
          data: columns,
        }
      })
    })

    return () => {
      const showColGroup = hasData.value || !isMaxContent.value
      if (mergedVirtual.value.horizontal) {
        const contentRender: VirtualContentRenderFn = (children, { renderedData }) => {
          let flattedColumns: TableColumnMergedExtra[] = []

          if (showColGroup) {
            const columns: TableColumnMergedExtra[] = []
            ;(renderedData as VirtualScrollRowData<TableColumnMergedExtra>[]).forEach(row => {
              columns.push(...row.data)
            })

            flattedColumns = flatColumns(columns)
          }

          return (
            <table style={{ tableLayout: 'fixed' }}>
              {showColGroup && <ColGroup columns={flattedColumns} isFixedHolder />}
              <Head>{children}</Head>
            </table>
          )
        }

        const rowRender: VirtualRowRenderFn<VirtualScrollRowData<TableColumnMergedExtra>> = ({
          item,
          index,
          children,
        }) => renderHeaderRow(item.data, index, children)
        const colRneder: VirtualColRenderFn<VirtualScrollRowData<TableColumnMergedExtra>> = ({ item }) =>
          renderHeaderCell(item)

        const colModifier = (renderedRow: FlattedData, renderedCols: TableColumnMergedExtra[]) => {
          const { fixedStartColumns, fixedEndColumns } = fixedColumns.value
          return modifyVirtualData(
            renderedRow,
            renderedCols,
            flattedColumns.value,
            flattedData.value,
            fixedStartColumns,
            fixedEndColumns,
            true,
          )
        }

        const { virtualBufferSize, virtualBufferOffset } = tableProps

        return (
          <div class={classes.value} style={style.value}>
            {
              <CdkVirtualScroll
                ref={virtualScrollRef}
                dataSource={virtualData.value}
                colModifier={colModifier}
                getKey="key"
                height={0}
                width={'100%'}
                colWidth={mergedVirtualColWidth.value}
                rowRender={rowRender}
                colRender={colRneder}
                contentRender={contentRender}
                virtual={{ horizontal: true, vertical: false }}
                bufferSize={virtualBufferSize}
                bufferOffset={virtualBufferOffset}
              />
            }
          </div>
        )
      }

      return (
        <div class={classes.value} style={style.value} ref={scrollHeadRef}>
          {
            <table style={{ tableLayout: 'fixed' }}>
              {showColGroup && <ColGroup isFixedHolder />}
              <Head></Head>
            </table>
          }
        </div>
      )
    }
  },
})

function useScrollEvents(
  scrollHeadRef: Ref<HTMLDivElement | undefined>,
  handleScroll: (evt?: Event, scrollLeft?: number) => void,
) {
  const onWheel = (evt: WheelEvent) => {
    if (!evt.shiftKey) {
      return
    }

    const delta = evt.deltaY
    const currentTarget = evt.currentTarget as HTMLDivElement
    if (delta) {
      const scrollLeft = currentTarget.scrollLeft + delta
      handleScroll(evt, scrollLeft)
    }
  }

  const bindWheelEvt = (el: HTMLElement | undefined) => {
    on(el, 'wheel', onWheel, { passive: true })
  }
  const unbindWheelEvt = (el: HTMLElement | undefined) => {
    off(el, 'wheel', onWheel)
  }

  onMounted(() => {
    watch(
      scrollHeadRef,
      (scrollHead, oldScrollHead) => {
        unbindWheelEvt(oldScrollHead)
        bindWheelEvt(scrollHead)
      },
      {
        immediate: true,
      },
    )
  })
  onBeforeUnmount(() => unbindWheelEvt(scrollHeadRef.value))
}
