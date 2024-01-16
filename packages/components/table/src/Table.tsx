/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import type { VirtualScrollEnabled } from '@idux/cdk/scroll'
import type { VKey } from '@idux/cdk/utils'

import { type VNode, computed, defineComponent, normalizeClass, provide, watch } from 'vue'

import { isBoolean } from 'lodash-es'

import { ɵHeader } from '@idux/components/_private/header'
import { useGlobalConfig } from '@idux/components/config'
import { IxSpin, type SpinProps } from '@idux/components/spin'
import { useThemeToken } from '@idux/components/theme'
import { useGetKey } from '@idux/components/utils'

import { type TableColumnMerged, useColumns } from './composables/useColumns'
import { useDataSource } from './composables/useDataSource'
import { useExpandable } from './composables/useExpandable'
import { useFilterable } from './composables/useFilterable'
import { usePagination } from './composables/usePagination'
import { useScroll } from './composables/useScroll'
import { useScrollOnChange } from './composables/useScrollOnChange'
import { useSelectable } from './composables/useSelectable'
import { useSortable } from './composables/useSortable'
import { useSticky } from './composables/useSticky'
import { useTableLayout } from './composables/useTableLayout'
import MainTable from './main/MainTable'
import { renderFooter } from './other/Footer'
import { renderPagination } from './other/Pagination'
import { TABLE_TOKEN } from './token'
import { tableProps } from './types'
import { getThemeTokens } from '../theme'

const virtualItemHeight = { sm: 32, md: 40, lg: 56 } as const
const virtualColWidth = 150

export default defineComponent({
  name: 'IxTable',
  props: tableProps,
  setup(props, { expose, slots }) {
    const common = useGlobalConfig('common')
    const { globalHashId, hashId, registerToken } = useThemeToken('table')
    registerToken(getThemeTokens)

    const mergedPrefixCls = computed(() => `${common.prefixCls}-table`)
    const locale = useGlobalConfig('locale')
    const config = useGlobalConfig('table')

    const mergedAutoHeight = computed(() => props.autoHeight ?? config.autoHeight)
    const mergedChildrenKey = computed(() => props.childrenKey ?? config.childrenKey)
    const mergedGetKey = useGetKey(props, config, 'components/table')
    const mergedEmptyCell = computed(() => props.emptyCell ?? config.emptyCell)
    const mergedInsetShadow = computed(() => props.insetShadow ?? config.insetShadow)
    const mergedSize = computed(() => props.size ?? config.size)
    const mergedVirtual = computed<VirtualScrollEnabled>(() => {
      return {
        horizontal: props.virtualHorizontal,
        vertical: props.virtual,
      }
    })
    const mergedVirtualItemHeight = computed(() => props.virtualItemHeight ?? virtualItemHeight[mergedSize.value])
    const mergedVirtualColWidth = computed(() => props.virtualColWidth ?? virtualColWidth)
    const { mergedPagination } = usePagination(props, config, mergedSize)

    const stickyContext = useSticky(props)
    const scrollContext = useScroll(props, stickyContext)
    const columnsContext = useColumns(props, slots, config, scrollContext.scrollBarSizeOnFixedHolder)
    const sortableContext = useSortable(columnsContext.flattedColumns)
    const filterableContext = useFilterable(columnsContext.flattedColumns)
    const expandableContext = useExpandable(props, columnsContext.flattedColumns)
    const tableLayout = useTableLayout(
      props,
      columnsContext,
      scrollContext,
      stickyContext.isSticky,
      mergedVirtual,
      mergedAutoHeight,
    )

    const { columnWidthMap, flattedColumns } = columnsContext
    const { activeSorters } = sortableContext
    const { activeFilters } = filterableContext

    const columnMap = new Map<VKey, TableColumnMerged>()
    const initColumnMap = () => {
      columnMap.clear()
      flattedColumns.value.forEach(col => {
        columnMap.set(col.key, col)
      })
    }
    watch(
      flattedColumns,
      () => {
        initColumnMap()
      },
      {
        immediate: true,
      },
    )

    const dataContext = useDataSource(
      props,
      mergedChildrenKey,
      mergedGetKey,
      activeSorters,
      activeFilters,
      expandableContext.expandedRowKeys,
      mergedPagination,
    )
    const selectableContext = useSelectable(props, locale, columnsContext.flattedColumns, dataContext)

    useScrollOnChange(props, config, mergedPagination, activeSorters, activeFilters, scrollContext.scrollTo)

    const getVirtualColWidth = (rowKey: VKey, colKey: VKey) => {
      return columnWidthMap.value[colKey] ?? columnMap.get(colKey)?.width
    }

    const context = {
      props,
      slots,
      config,
      locale,
      mergedPrefixCls,
      mergedEmptyCell,
      mergedInsetShadow,
      mergedVirtual,
      mergedVirtualItemHeight,
      mergedVirtualColWidth,
      mergedAutoHeight,
      getVirtualColWidth,
      ...columnsContext,
      ...scrollContext,
      ...sortableContext,
      ...filterableContext,
      ...stickyContext,
      tableLayout,
      mergedPagination,
      ...expandableContext,
      ...dataContext,
      ...selectableContext,
    }

    provide(TABLE_TOKEN, context)
    expose({ scrollTo: scrollContext.scrollTo })

    const { flattedData, filteredData } = dataContext

    const classes = computed(() => {
      const prefixCls = mergedPrefixCls.value
      const { borderless = config.borderless, scroll } = props
      return normalizeClass({
        [globalHashId.value]: !!globalHashId.value,
        [hashId.value]: !!hashId.value,
        [prefixCls]: true,
        [`${prefixCls}-auto-height`]: mergedAutoHeight.value,
        [`${prefixCls}-borderless`]: borderless,
        [`${prefixCls}-empty`]: flattedData.value.length === 0,
        [`${prefixCls}-full-height`]: scroll?.fullHeight,
        [`${prefixCls}-${mergedSize.value}`]: true,
      })
    })

    return () => {
      const prefixCls = mergedPrefixCls.value
      const header = <ɵHeader v-slots={slots} header={props.header} />
      const footer = renderFooter(slots, prefixCls)

      const children = [header]
      let resetChildren = [<MainTable />, footer].filter(Boolean) as VNode[]

      if (flattedData.value.length > 0) {
        const [paginationTop, paginationBottom] = renderPagination(
          slots,
          mergedPagination.value,
          filteredData.value,
          prefixCls,
        )

        resetChildren = [paginationTop, ...resetChildren, paginationBottom].filter(Boolean) as VNode[]
      }

      const spinProps = convertSpinProps(props.spin)
      if (spinProps) {
        children.push(<IxSpin {...spinProps}>{resetChildren}</IxSpin>)
      } else {
        children.push(...resetChildren)
      }
      return <div class={classes.value}>{children}</div>
    }
  },
})

function convertSpinProps(spin: boolean | SpinProps | undefined) {
  return isBoolean(spin) ? { spinning: spin } : spin
}
