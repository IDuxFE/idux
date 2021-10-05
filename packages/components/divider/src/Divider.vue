<template>
  <div :class="className">
    <span v-if="withText" :class="`${prefixCls}-divider-inner-text`">
      <slot />
    </span>
  </div>
</template>
<script lang="ts">
import type { ComputedRef } from 'vue'
import type { DividerConfig } from '@idux/components/config'
import type { DividerProps } from './types'

import { computed, defineComponent } from 'vue'
import { hasSlot } from '@idux/cdk/utils'
import { useGlobalConfig } from '@idux/components/config'
import { dividerProps } from './types'

export default defineComponent({
  name: 'IxDivider',
  props: dividerProps,
  setup(props, { slots }) {
    const { prefixCls } = useGlobalConfig('common')
    const dividerConfig = useGlobalConfig('divider')
    const withText = computed(() => hasSlot(slots))
    const className = useClassName(props, dividerConfig, withText)

    return { prefixCls, className, withText }
  },
})

function useClassName(props: DividerProps, config: DividerConfig, withText: ComputedRef<boolean>) {
  const { prefixCls } = useGlobalConfig('common')
  return computed(() => {
    const position = props.position || config.position
    const type = props.type || config.type
    const dashed = props.dashed || config.dashed
    const plain = props.plain || config.plain

    return [
      `${prefixCls}-divider`,
      `${prefixCls}-divider-${type}`,
      {
        [`${prefixCls}-divider-with-text`]: withText.value,
        [`${prefixCls}-divider-dashed`]: dashed,
        [`${prefixCls}-divider-plain`]: plain && withText.value,
        [`${prefixCls}-divider-with-text-${position}`]: type === 'horizontal' && withText.value,
      },
    ]
  })
}
</script>
