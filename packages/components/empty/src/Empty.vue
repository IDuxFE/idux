<template>
  <div class="ix-empty">
    <span class="ix-empty-main">
      <img v-if="image" :src="image" class="ix-empty-img" />
      <ix-icon v-else name="empty" class="ix-empty-icon" />
      <p v-if="!$slots.default && descriptionValue" class="ix-empty-descriptionValue">{{ descriptionValue }}</p>
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
import { useGlobalConfig } from '@idux/components/core/config'
import { getLocale } from '@idux/components/i18n'
export default defineComponent({
  name: 'IxEmpty',
  components: { IxIcon },
  props: {
    description: PropTypes.string,
    image: PropTypes.string,
  },
  setup(props: EmptyProps) {
    const descriptionValue = useDescription(props)
    return { descriptionValue }
  },
})

const useDescription = (props: EmptyProps) => {
  const emptyConfig = useGlobalConfig('empty')
  const emptyLocale = getLocale('empty')
  return computed(() => {
    return props.description !== undefined
      ? props.description
      : emptyConfig.description ?? emptyLocale.value.description
  })
}
</script>
