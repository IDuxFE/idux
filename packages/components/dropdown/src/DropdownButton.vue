<template>
  <ix-button-group v-click-outside="onClickOutside" class="ix-dropdown">
    <ix-button><slot /></ix-button>
    <ix-button ref="triggerRef">
      <slot name="icon"><ix-icon :name="icon" /></slot>
    </ix-button>
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
  </ix-button-group>
</template>

<script lang="ts">
import type { DropdownButtonProps } from './types'

import { defineComponent } from 'vue'
import { clickOutside } from '@idux/cdk/click-outside'
import { IxButton, IxButtonGroup } from '@idux/components/button'
import { IxIcon } from '@idux/components/icon'
import { dropdownButtonPropsDef } from './types'
import { useDropdownConfig, useDropdownOpenState, useDropdownOverlay } from './useDropdown'

export default defineComponent({
  name: 'IxDropdownButton',
  directives: { clickOutside, IxIcon, IxButton, IxButtonGroup },
  props: dropdownButtonPropsDef,
  emits: ['update:visible'],
  setup(props: DropdownButtonProps) {
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
