/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

/* eslint-disable indent */

import { cloneVNode, computed, defineComponent, provide } from 'vue'

import { isString } from 'lodash-es'

import { IxHeader } from '@idux/components/header'
import { IxIcon } from '@idux/components/icon'
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
    const mergedToolbar = computed(() => props.toolbar ?? config.toolbar)
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

    const renderToolbar = () => {
      const children = mergedToolbar.value.map(tool => {
        if (tool === 'layout') {
          return <ProTableLayoutTool></ProTableLayoutTool>
        }
        const { trigger, ...triggerProps } = tool
        if (isString(trigger)) {
          return <IxIcon name={trigger} {...triggerProps}></IxIcon>
        }
        return cloneVNode(trigger, triggerProps)
      })

      if (children.length <= 1) {
        return children
      }
      return <IxSpace align="center">{children}</IxSpace>
    }

    const renderHeader = () => {
      const headerSlots = { suffix: slots.toolbar ?? renderToolbar }
      const { header } = props
      const headerProps = isString(header) ? { title: header } : header
      return <IxHeader v-slots={headerSlots} {...headerProps}></IxHeader>
    }

    return () => {
      const { editable, toolbar, customAdditional, customTag, ...restProps } = props

      const mergedCustomAdditional: TableCustomAdditional | undefined = hasResizable.value
        ? {
            ...customAdditional,
            headCell: ({ column }) => {
              const additionalProps = customAdditional?.headCell ? customAdditional.headCell({ column }) : undefined
              return { ...additionalProps, column, onResizeEnd }
            },
          }
        : customAdditional
      const mergedCustomTag: TableCustomTag | undefined = hasResizable.value
        ? {
            headCell: ResizableHeadCell,
            ...customAdditional,
          }
        : customTag
      return (
        <IxTable
          v-slots={{ header: renderHeader, ...slots }}
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
