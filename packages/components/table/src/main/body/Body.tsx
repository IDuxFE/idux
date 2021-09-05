import type { ComputedRef, StyleValue, VNodeTypes } from 'vue'
import type { TableColumnMerged } from '../../composables/useColumns'
import type { Key } from '../../types'

import { computed, defineComponent, inject } from 'vue'
import { isString } from 'lodash-es'
import { convertCssPixel } from '@idux/cdk/utils'
import { IxEmpty } from '@idux/components/empty'
import { tableToken } from '../../token'
import BodyRow from './BodyRow'
import BodyRowSingle from './BodyRowSingle'
import MeasureRow from './MeasureRow'

export default defineComponent({
  setup() {
    const {
      props,
      slots,
      flattedData,
      flattedColumns,
      fixedColumnKeys,
      columnOffsets,
      scrollHorizontal,
      scrollVertical,
      isSticky,
      bodyTag,
    } = inject(tableToken)!

    const showMeasure = computed(() => scrollHorizontal.value || scrollVertical.value || isSticky.value)
    const bodyColumns = useBodyColumns(flattedColumns, fixedColumnKeys, columnOffsets, isSticky)

    return () => {
      let children: VNodeTypes[] = []
      if (slots.alert) {
        const alertNode = slots.alert()
        children.push(<BodyRowSingle>{alertNode}</BodyRowSingle>)
      }
      const data = flattedData.value
      if (data.length > 0) {
        const columns = bodyColumns.value
        data.forEach((item, index) => {
          const { expanded, level, record, rowKey } = item
          const rowProps = { key: rowKey, columns, expanded, index, level, record, rowKey }
          children.push(<BodyRow {...rowProps} />)
        })
      } else {
        const emptyProps = isString(props.empty) ? { description: props.empty } : props.empty
        children.push(
          <BodyRowSingle>
            <IxEmpty {...emptyProps}></IxEmpty>
          </BodyRowSingle>,
        )
      }

      const BodyTag = bodyTag.value as any
      return (
        <BodyTag>
          {showMeasure.value ? <MeasureRow></MeasureRow> : null}
          {children}
        </BodyTag>
      )
    }
  },
})

function useBodyColumns(
  flattedColumns: ComputedRef<TableColumnMerged[]>,
  fixedColumnKeys: ComputedRef<{
    lastStartKey: Key | undefined
    firstEndKey: Key | undefined
  }>,
  columnOffsets: ComputedRef<{
    starts: number[]
    ends: number[]
  }>,
  isSticky: ComputedRef<boolean>,
) {
  return computed(() =>
    flattedColumns.value.map((column, index) => {
      const { key, fixed, align, ellipsis, additional, colSpan, rowSpan, customRender, dataKey, type } = column
      const prefixCls = 'ix-table'
      let classes: Record<string, boolean | string | undefined> = {
        [`${prefixCls}-align-${align}`]: align,
        [`${prefixCls}-ellipsis`]: ellipsis,
      }
      let style: StyleValue | undefined
      if (fixed) {
        const { lastStartKey, firstEndKey } = fixedColumnKeys.value
        classes = {
          ...classes,
          [`${prefixCls}-fix-start`]: fixed === 'start',
          [`${prefixCls}-fix-start-last`]: lastStartKey === key,
          [`${prefixCls}-fix-end`]: fixed === 'end',
          [`${prefixCls}-fix-end-first`]: firstEndKey === key,
          [`${prefixCls}-fix-sticky`]: isSticky.value,
        }
        const { starts, ends } = columnOffsets.value
        const offsets = fixed === 'start' ? starts : ends
        const fixedOffset = convertCssPixel(offsets[index])
        style = {
          position: 'sticky',
          left: fixed === 'start' ? fixedOffset : undefined,
          right: fixed === 'end' ? fixedOffset : undefined,
        }
      }
      return { key, class: classes, style, additional, colSpan, rowSpan, customRender, ellipsis, dataKey, type }
    }),
  )
}
