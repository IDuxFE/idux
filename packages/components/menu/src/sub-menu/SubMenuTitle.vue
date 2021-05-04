<template>
  <div
    class="ix-menu-sub-title"
    :style="{ paddingLeft }"
    @click="onClick"
    @mouseenter="onMouseEvent(true)"
    @mouseleave="onMouseEvent(false)"
  >
    <span v-if="icon || $slots.icon" class="ix-menu-sub-title-icon">
      <slot name="icon"><ix-icon :name="icon" /></slot>
    </span>
    <span>
      <slot>{{ title }}</slot>
    </span>
    <span v-if="suffix || $slots.suffix" class="ix-menu-sub-title-suffix-icon">
      <slot name="suffix"><ix-icon :name="suffix" :rotate="suffixRotate" /></slot>
    </span>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue'

import { PropTypes } from '@idux/cdk/utils'
import { IxIcon } from '@idux/components/icon'

export default defineComponent({
  name: 'IxSubMenuTitle',
  components: { IxIcon },
  props: {
    opened: PropTypes.bool,
    disabled: PropTypes.bool,
    icon: PropTypes.string,
    mode: PropTypes.oneOf(['vertical', 'horizontal', 'inline'] as const),
    paddingLeft: PropTypes.string,
    suffix: PropTypes.string,
    suffixRotates: PropTypes.arrayOf(PropTypes.number),
    title: PropTypes.string,
  },
  emits: ['click', 'mouseOverlayChang'],
  setup(props, { emit }) {
    const onClick = () => {
      if (props.mode === 'inline' && !props.disabled) {
        emit('click')
      }
    }

    const onMouseEvent = (value: boolean) => {
      if (!props.disabled) {
        emit('mouseOverlayChang', value)
      }
    }

    const suffixRotate = computed(() => {
      if (props.mode === 'inline') {
        const [expanded, collapsed] = props.suffixRotates || []
        return props.opened ? expanded : collapsed
      }
      return 0
    })

    return { onClick, onMouseEvent, suffixRotate }
  },
})
</script>
