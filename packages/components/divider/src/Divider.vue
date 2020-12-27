<template>
  <div class="ix-divider" :class="className">
    <span v-if="$slots.default" class="ix-divider-inner-text">
      <slot />
    </span>
  </div>
</template>
<script lang="ts">
import type { PropType } from 'vue'
import type { DividerConfig } from '@idux/components/core/config'
import type { DividerPosition, DividerType } from '@idux/components/core/types'
import type { DividerProps } from './types'

import { computed, defineComponent } from 'vue'
import { useGlobalConfig } from '@idux/components/core/config'

export default defineComponent({
  name: 'IxDivider',
  props: {
    dashed: { type: Boolean, default: undefined },
    plain: { type: Boolean, default: undefined },
    position: {
      type: String as PropType<DividerPosition>,
      default: undefined,
    },
    type: {
      type: String as PropType<DividerType>,
      default: undefined,
    },
  },
  setup(props: DividerProps, { slots }) {
    const dividerConfig = useGlobalConfig('divider')
    const className = useClassName(props, dividerConfig, !!slots.default)

    return { className }
  },
})

function useClassName(props: DividerProps, config: DividerConfig, withText: boolean) {
  return computed(() => {
    const position = props.position || config.position
    const type = props.type || config.type
    const dashed = props.dashed || config.dashed
    const plain = props.plain || config.plain

    return [
      `ix-divider-${type}`,
      {
        'ix-divider-with-text': withText,
        'ix-divider-dashed': dashed,
        'ix-divider-plain': plain && withText,
        [`ix-divider-with-text-${position}`]: type === 'horizontal' && withText,
      },
    ]
  })
}
</script>
