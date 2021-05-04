import type { ComputedRef, Ref } from 'vue'
import type { MenuTheme } from '@idux/components/config'
import type { MenuItemProps, MenuMode, MenuProps } from '../types'
import type { MenuItemClickFn, SetChildOpenStateFn } from '../token'

import { computed, getCurrentInstance, ref, toRaw, watch } from 'vue'
import { useGlobalConfig } from '@idux/components/config'

export interface UseMenuConfig {
  indent: ComputedRef<number>
  theme: ComputedRef<MenuTheme>
}

export const useMenuConfig = (props: MenuProps): UseMenuConfig => {
  const config = useGlobalConfig('menu')
  const indent = computed(() => props.indent ?? config.indent)
  const theme = computed(() => props.theme ?? config.theme)

  return { indent, theme }
}

export const useClasses = (
  props: MenuProps,
  theme: ComputedRef<string>,
  mode: ComputedRef<MenuMode>,
): ComputedRef<Record<string, boolean>> => {
  return computed(() => {
    return {
      'ix-menu': true,
      [`ix-menu-${theme.value}`]: true,
      [`ix-menu-${mode.value}`]: true,
      'ix-menu-collapsed': props.collapsed,
    }
  })
}

export const useMenuMode = (props: MenuProps): ComputedRef<MenuMode> => {
  return computed(() => {
    const mode = props.mode
    if (props.collapsed && mode !== 'horizontal') {
      return 'vertical'
    }
    return mode
  })
}

export interface UseMenuSelected {
  selectedIds: Ref<(string | number)[]>
  menuItemClick: MenuItemClickFn
}

export const useMenuSelected = (props: MenuProps): UseMenuSelected => {
  const { emit } = getCurrentInstance()!
  const selectedIds = ref(props.selectedIds)
  watch(selectedIds, ids => emit('update:selectedIds', ids))
  watch(
    () => props.selectedIds,
    value => (selectedIds.value = value),
  )

  const menuItemClick = (cid: string | number, item: MenuItemProps) => {
    emit('click', { cid, item })

    if (!props.disabled) {
      const rawSelectedIds = toRaw(selectedIds.value)
      const selectedIndex = rawSelectedIds.indexOf(cid)
      if (props.multiple) {
        if (selectedIndex === -1) {
          selectedIds.value = [...rawSelectedIds, cid]
        } else {
          rawSelectedIds.splice(selectedIndex, 1)
          selectedIds.value = [...rawSelectedIds]
        }
      } else {
        if (selectedIndex === -1) {
          selectedIds.value = [cid]
        }
      }
    }
  }
  return { selectedIds, menuItemClick }
}

export interface UseMenuOpened {
  openedIds: Ref<(string | number)[]>
  setChildOpenState: SetChildOpenStateFn
}

export const useMenuOpened = (props: MenuProps): UseMenuOpened => {
  const { emit } = getCurrentInstance()!

  const openedIds = ref(props.openedIds)

  watch(openedIds, ids => emit('update:openedIds', ids))

  watch(
    () => props.openedIds,
    value => (openedIds.value = value),
  )

  const setChildOpenState = (cid: string | number, opened: boolean) => {
    const rawOpenedIds = toRaw(openedIds.value)
    const openedIndex = rawOpenedIds.indexOf(cid)
    if (opened) {
      if (openedIndex === -1) {
        openedIds.value = [...rawOpenedIds, cid]
      }
    } else {
      if (openedIndex !== -1) {
        rawOpenedIds.splice(openedIndex, 1)
        openedIds.value = [...rawOpenedIds]
      }
    }
  }

  return { openedIds, setChildOpenState }
}

export const useMenuCollapsed = (props: MenuProps, openedIds: Ref<(string | number)[]>): void => {
  let cachedOpenIds: Array<string | number> = []

  const onCollapsedUpdate = (collapsed: boolean) => {
    if (collapsed) {
      cachedOpenIds = toRaw(openedIds.value)
      openedIds.value = []
    } else {
      openedIds.value = cachedOpenIds
      cachedOpenIds = []
    }
  }

  watch(
    () => props.collapsed,
    value => onCollapsedUpdate(value),
  )
}
