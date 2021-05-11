<template>
  <li :class="classes" :style="{ paddingLeft }" @click="onClick">
    <span v-if="icon || $slots.icon" class="ix-menu-item-icon">
      <slot name="icon"><ix-icon :name="icon" /></slot>
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
import { menuItemGroupToken, menuToken, subMenuToken } from '../token'
import { menuItemPropsDef } from '../types'

export default defineComponent({
  name: 'IxMenuItem',
  components: { IxIcon },
  props: menuItemPropsDef,
  setup(props: MenuItemProps) {
    const { uid } = getCurrentInstance()!
    const cid = computed(() => props.cid ?? uid)

    // menuContext must exist
    const menuContext = inject(menuToken, null)!
    const subMenuContext = inject(subMenuToken, null)
    const menuItemGroupContext = inject(menuItemGroupToken, false)

    const isSelected = computed(() => menuContext.selectedIds.value.includes(cid.value))
    watch(isSelected, selected => subMenuContext?.setChildSelectState(cid.value, selected), { immediate: true })

    const classes = useClasses(props, isSelected)

    const level = subMenuContext ? subMenuContext.level + 1 : 1
    const paddingLeft = usePaddingLeft(menuContext.mode, menuContext.indent, level, menuItemGroupContext)

    const onClick = (evt: MouseEvent) => {
      if (props.disabled) {
        evt.preventDefault()
        evt.stopPropagation()
      } else {
        menuContext.menuItemClick(evt, cid.value, props)
        if (subMenuContext) {
          subMenuContext?.menuItemClick(evt, cid.value, props)
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
