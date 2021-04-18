<template>
  <div class="ix-collapse-panel" :class="classes">
    <ix-collapse-panel-header
      :name="name"
      :title="title"
      :disabled="disabled"
      :icons="!isActive ? icons[0] : icons[1]"
      @click="headerClick"
    />
    <transition name="ix-slide-down">
      <div v-show="isActive">
        <div
          class="ix-collapse-panel-header-content"
          :class="{ 'ix-collapse-panel-header-content-borderless': borderless }"
        >
          <slot></slot>
        </div>
      </div>
    </transition>
  </div>
</template>
<script lang="ts">
import { computed, defineComponent, inject } from 'vue'
import { CollapsePanelProps, collapseInjectionKey } from './types'
import { PropTypes } from '@idux/cdk/utils'
import { useCollapseClasses } from './useCollpase'
import IxCollapsePanelHeader from './CollapsePanelHeader.vue'

export default defineComponent({
  name: 'IxCollapsePanel',
  components: { IxCollapsePanelHeader },
  props: {
    name: PropTypes.string.isRequired,
    title: PropTypes.string,
    disabled: PropTypes.bool.def(false),
    icon: PropTypes.arrayOf(PropTypes.string),
  },

  setup(props: CollapsePanelProps) {
    const collapse = inject(collapseInjectionKey, {})
    const icons = computed(() => props.icon ?? ['right', 'down'])

    const isActive = computed(() => {
      return collapse.props.active.includes(props.name)
    })

    const borderless = computed(() => {
      return collapse.props.borderless
    })

    const classes = useCollapseClasses(props, borderless, isActive)

    const headerClick = () => {
      const { disabled, name } = props

      if (disabled) {
        return
      }

      collapse.handleChange(name)
    }

    return {
      borderless,
      headerClick,
      icons,
      isActive,
      classes,
    }
  },
})
</script>
