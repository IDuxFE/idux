<template>
  <div class="ix-select-item" :class="{ 'ix-select-item-disabled': disabled }">
    <span class="ix-select-item-label">
      <slot> {{ label }} </slot>
    </span>
    <span v-if="removeable && !disabled" class="ix-select-item-remove" @click.stop="$emit('delete')">
      <ix-icon name="close" />
    </span>
  </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue'
import { IxIcon } from '@idux/components/icon'
import { PropTypes } from '@idux/cdk/utils'

export default defineComponent({
  name: 'IxSelectItem',
  components: { IxIcon },
  props: {
    removeable: PropTypes.bool,
    disabled: PropTypes.bool,
    label: PropTypes.string,
  },
  emits: ['delete'],
})
</script>
