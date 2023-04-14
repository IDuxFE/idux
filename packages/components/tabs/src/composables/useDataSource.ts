/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

/* eslint-disable @typescript-eslint/no-explicit-any */

import type { TabsData, TabsProps } from '../types'
import type { ComputedRef, Slots, VNode } from 'vue'

import { computed } from 'vue'

import { flattenNode, uniqueId } from '@idux/cdk/utils'

import { tabKey } from '../tab'

export function useDataSource(props: TabsProps, slots: Slots): ComputedRef<TabsData[]> {
  return computed(() => {
    return props.dataSource ?? convertData(slots.default?.())
  })
}

function convertData(nodes: VNode[] | undefined): TabsData[] {
  const convertedData: TabsData[] = []

  flattenNode(nodes, { key: tabKey }).forEach(node => {
    const props = node.props ?? ({} as any)
    const slots = node.children ?? ({} as any)

    const { key = uniqueId('__IDUX_TAB_'), closable, content, disabled, forceRender, title, ...rest } = props
    const { title: customTitle, default: customContent } = slots

    const option: TabsData = {
      key,
      content,
      closable: closable === '' || closable,
      disabled: disabled === '' || disabled,
      forceRender: forceRender === '' || forceRender,
      title,
      customTitle,
      customContent,
      ...rest,
    }

    convertedData.push(option)
  })

  return convertedData
}
