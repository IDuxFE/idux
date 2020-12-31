<template>
  <div class="ix-empty-wrapper">
    <span v-if="slots.default" class="ix-empty-main">
      <slot />
    </span>
    <span v-else class="ix-empty-main">
      <img v-if="image" :src="image" class="ix-empty-img" :style="imageStyle" />
      <ix-icon v-else name="empty" class="ix-empty-icon" />
      <p class="ix-empty-p">{{ description }}</p>
    </span>
  </div>
</template>
<script lang="ts">
import { IxIcon } from '@idux/components/icon'
import { PropTypes } from '@idux/cdk/utils'

import { defineComponent, PropType, CSSProperties } from 'vue'
import { EmptyProps } from './types'
export default defineComponent({
  name: 'IxEmpty',
  components: { IxIcon },
  props: {
    description: PropTypes.string.def('没有数据'),
    imageStyle: { type: Object as PropType<CSSProperties>, default: undefined },
    image: PropTypes.string,
  },
  setup(props: EmptyProps, { slots }) {
    return { props, slots }
  },
})
</script>
