<template>
  <div class="ix-collapse-panel-header" :class="headerClasses" @click="$emit('click')">
    <slot name="icon">
      <ix-icon class="ix-collapse-panel-icon" :name="icons"></ix-icon>
    </slot>

    <slot
      name="title"
      class="ix-collapse-panel-header-content"
      :class="{ 'ix-collapse-panel-header-borderless-content': borderless }"
    >
      {{ title }}
    </slot>
  </div>
</template>
<script lang="ts">
import { computed, defineComponent, inject } from 'vue'
import { CollapsePanelProps, collapseInjectionKey } from './types'
import { PropTypes } from '@idux/cdk/utils'
import { IxIcon } from '@idux/components/icon'
import { useCollapseHeaderClasses } from './useCollpase'

export default defineComponent({
  name: 'IxCollapsePanelHeader',
  components: { IxIcon },
  props: {
    name: PropTypes.string.isRequired,
    title: PropTypes.string,
    disabled: PropTypes.bool,
    icons: PropTypes.string,
  },
  emits: ['click'],
  setup(props: CollapsePanelProps) {
    const collapse = inject(collapseInjectionKey, {})

    const isActive = computed(() => {
      return collapse.props.active.indexOf(props.name) > -1
    })

    const borderless = computed(() => {
      return collapse.props.borderless
    })

    const headerClasses = useCollapseHeaderClasses(props, borderless, isActive)

    return {
      borderless,
      headerClasses,
    }
  },
})
</script>
