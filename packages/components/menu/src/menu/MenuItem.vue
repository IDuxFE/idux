<template>
  <li :class="classes" :style="{ paddingLeft }" @click="onClick">
    <span v-if="icon || $slots.icon" class="ix-menu-item-icon">
      <slot name="icon"><IxIcon :name="icon" /></slot>
    </span>
    <span>
      <slot>{{ title }}</slot>
    </span>
  </li>
</template>

<script lang="ts">
import type { Ref } from 'vue'
import type { MenuItemProps } from '../types'

import { computed, defineComponent, getCurrentInstance, inject, watch } from 'vue'
import { IxIcon } from '@idux/components/icon'
import { usePaddingLeft } from '../usePaddingLeft'
import { menuItemGroupToken, menuToken, menuSubToken } from '../token'
import { menuItemProps } from '../types'

export default defineComponent({
  name: 'IxMenuItem',
  components: { IxIcon },
  props: menuItemProps,
  setup(props: MenuItemProps) {
    const { uid } = getCurrentInstance()!
    const cid = computed(() => props.cid ?? uid)

    // menuContext must exist
    const menuContext = inject(menuToken, null)!
    const menuSubContext = inject(menuSubToken, null)
    const menuItemGroupContext = inject(menuItemGroupToken, false)

    const isSelected = computed(() => menuContext.selectedIds.value.includes(cid.value))
    watch(isSelected, selected => menuSubContext?.setChildSelectState(cid.value, selected), { immediate: true })

    const classes = useClasses(props, isSelected)

    const level = menuSubContext ? menuSubContext.level + 1 : 1
    const paddingLeft = usePaddingLeft(menuContext.mode, menuContext.indent, level, menuItemGroupContext)

    const onClick = (evt: MouseEvent) => {
      if (props.disabled) {
        evt.preventDefault()
        evt.stopPropagation()
      } else {
        menuContext.menuItemClick(evt, cid.value, props)
        if (menuSubContext) {
          menuSubContext?.menuItemClick(evt, cid.value, props)
        } else {
          menuContext.childMenuItemClick()
        }
      }
    }

    return { classes, paddingLeft, onClick }
  },
})

const useClasses = (props: MenuItemProps, selected: Ref<boolean>) => {
  return computed(() => {
    return {
      'ix-menu-item': true,
      'ix-menu-item-disabled': props.disabled,
      'ix-menu-item-selected': selected.value,
    }
  })
}
</script>
