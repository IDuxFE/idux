/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

/* eslint-disable indent */

import { computed, defineComponent, provide, ref, watch } from 'vue'

import { isString } from 'lodash-es'

import { type VirtualScrollToOptions } from '@idux/cdk/scroll'
import { useState } from '@idux/cdk/utils'
import { useGlobalConfig as useComponentsGlobalConfig } from '@idux/components/config'
import { IxHeader } from '@idux/components/header'
import { IxSpace } from '@idux/components/space'
import { IxTable, type TableCustomAdditional, type TableCustomTag, type TableInstance } from '@idux/components/table'
import { useGlobalConfig } from '@idux/pro/config'

import ProTableLayoutTool from './ProTableLayoutTool'
import { useColumns } from './composables/useColumns'
import { useResizable } from './composables/useResizable'
import ResizableHeadCell from './contents/ResizableHeadCell'
import { proTableToken } from './token'
import { proTableProps } from './types'

export default defineComponent({
  name: 'IxProTable',
  props: proTableProps,
  setup(props, { slots, expose }) {
    const common = useGlobalConfig('common')
    const config = useGlobalConfig('table')
    const baseConfig = useComponentsGlobalConfig('table')
    const locale = useGlobalConfig('locale')

    const mergedPrefixCls = computed(() => `${common.prefixCls}-table`)
    const columnsContext = useColumns(props, config)
    const { hasResizable, onResizeEnd } = useResizable(columnsContext)
    const mergedConfigSize = computed(() => props.size ?? baseConfig.size)
    const [mergedSize, setMergedSize] = useState(mergedConfigSize.value)
    watch(() => mergedConfigSize.value, setMergedSize)

    provide(proTableToken, {
      props,
      slots,
      config,
      locale,
      mergedPrefixCls,
      mergedSize,
      setMergedSize,
      ...columnsContext,
    })

    const tableRef = ref<TableInstance>()
    expose({
      scrollTo: (option?: number | VirtualScrollToOptions) => tableRef.value?.scrollTo(option),
    })

    const renderLayoutTool = () => {
      if (!props.layoutTool) {
        return null
      }
      return <ProTableLayoutTool />
    }

    const renderToolbar = () => {
      const { toolbar } = props
      if (!toolbar) {
        return undefined
      }
      if (toolbar.length <= 1) {
        return toolbar
      }
      return <IxSpace align="center">{toolbar}</IxSpace>
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
      const { editable, customAdditional, customTag, layoutTool, toolbar, ...restProps } = props
      const resizable = hasResizable.value

      const mergedCustomAdditional: TableCustomAdditional = {
        ...customAdditional,
        headCell: ({ column }) => {
          const additionalProps = customAdditional?.headCell ? customAdditional.headCell({ column }) : undefined
          return resizable ? { ...additionalProps, column, onResizeEnd } : additionalProps
        },
      }
      const mergedCustomTag: TableCustomTag = {
        headCell: resizable ? ResizableHeadCell : undefined,
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
        />
      )
    }
  },
})
