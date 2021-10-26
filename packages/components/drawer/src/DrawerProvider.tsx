/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import type { DrawerInstance, DrawerOptions, DrawerRef } from './types'

import { cloneVNode, defineComponent, isVNode, provide, shallowRef } from 'vue'

import { callEmit, convertArray, noop, uniqueId } from '@idux/cdk/utils'

import Drawer from './Drawer'
import { drawerProviderToken } from './token'

export default defineComponent({
  name: 'IxDrawerProvider',
  setup(_, { expose, slots }) {
    const { drawers, apis } = useDrawerApis()
    provide(drawerProviderToken, apis)
    expose(apis)

    return () => {
      const children = drawers.value.map(item => {
        const { content, contentProps, ...rest } = item
        const contentNode = isVNode(content) ? cloneVNode(content, contentProps, true) : content
        return <Drawer {...rest}>{contentNode}</Drawer>
      })
      return (
        <>
          {slots.default?.()}
          {children}
        </>
      )
    }
  },
})

function useDrawer() {
  const drawers = shallowRef<Array<DrawerOptions & { ref?: (instance: unknown) => void }>>([])
  const drawerRefMap = new Map<string, DrawerRef>()

  const setDrawerRef = (key: string, instance: DrawerInstance | null) => {
    const ref = drawerRefMap.get(key)
    if (instance) {
      if (ref && !ref.open) {
        ref.open = instance.open
        ref.close = instance.close
      }
    } else {
      if (ref) {
        drawerRefMap.delete(key)
        ref.open = noop
        ref.close = noop as (evt?: unknown) => Promise<void>
      }
    }
  }

  const getCurrIndex = (key: string) => {
    return drawers.value.findIndex(message => message.key === key)
  }

  const add = (item: DrawerOptions) => {
    const currIndex = item.key ? getCurrIndex(item.key) : -1
    const tempDrawers = [...drawers.value]
    if (currIndex !== -1) {
      tempDrawers.splice(currIndex, 1, item)
      drawers.value = tempDrawers
      return item.key!
    }
    // The default value for `visible`
    const { key = uniqueId('ix-drawer'), visible = true, destroyOnHide, ...rest } = item
    const setRef = (instance: unknown) => setDrawerRef(key, instance as DrawerInstance | null)
    const onAfterClose = destroyOnHide ? () => destroy(key) : undefined
    tempDrawers.push({ ...rest, key, visible, ref: setRef, onAfterClose })
    drawers.value = tempDrawers
    return key
  }

  const update = (key: string, item: DrawerOptions) => {
    const currIndex = getCurrIndex(key)
    if (currIndex !== -1) {
      const tempDrawers = [...drawers.value]
      const newItem = { ...drawers.value[currIndex], ...item }
      tempDrawers.splice(currIndex, 1, newItem)
      drawers.value = tempDrawers
    }
  }

  const destroy = (key: string | string[]) => {
    const keys = convertArray(key)
    keys.forEach(key => {
      const currIndex = getCurrIndex(key)
      if (currIndex !== -1) {
        const tempDrawers = [...drawers.value]
        const item = tempDrawers.splice(currIndex, 1)
        drawers.value = tempDrawers
        callEmit(item[0].onDestroy, key)
      }
    })
  }

  const destroyAll = () => {
    drawers.value = []
  }

  return { drawers, drawerRefMap, add, update, destroy, destroyAll }
}

function useDrawerApis() {
  const { drawers, drawerRefMap, add, update, destroy, destroyAll } = useDrawer()

  const open = (options: DrawerOptions): DrawerRef => {
    const key = add(options)
    const drawerRef = {
      key,
      update: (options: DrawerOptions) => update(key, options),
      destroy: () => destroy(key),
    } as DrawerRef
    drawerRefMap.set(key, drawerRef)
    return drawerRef
  }

  const apis = { open, update, destroy, destroyAll }

  return { drawers, apis }
}
