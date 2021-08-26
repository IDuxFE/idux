<template>
  <ul :class="classes" @mouseenter="onMouseEvent(true)" @mouseleave="onMouseEvent(false)">
    <slot></slot>
  </ul>
</template>

<script lang="ts">
import { computed, defineComponent, inject } from 'vue'
import { IxPropTypes } from '@idux/cdk/utils'
import { ɵDropdownToken } from '@idux/components/dropdown'

export default defineComponent({
  props: {
    disabled: IxPropTypes.bool,
    mode: IxPropTypes.oneOf(['vertical', 'horizontal', 'inline'] as const),
    theme: IxPropTypes.oneOf(['light', 'dark'] as const),
  },
  emits: ['mouseOverlayChang'],
  setup(props, { emit }) {
    const dropdownContext = inject(ɵDropdownToken, null)
    const classes = computed(() => {
      return {
        'ix-menu-vertical': true,
        'ix-menu-content': true,
        'ix-menu-dropdown': !!dropdownContext,
        [`ix-menu-${props.theme}`]: true,
      }
    })

    const onMouseEvent = (value: boolean) => {
      if (!props.disabled) {
        emit('mouseOverlayChang', value)
        dropdownContext?.onMouseOverlayChang(value)
      }
    }
    return { classes, onMouseEvent }
  },
})
</script>
