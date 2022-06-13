/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

/* eslint-disable indent */

import { computed, defineComponent, provide, ref } from 'vue'

import { isString } from 'lodash-es'

import { IxHeader } from '@idux/components/header'
import { IxSpace } from '@idux/components/space'
import { IxTable, type TableCustomAdditional, type TableCustomTag } from '@idux/components/table'
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
  setup(props, { slots }) {
    const common = useGlobalConfig('common')
    const config = useGlobalConfig('table')
    const locale = useGlobalConfig('locale')

    const mergedPrefixCls = computed(() => `${common.prefixCls}-table`)
    const columnsContext = useColumns(props, config)
    const { hasResizable, onResizeEnd } = useResizable(columnsContext)

    provide(proTableToken, {
      props,
      slots,
      config,
      locale,
      mergedPrefixCls,
      ...columnsContext,
    })

    const headElementRef = ref<HTMLElement>()
    const layoutToolStyle = computed(() => {
      const headElement = headElementRef.value
      if (!headElement) {
        return { display: 'none' }
      }
      const { height } = headElement.getBoundingClientRect()
      return { marginTop: `${(height - 16) / 2}px` }
    })

    const renderLayoutTool = () => {
      if (!props.layoutTool) {
        return null
      }
      return <ProTableLayoutTool style={layoutToolStyle.value} />
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
      const { editable, customAdditional, customTag, ...restProps } = props
      const resizable = hasResizable.value

      const mergedCustomAdditional: TableCustomAdditional = {
        ...customAdditional,
        headCell: ({ column }) => {
          const additionalProps = customAdditional?.headCell ? customAdditional.headCell({ column }) : undefined
          return resizable ? { ...additionalProps, column, onResizeEnd } : additionalProps
        },
        head: ({ rows }) => {
          const additionalProps = customAdditional?.head ? customAdditional.head({ rows }) : undefined
          return { ...additionalProps, ref: headElementRef }
        },
      }
      const mergedCustomTag: TableCustomTag = {
        headCell: resizable ? ResizableHeadCell : undefined,
        ...customAdditional,
      }

      return (
        <IxTable
          v-slots={{ ...slots, header: renderHeader, default: renderLayoutTool }}
          {...restProps}
          class={mergedPrefixCls.value}
          columns={columnsContext.displayColumns.value}
          customAdditional={mergedCustomAdditional}
          customTag={mergedCustomTag}
        />
      )
    }
  },
})
