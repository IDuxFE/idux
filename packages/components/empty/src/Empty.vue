<template>
  <div class="ix-empty-wrapper" :style="imageStyle">
    <span>
      <ix-icon name="empty" /><br />

      <p>没有数据</p>
    </span>
  </div>
</template>
<script lang="ts">
import { IxIcon } from '@idux/components/icon'
import { defineComponent, PropType, CSSProperties } from 'vue'
import { EmptyProps } from './types'
export default defineComponent({
  name: 'IxEmpty',
  components: { IxIcon },
  props: {
    // description: String,
    imageStyle: { type: Object as PropType<CSSProperties>, default: undefined },
    // image: String,
  },
  setup(props: EmptyProps) {
    return { props }
  },
})
</script>
