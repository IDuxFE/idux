<template>
  <div class="ix-select-item" :class="{ 'ix-select-item-disabled': disabled }">
    <span class="ix-select-item-label">
      <slot> {{ label }} </slot>
    </span>
    <span v-if="removeable && !disabled" class="ix-select-item-remove" @click.stop="$emit('delete')">
      <IxIcon name="close" />
    </span>
  </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue'
import { IxIcon } from '@idux/components/icon'
import { IxPropTypes } from '@idux/cdk/utils'

export default defineComponent({
  components: { IxIcon },
  props: {
    removeable: IxPropTypes.bool,
    disabled: IxPropTypes.bool,
    label: IxPropTypes.string,
  },
  emits: ['delete'],
})
</script>
