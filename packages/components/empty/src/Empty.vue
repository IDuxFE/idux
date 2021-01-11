<template>
  <div class="ix-empty">
    <div class="ix-empty-image">
      <img v-if="image" :src="image" alt="empty image" />
      <ix-icon v-else name="empty" />
    </div>
    <div v-if="description$$ || $slots.description" class="ix-empty-description">
      <slot name="description">{{ description$$ }}</slot>
    </div>
    <div v-if="$slots.default" class="ix-empty-footer">
      <slot />
    </div>
  </div>
</template>
<script lang="ts">
import type { EmptyProps } from './types'

import { defineComponent, computed } from 'vue'
import { PropTypes } from '@idux/cdk/utils'
import { IxIcon } from '@idux/components/icon'
import { getLocale } from '@idux/components/i18n'

export default defineComponent({
  name: 'IxEmpty',
  components: { IxIcon },
  props: {
    description: PropTypes.string,
    image: PropTypes.string,
  },
  setup(props: EmptyProps) {
    const emptyLocale = getLocale('empty')
    const description$$ = computed(() => props.description ?? emptyLocale.value.description)
    return { description$$ }
  },
})
</script>
