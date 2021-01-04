<template>
  <div class="ix-divider" :class="className">
    <span v-if="$slots.default" class="ix-divider-inner-text">
      <slot />
    </span>
  </div>
</template>
<script lang="ts">
import type { Ref, SetupContext } from 'vue'
import type { DividerConfig } from '@idux/components/core/config'
import type { DividerProps } from './types'

import { computed, defineComponent, onUpdated, ref } from 'vue'
import { PropTypes } from '@idux/cdk/utils'
import { useGlobalConfig } from '@idux/components/core/config'
import { getFirstValidNode, isValidElementNode } from '@idux/cdk/utils'

export default defineComponent({
  name: 'IxDivider',
  props: {
    dashed: PropTypes.bool,
    plain: PropTypes.bool,
    position: PropTypes.oneOf(['left', 'center', 'right'] as const),
    type: PropTypes.oneOf(['horizontal', 'vertical'] as const),
  },
  setup(props: DividerProps, { slots }: SetupContext) {
    const dividerConfig = useGlobalConfig('divider')
    let text = getFirstValidNode(slots.default?.())
    const withText = ref(!!(text && isValidElementNode(text)))

    onUpdated(() => {
      text = getFirstValidNode(slots.default?.())
      withText.value = !!(text && isValidElementNode(text))
    })

    const className = useClassName(props, dividerConfig, withText)

    return { className }
  },
})

function useClassName(props: DividerProps, config: DividerConfig, withText: Ref<boolean>) {
  return computed(() => {
    const position = props.position || config.position
    const type = props.type || config.type
    const dashed = props.dashed || config.dashed
    const plain = props.plain || config.plain

    return [
      `ix-divider-${type}`,
      {
        'ix-divider-with-text': withText.value,
        'ix-divider-dashed': dashed,
        'ix-divider-plain': plain && withText.value,
        [`ix-divider-with-text-${position}`]: type === 'horizontal' && withText.value,
      },
    ]
  })
}
</script>
