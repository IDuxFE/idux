<template>
  <ul :class="classes">
    <slot />
  </ul>
</template>

<script lang="ts">
import type { MenuProps } from '../types'

import { computed, defineComponent, provide } from 'vue'
import { menuToken } from '../token'
import { menuPropsDef } from '../types'
import { useClasses, useMenuCollapsed, useMenuConfig, useMenuMode, useMenuOpened, useMenuSelected } from './useMenu'

export default defineComponent({
  name: 'IxMenu',
  props: menuPropsDef,
  emits: ['click', 'update:selectedIds', 'update:openedIds'],
  setup(props: MenuProps) {
    const multiple = computed(() => props.multiple)
    const { indent, theme } = useMenuConfig(props)
    const mode = useMenuMode(props)
    const { selectedIds, menuItemClick } = useMenuSelected(props)
    const { openedIds, setChildOpenState } = useMenuOpened(props)

    useMenuCollapsed(props, openedIds)

    provide(menuToken, { multiple, indent, theme, mode, selectedIds, openedIds, menuItemClick, setChildOpenState })

    const classes = useClasses(props, theme, mode)

    return { classes }
  },
})
</script>
