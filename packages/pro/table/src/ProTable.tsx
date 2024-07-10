/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

/* eslint-disable indent */

import { computed, defineComponent, provide, ref, watch } from 'vue'

import { isObject, isString } from 'lodash-es'

import { type VirtualScrollToOptions } from '@idux/cdk/scroll'
import { useState } from '@idux/cdk/utils'
import { IxButtonGroup } from '@idux/components/button'
import { useGlobalConfig as useComponentsGlobalConfig } from '@idux/components/config'
import { IxHeader } from '@idux/components/header'
import { IxTable, type TableCustomAdditional, type TableCustomTag, type TableInstance } from '@idux/components/table'
import { useGetKey } from '@idux/components/utils'
import { useGlobalConfig } from '@idux/pro/config'

import ProTableLayoutTool from './ProTableLayoutTool'
import { useColumns } from './composables/useColumns'
import { useResizable } from './composables/useResizable'
import ResizableHeadCell from './contents/ResizableHeadCell'
import SortableBody from './contents/SortableBody'
import SortableBodyRow from './contents/SortableBodyRow'
import { proTableToken } from './token'
import { type ResolvedProTableDataDndSortable, proTableProps } from './types'

export default defineComponent({
  name: 'IxProTable',
  props: proTableProps,
  setup(props, { slots, expose }) {
    const common = useGlobalConfig('common')
    const config = useGlobalConfig('table')
    const baseConfig = useComponentsGlobalConfig('table')
    const locale = useGlobalConfig('locale')

    const mergedPrefixCls = computed(() => `${common.prefixCls}-table`)
    const mergedDndSortable = computed<ResolvedProTableDataDndSortable | false>(() => {
      if (!props.dndSortable) {
        return false
      }

      const { autoScroll, canDrag, canDrop, dragHandleColumn, dragHandleIcon, isSticky } =
        props.dndSortable === true ? ({} as ResolvedProTableDataDndSortable) : props.dndSortable

      return {
        autoScroll: autoScroll ?? true,
        dragHandleColumn: dragHandleColumn ?? true,
        dragHandleIcon: dragHandleIcon ?? 'holder',
        isSticky: isSticky ?? true,
        canDrag,
        canDrop,
      }
    })
    const mergedGetKey = useGetKey(props, baseConfig, 'pro/table')
    const columnsContext = useColumns(props, config, slots, mergedPrefixCls, mergedDndSortable)
    const { hasResizable, onResizeEnd } = useResizable(columnsContext)
    const mergedConfigSize = computed(() => props.size ?? baseConfig.size)
    const [mergedSize, setMergedSize] = useState(mergedConfigSize.value)
    watch(mergedConfigSize, setMergedSize)

    provide(proTableToken, {
      props,
      config,
      locale,
      mergedPrefixCls,
      mergedSize,
      mergedDndSortable,
      mergedGetKey,
      setMergedSize,
      ...columnsContext,
    })

    const tableRef = ref<TableInstance>()
    expose({
      scrollTo: (option?: number | VirtualScrollToOptions) => tableRef.value?.scrollTo(option),
    })

    const renderLayoutTool = () => {
      const { layoutTool } = props
      if (!layoutTool) {
        return null
      }
      const toolProps = isObject(layoutTool) ? layoutTool : undefined
      return <ProTableLayoutTool {...toolProps} />
    }

    const renderToolbar = () => {
      const { toolbar } = props
      if (!toolbar) {
        return undefined
      }
      if (toolbar.length <= 1) {
        return toolbar
      }
      return (
        <IxButtonGroup align="center" gap={8}>
          {toolbar}
        </IxButtonGroup>
      )
    }

    const renderHeader = () => {
      if (slots.header) {
        return slots.header()
      }

      const { header, toolbar } = props
      if (header || toolbar || slots.toolbar) {
        const headerSlots = { suffix: slots.toolbar ?? renderToolbar }
        const headerProps = isString(header) ? { title: header } : header
        return <IxHeader v-slots={headerSlots} {...headerProps}></IxHeader>
      }
      return undefined
    }

    return () => {
      const {
        customAdditional,
        customTag,
        layoutTool,
        toolbar,
        tableLayout,
        dndSortable,
        columnDndSortable,
        ...restProps
      } = props
      const resizable = hasResizable.value
      const mergedTableLayout = tableLayout ? tableLayout : resizable ? 'fixed' : undefined

      const mergedCustomAdditional: TableCustomAdditional = {
        ...customAdditional,
        headCell: ({ column }) => {
          const additionalProps = customAdditional?.headCell ? customAdditional.headCell({ column }) : undefined
          return resizable ? { ...additionalProps, column, onResizeEnd } : additionalProps
        },
        bodyRow: data => {
          const additionalProps = customAdditional?.bodyRow ? customAdditional.bodyRow(data) : undefined
          return mergedDndSortable.value
            ? { ...additionalProps, itemKey: mergedGetKey.value(data.record) }
            : additionalProps
        },
      }
      const mergedCustomTag: TableCustomTag = {
        headCell: resizable ? ResizableHeadCell : undefined,
        body: mergedDndSortable.value ? SortableBody : undefined,
        bodyRow: mergedDndSortable.value ? SortableBodyRow : undefined,
        ...customTag,
      }

      return (
        <IxTable
          ref={tableRef}
          v-slots={{ ...slots, header: renderHeader, default: renderLayoutTool }}
          {...restProps}
          class={mergedPrefixCls.value}
          columns={columnsContext.displayColumns.value}
          customAdditional={mergedCustomAdditional}
          customTag={mergedCustomTag}
          size={mergedSize.value}
          tableLayout={mergedTableLayout}
        />
      )
    }
  },
})
