<template>
  <div class="ix-empty">
    <span class="ix-empty-main">
      <img v-if="image" :src="image" class="ix-empty-img" :style="imageStyle" />
      <ix-icon v-else name="empty" class="ix-empty-icon" />
      <p v-if="!$slots.default" class="ix-empty-descriptionValue">{{ descriptionValue }}</p>
      <div v-if="$slots.default">
        <slot />
      </div>
    </span>
  </div>
</template>
<script lang="ts">
import { IxIcon } from '@idux/components/icon'
import { PropTypes } from '@idux/cdk/utils'
import { defineComponent, computed } from 'vue'
import { EmptyProps } from './types'
export default defineComponent({
  name: 'IxEmpty',
  components: { IxIcon },
  props: {
    description: PropTypes.string,
    imageStyle: PropTypes.object,
    image: PropTypes.string,
  },
  setup(props: EmptyProps, { slots }) {
    const descriptionValue = useDescription(props)
    console.log(slots)

    return { descriptionValue }
  },
})

const useDescription = (props: EmptyProps) => {
  return computed(() => {
    return props.description !== undefined ? props.description : '暂无数据'
  })
}
</script>
