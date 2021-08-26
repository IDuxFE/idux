<template>
  <IxButtonGroup v-click-outside="onClickOutside" class="ix-dropdown">
    <IxButton><slot /></IxButton>
    <IxButton ref="triggerRef">
      <slot name="icon"><IxIcon :name="icon" /></slot>
    </IxButton>
    <IxPortal target="ix-dropdown-container">
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
    </IxPortal>
  </IxButtonGroup>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { clickOutside } from '@idux/cdk/click-outside'
import { IxPortal } from '@idux/cdk/portal'
import { IxButton, IxButtonGroup } from '@idux/components/button'
import { IxIcon } from '@idux/components/icon'
import { dropdownButtonProps } from './types'
import { useDropdownConfig, useDropdownOpenState, useDropdownOverlay } from './useDropdown'

export default defineComponent({
  name: 'IxDropdownButton',
  components: { IxPortal, IxIcon, IxButton, IxButtonGroup },
  directives: { clickOutside },
  props: dropdownButtonProps,
  emits: ['update:visible'],
  setup(props) {
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
