/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import { type Slot, type VNode, type VNodeChild } from 'vue'

import { isString } from 'lodash-es'

import { Logger } from '@idux/cdk/utils'
import { IxIcon } from '@idux/components/icon'
import { type GetKeyFn } from '@idux/components/utils'

import MenuDivider from './MenuDivider'
import MenuItem from './MenuItem'
import MenuItemGroup from './MenuItemGroup'
import { type MenuData } from '../types'
import MenuSub from './menu-sub/MenuSub'

export function coverChildren(data: MenuData[] | undefined, getKetFn: GetKeyFn): VNode[] {
  if (!data || data.length === 0) {
    return []
  }

  const nodes: VNode[] = []
  data.forEach((item, index) => {
    const { type } = item
    const key = getKetFn(item)
    if (!type || type === 'item') {
      nodes.push(<MenuItem key={key} index={index} data={item}></MenuItem>)
    } else if (type === 'sub') {
      nodes.push(<MenuSub key={key} index={index} data={item}></MenuSub>)
    } else if (type === 'itemGroup') {
      nodes.push(<MenuItemGroup key={key} index={index} data={item}></MenuItemGroup>)
    } else if (type === 'divider') {
      nodes.push(<MenuDivider key={key} index={index} data={item}></MenuDivider>)
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
