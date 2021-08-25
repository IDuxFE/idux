<template>
  <transition>
    <ul v-show="opened" :class="classes">
      <slot></slot>
    </ul>
  </transition>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue'
import { IxPropTypes } from '@idux/cdk/utils'

export default defineComponent({
  props: {
    opened: IxPropTypes.bool,
    mode: IxPropTypes.oneOf(['vertical', 'horizontal', 'inline'] as const),
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
