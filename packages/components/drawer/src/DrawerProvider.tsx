/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import type { DrawerInstance, DrawerOptions, DrawerRef } from './types'
import type { VKey } from '@idux/cdk/utils'

import { cloneVNode, defineComponent, isVNode, provide, shallowRef } from 'vue'

import { NoopFunction, callEmit, convertArray, uniqueId } from '@idux/cdk/utils'

import Drawer from './Drawer'
import { drawerProviderToken } from './token'

export default defineComponent({
  name: 'IxDrawerProvider',
  setup(_, { expose, slots }) {
    const { drawers, setDrawerRef, open, update, destroy, destroyAll } = useDrawer()
    const apis = { open, update, destroy, destroyAll }

    provide(drawerProviderToken, apis)
    expose(apis)

    return () => {
      const children = drawers.value.map(item => {
        // The default value for `visible`, onDestroy should not be passed in Drawer
        const { key, visible = true, destroyOnHide, onDestroy, content, contentProps, ...rest } = item
        const setRef = (instance: unknown) => setDrawerRef(key!, instance as DrawerInstance | null)
        const onUpdateVisible = (visible: boolean) => update(key!, { visible })
        const onAfterClose = destroyOnHide ? () => destroy(key!) : undefined
        const mergedProps = { key, visible, ref: setRef, 'onUpdate:visible': onUpdateVisible, onAfterClose }

        const contentNode = isVNode(content) ? cloneVNode(content, contentProps, true) : content
        return (
          <Drawer {...mergedProps} {...rest}>
            {contentNode}
          </Drawer>
        )
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
  const drawers = shallowRef<Array<DrawerOptions & { ref?: (instance: unknown) => void; isProvider?: boolean }>>([])
  const drawerRefMap = new Map<VKey, DrawerRef>()

  const setDrawerRef = (key: VKey, instance: DrawerInstance | null) => {
    const ref = drawerRefMap.get(key)
    if (instance) {
      if (ref && !ref.open) {
        ref.open = instance.open
        ref.close = instance.close
      }
    } else {
      if (ref) {
        drawerRefMap.delete(key)
        ref.open = NoopFunction
        ref.close = NoopFunction as (evt?: unknown) => Promise<void>
      }
    }
  }

  const getCurrIndex = (key: VKey) => {
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
    item.key = item.key ?? uniqueId('ix-drawer')
    tempDrawers.push(item)
    drawers.value = tempDrawers
    return item.key
  }

  const update = (key: VKey, item: DrawerOptions) => {
    const currIndex = getCurrIndex(key)
    if (currIndex !== -1) {
      const tempDrawers = [...drawers.value]
      const newItem = { ...drawers.value[currIndex], ...item }
      tempDrawers.splice(currIndex, 1, newItem)
      drawers.value = tempDrawers
    }
  }

  const destroy = (key: VKey | VKey[]) => {
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

  return { drawers, setDrawerRef, open, update, destroy, destroyAll }
}
