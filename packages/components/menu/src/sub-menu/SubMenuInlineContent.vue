<template>
  <transition>
    <ul v-show="opened" :class="classes">
      <slot></slot>
    </ul>
  </transition>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue'
import { PropTypes } from '@idux/cdk/utils'

export default defineComponent({
  name: 'IxSubMenuInlineContent',
  props: {
    opened: PropTypes.bool,
    mode: PropTypes.oneOf(['vertical', 'horizontal', 'inline'] as const),
  },
  setup(props) {
    const classes = computed(() => {
      return {
        'ix-menu-content': true,
        [`ix-menu-${props.mode}`]: true,
      }
    })
    return { classes }
  },
})
</script>
