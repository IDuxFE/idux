/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import type { ProTransferProps, TransferData } from '../types'
import type { TransferBindings } from '@idux/components/transfer'
import type { ProTableColumn, ProTableColumnSelectable, ProTableProps } from '@idux/pro/table'

import { type ComputedRef, type Slots, computed } from 'vue'

import { isString, omit } from 'lodash-es'

import { callEmit } from '@idux/cdk/utils'

import { renderRemovableLabel } from '../content/RenderRemovableLabel'

export function useTransferTableProps(
  props: ProTransferProps,
  slots: Slots,
  transferBindings: TransferBindings,
  mergedPrefixCls: ComputedRef<string>,
  isSource: boolean,
): ComputedRef<ProTableProps> {
  const { paginatedData, paginatedDataSource, selectedKeys, getKey } = transferBindings

  const convertedColumns = computed(() =>
    convertTableColumns(
      isSource ? props.tableProps?.sourceColumns : props.tableProps?.targetColumns,
      mergedPrefixCls,
      transferBindings,
      props,
      slots,
      isSource,
    ),
  )

  const onScroll: ProTableProps['onScroll'] = evt => callEmit(props.onScroll, isSource, evt)
  const onScrolledChange: ProTableProps['onScrolledChange'] = (startIndex, endIndex, visibleData) =>
    callEmit(props.onScrolledChange, isSource, startIndex, endIndex, visibleData)
  const onScrolledBottom: ProTableProps['onScrolledBottom'] = () => callEmit(props.onScrolledBottom, isSource)
  const onColumnsChange: ProTableProps['onColumnsChange'] = columns =>
    callEmit(props.tableProps?.onColumnsChange, isSource, columns)

  return computed<ProTableProps>(() => {
    /* eslint-disable indent */
    const scroll = props.scroll?.height
      ? {
          height: props.scroll.height,
          fullHeight: props.scroll.fullHeight,
        }
      : undefined
    /* eslint-disable indent */

    const customTableProps = omit(
      props.tableProps,
      'sourceColumns',
      'targetColumns',
      'targetLayoutTool',
      'sourceLayoutTool',
      'onColumnsChange',
    )

    const layoutTool = isSource ? props.tableProps?.sourceLayoutTool : props.tableProps?.targetLayoutTool
    const mergedLayoutTool = !layoutTool
      ? false
      : layoutTool === true
        ? { changeSize: false }
        : { ...layoutTool, changeSize: false }

    return {
      autoHeight: !scroll,
      ...customTableProps,
      dataSource: isSource && props.mode === 'immediate' ? paginatedDataSource.value : paginatedData.value,
      columns: convertedColumns.value,
      layoutTool: mergedLayoutTool,
      scroll,
      pagination: false,
      selectedRowKeys: selectedKeys.value,
      virtual: props.virtual,
      virtualItemHeight: props.virtualItemHeight,
      getKey: getKey.value as (record: unknown) => number | string,
      onColumnsChange,
      onScroll,
      onScrolledChange,
      onScrolledBottom,
    }
  })
}

function convertTableColumns(
  columns: ProTableColumn[] | undefined,
  mergedPrefixCls: ComputedRef<string>,
  transferBindings: TransferBindings,
  props: ProTransferProps,
  slots: Slots,
  isSource: boolean,
): ProTableColumn[] {
  const { handleSelectChange, getKey, triggerRemove, disabledDataSourceKeys, disabledKeys } = transferBindings

  const convertedColumns = (columns && [...columns]) ?? []
  const selectableColumnIdx = convertedColumns.findIndex(col => 'type' in col && col.type === 'selectable')
  const cellDisabledKeys = isSource && props.mode === 'immediate' ? disabledDataSourceKeys : disabledKeys

  const layoutDisabledColumnConfig = {
    layoutable: false,
    changeFixed: false,
    changeIndex: false,
    changeVisible: false,
    visible: true,
  }

  const defaultSelectableColumn: ProTableColumnSelectable = {
    ...layoutDisabledColumnConfig,
    type: 'selectable',
    disabled: record => cellDisabledKeys.value.has(getKey.value(record)) || !!props.disabled,
    multiple: true,
    trigger: 'click',
    onChange: selectedKeys => handleSelectChange(selectedKeys),
  }

  if (isSource || props.mode !== 'immediate') {
    if (selectableColumnIdx < 0) {
      convertedColumns.unshift(defaultSelectableColumn)
    } else {
      convertedColumns[selectableColumnIdx] = {
        ...(convertedColumns[selectableColumnIdx] as ProTableColumnSelectable),
        ...defaultSelectableColumn,
      }
    }
  } else {
    selectableColumnIdx > -1 && convertedColumns.splice(selectableColumnIdx, 1)
  }

  if (props.mode === 'immediate' && !isSource) {
    const lastCol = convertedColumns[convertedColumns.length - 1]
    if ('type' in lastCol) {
      convertedColumns.push({
        ...layoutDisabledColumnConfig,
        customCell: ({ record }: { record: TransferData }) => {
          const key = getKey.value(record)
          return renderRemovableLabel(
            key,
            cellDisabledKeys.value.has(key),
            false,
            null,
            triggerRemove,
            mergedPrefixCls.value,
          )
        },
      })
    } else {
      const { customCell: originalCustomCell, ellipsis } = lastCol
      //eslint-disable-next-line @typescript-eslint/no-explicit-any
      const renderLabel = (data: { value: any; record: any; rowIndex: number }) => {
        if (!originalCustomCell) {
          return data.value
        }

        if (isString(originalCustomCell)) {
          return slots[originalCustomCell]?.(data)
        }

        return originalCustomCell(data)
      }

      convertedColumns.splice(convertedColumns.length - 1, 1, {
        ...lastCol,
        ...layoutDisabledColumnConfig,
        //eslint-disable-next-line @typescript-eslint/no-explicit-any
        customCell: (data: { value: any; record: any; rowIndex: number }) => {
          const key = getKey.value(data.record)
          return renderRemovableLabel(
            key,
            cellDisabledKeys.value.has(key),
            !!ellipsis,
            () => renderLabel(data),
            triggerRemove,
            mergedPrefixCls.value,
          )
        },
      })
    }
  }

  return convertedColumns
}
