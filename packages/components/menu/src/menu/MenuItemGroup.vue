<template>
  <li class="ix-menu-item-group" @click="onClick">
    <div class="ix-menu-item-group-title" :style="{ paddingLeft }">
      <span v-if="icon || $slots.icon" class="ix-menu-item-group-title-icon">
        <slot name="icon"><ix-icon :name="icon" /></slot>
      </span>
      <span>
        <slot name="title">{{ title }}</slot>
      </span>
    </div>
    <ul class="ix-menu-item-group-content">
      <slot></slot>
    </ul>
  </li>
</template>

<script lang="ts">
import { defineComponent, inject, provide } from 'vue'
import { IxIcon } from '@idux/components/icon'
import { menuItemGroupPropsDef } from '../types'
import { menuItemGroupToken, menuToken, subMenuToken } from '../token'
import { usePaddingLeft } from '../usePaddingLeft'

export default defineComponent({
  name: 'IxMenuItemGroup',
  components: { IxIcon },
  props: menuItemGroupPropsDef,
  setup() {
    provide(menuItemGroupToken, true)

    // menuContext must exist
    const menuContext = inject(menuToken, null)!
    const subMenuContext = inject(subMenuToken, null)

    const level = subMenuContext ? subMenuContext.level + 1 : 1
    const paddingLeft = usePaddingLeft(menuContext.mode, menuContext.indent, level, false)

    return { paddingLeft }
  },
})
</script>
