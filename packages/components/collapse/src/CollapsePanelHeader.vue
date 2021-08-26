<template>
  <div class="ix-collapse-panel-header" :class="headerClasses" @click="$emit('click')">
    <slot name="icon">
      <IxIcon class="ix-collapse-panel-icon" :name="icons"></IxIcon>
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
import { IxPropTypes } from '@idux/cdk/utils'
import { IxIcon } from '@idux/components/icon'
import { collapseToken } from './token'

export default defineComponent({
  components: { IxIcon },
  props: {
    name: IxPropTypes.string.isRequired,
    title: IxPropTypes.string,
    disabled: IxPropTypes.bool,
    icons: IxPropTypes.string,
  },
  emits: ['click'],
  setup(props) {
    const collapse = inject(collapseToken)!

    const isActive = computed(() => {
      return collapse.props.active.indexOf(props.name) > -1
    })

    const borderless = computed(() => {
      return collapse.props.borderless
    })

    const headerClasses = computed(() => {
      const disabled = props.disabled

      return {
        'ix-collapse-panel-header-disabled': disabled,
        'ix-collapse-panel-header-inactive': !isActive.value,
        'ix-collapse-panel-header-borderless': borderless.value,
      }
    })

    return {
      borderless,
      headerClasses,
    }
  },
})
</script>
