/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import { Component, Slot, type VNode, type VNodeChild } from 'vue'

import { isString } from 'lodash-es'

import { Logger } from '@idux/cdk/utils'
import { IxIcon } from '@idux/components/icon'
import { type GetKeyFn } from '@idux/components/utils'

import { type MenuData } from '../types'

export function coverChildren(data: MenuData[] | undefined, getKetFn: GetKeyFn): VNode[] {
  if (!data || data.length === 0) {
    return []
  }

  const nodes: VNode[] = []
  data.forEach((item, index) => {
    const { type = 'item' } = item
    const key = getKetFn(item)
    const component = componentFactory.getComponent(type)
    if (component) {
      nodes.push(<component key={key} index={index} data={item} />)
    } else {
      __DEV__ && Logger.warn('components/menu', `type [${type}] not supported`)
    }
  })

  return nodes
}

type MenuType = 'item' | 'itemGroup' | 'sub' | 'divider'

class ComponentFactory {
  private static instance: ComponentFactory
  private components = new Map<MenuType, Component>()

  static getInstance(): ComponentFactory {
    if (!ComponentFactory.instance) {
      ComponentFactory.instance = new ComponentFactory()
    }
    return ComponentFactory.instance
  }

  registerComponent(type: MenuType, component: Component) {
    this.components.set(type, component)
  }

  getComponent(type: MenuType): Component | undefined {
    return this.components.get(type)
  }
}

export const componentFactory = ComponentFactory.getInstance()

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
