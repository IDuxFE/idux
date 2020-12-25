<template>
  <component :is="'div'" class="ix-empty" :style="imageStyle">
    <ix-icon v-if="!image" name="empty" />
    <img v-else :src="image" />
    <p>没有数据</p>
  </component>
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
