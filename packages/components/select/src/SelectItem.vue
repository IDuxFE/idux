<template>
  <div :class="{ [`${prefixCls}-select-item`]: true, [`${prefixCls}-select-item-disabled`]: disabled }">
    <span :class="`${prefixCls}-select-item-label`">
      <slot> {{ label }} </slot>
    </span>
    <span v-if="removeable && !disabled" :class="`${prefixCls}-select-item-remove`" @click.stop="$emit('delete')">
      <IxIcon name="close" />
    </span>
  </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue'
import { useGlobalConfig } from '@idux/components/config'
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
  setup() {
    const { prefixCls } = useGlobalConfig('common')

    return {
      prefixCls,
    }
  },
})
</script>
