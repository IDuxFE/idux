/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import type { MenuData } from '../types'
import type { Slot, VNode, VNodeChild } from 'vue'

import { isString } from 'lodash-es'

import { Logger } from '@idux/cdk/utils'
import { IxIcon } from '@idux/components/icon'

import MenuDivider from './MenuDivider'
import MenuItem from './MenuItem'
import MenuItemGroup from './MenuItemGroup'
import MenuSub from './menu-sub/MenuSub'

export function coverChildren(data?: MenuData[]): VNode[] {
  if (!data || data.length === 0) {
    return []
  }

  const nodes: VNode[] = []
  data.forEach(item => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const { type, additional, ...rest } = item as any
    if (type === 'item') {
      nodes.push(<MenuItem {...rest} {...additional}></MenuItem>)
    } else if (type === 'sub') {
      nodes.push(<MenuSub {...rest} {...additional}></MenuSub>)
    } else if (type === 'itemGroup') {
      nodes.push(<MenuItemGroup {...rest} {...additional}></MenuItemGroup>)
    } else if (type === 'divider') {
      nodes.push(<MenuDivider {...rest} {...additional}></MenuDivider>)
    } else {
      __DEV__ && Logger.warn('components/menu', `type [${type}] not supported`)
    }
  })

  return nodes
}

export function coverIcon<T>(
  slot: Slot | ((data: T) => VNodeChild) | undefined,
  slotProps: T,
  iconOrName: string | VNode | undefined,
  rotate?: number,
): VNodeChild | undefined {
  if (slot) {
    return slot(slotProps)
  }

  return isString(iconOrName) ? <IxIcon name={iconOrName} rotate={rotate}></IxIcon> : iconOrName
}
