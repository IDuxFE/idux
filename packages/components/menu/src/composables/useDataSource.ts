/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

/* eslint-disable @typescript-eslint/no-explicit-any */

import { type ComputedRef, type Slots, type VNode, computed } from 'vue'

import { Logger, flattenNode } from '@idux/cdk/utils'

import { dividerKey, itemGroupKey, itemKey, subKey } from '../menus'
import { type MenuData, type MenuProps } from '../types'

export function useDataSource(props: MenuProps, slots: Slots): ComputedRef<MenuData[]> {
  return computed(() => {
    const { dataSource } = props
    if (dataSource) {
      return dataSource
    } else {
      return convertDataSource(slots.default?.())
    }
  })
}

const filterKeys = [itemKey, itemGroupKey, subKey, dividerKey]

function convertDataSource(nodes: VNode[] | undefined): MenuData[] {
  const dataSource: Array<MenuData> = []

  flattenNode(nodes, { key: filterKeys }).forEach(node => {
    const type = node.type as any
    const slots = node.children ?? ({} as any)
    const props = node.props ?? ({} as any)
    let data: MenuData
    if (type[itemKey]) {
      const { key, disabled, icon, label, ...additional } = props
      data = {
        key,
        disabled: disabled || disabled === '',
        icon,
        label,
        additional,
        slots,
      }
    } else if (type[itemGroupKey]) {
      const { key, children, icon, label, ...additional } = props
      const _children = children ?? convertDataSource(slots.default?.())
      data = {
        type: 'itemGroup',
        key,
        children: _children,
        icon,
        label,
        additional,
        slots,
      }
    } else if (type[subKey]) {
      const { key, children, disabled, icon, label, suffix, ...additional } = props
      const _children = children ?? convertDataSource(slots.default?.())
      data = {
        type: 'sub',
        key,
        children: _children,
        disabled: disabled || disabled === '',
        icon,
        label,
        additional,
        slots,
      }
    } else {
      const { key, ...additional } = props
      data = { type: 'divider', key, additional }
    }
    if (__DEV__ && data.type !== 'divider' && !data.key) {
      Logger.warn('components/menu', 'key must exist', data)
    }
    dataSource.push(data)
  })

  return dataSource
}
