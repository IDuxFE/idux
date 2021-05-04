<template>
  <ul :class="classes" @mouseenter="onMouseEvent(true)" @mouseleave="onMouseEvent(false)">
    <slot></slot>
  </ul>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue'
import { PropTypes } from '@idux/cdk/utils'

export default defineComponent({
  name: 'IxSubMenuOverlayContent',
  props: {
    disabled: PropTypes.bool,
    mode: PropTypes.oneOf(['vertical', 'horizontal', 'inline'] as const),
    theme: PropTypes.oneOf(['light', 'dark'] as const),
  },
  emits: ['mouseOverlayChang'],
  setup(props, { emit }) {
    const classes = computed(() => {
      return {
        'ix-menu-vertical': true,
        'ix-menu-content': true,
        [`ix-menu-${props.theme}`]: true,
      }
    })

    const onMouseEvent = (value: boolean) => {
      if (!props.disabled) {
        emit('mouseOverlayChang', value)
      }
    }
    return { classes, onMouseEvent }
  },
})
</script>
