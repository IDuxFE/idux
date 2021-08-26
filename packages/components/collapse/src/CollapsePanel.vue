<template>
  <div class="ix-collapse-panel" :class="classes">
    <CollapsePanelHeader
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
import { collapseToken } from './token'
import { collapsePanelProps } from './types'
import CollapsePanelHeader from './CollapsePanelHeader.vue'

export default defineComponent({
  name: 'IxCollapsePanel',
  components: { CollapsePanelHeader },
  props: collapsePanelProps,
  setup(props) {
    const collapse = inject(collapseToken)!
    const icons = computed(() => props.icon ?? ['right', 'down'])

    const isActive = computed(() => {
      return collapse.props.active.includes(props.name)
    })

    const borderless = computed(() => {
      return collapse.props.borderless
    })

    const classes = computed(() => {
      const disabled = props.disabled
      return {
        'ix-collapse-panel-disabled': disabled,
        'ix-collapse-panel-active': isActive.value,
        'ix-collapse-panel-borderless': borderless.value,
      }
    })

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
