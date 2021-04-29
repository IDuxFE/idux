<template>
  <a ref="triggerRef" v-click-outside="onClickOutside" class="ix-dropdown">
    <slot />
    <slot name="icon"><ix-icon v-if="icon" :name="icon" /></slot>
    <ix-portal target="ix-dropdown-container">
      <transition>
        <div
          v-show="visibility"
          ref="overlayRef"
          :class="overlayClass"
          @mouseenter="onMouseOverlayChang(true)"
          @mouseleave="onMouseOverlayChang(false)"
        >
          <slot name="overlay" />
        </div>
      </transition>
    </ix-portal>
  </a>
</template>

<script lang="ts">
import type { DropdownProps } from './types'

import { defineComponent } from 'vue'
import { clickOutside } from '@idux/cdk/click-outside'
import { IxIcon } from '@idux/components/icon'
import { dropdownPropsDef } from './types'
import { useDropdownConfig, useDropdownOpenState, useDropdownOverlay } from './useDropdown'

export default defineComponent({
  name: 'IxDropdown',
  directives: { clickOutside, IxIcon },
  props: dropdownPropsDef,
  emits: ['update:visible'],
  setup(props: DropdownProps) {
    const { placement, trigger } = useDropdownConfig(props)
    const { openState, onMouseOverlayChang } = useDropdownOpenState(trigger)
    const { triggerRef, overlayRef, visibility, onClickOutside } = useDropdownOverlay(
      props,
      placement,
      trigger,
      openState,
    )

    return { triggerRef, overlayRef, visibility, onClickOutside, onMouseOverlayChang }
  },
})
</script>
