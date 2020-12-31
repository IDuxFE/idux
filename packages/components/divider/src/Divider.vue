<template>
  <div class="ix-divider" :class="className">
    <span v-if="$slots.default" class="ix-divider-inner-text">
      <slot />
    </span>
  </div>
</template>
<script lang="ts">
import { computed, defineComponent } from 'vue'
import { PropTypes } from '@idux/cdk/utils'
import { useGlobalConfig } from '@idux/components/core/config'

import type { DividerConfig } from '@idux/components/core/config'
import type { DividerProps } from './types'

export default defineComponent({
  name: 'IxDivider',
  props: {
    dashed: PropTypes.bool,
    plain: PropTypes.bool,
    position: PropTypes.oneOf(['left', 'center', 'right'] as const),
    type: PropTypes.oneOf(['horizontal', 'vertical'] as const),
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
