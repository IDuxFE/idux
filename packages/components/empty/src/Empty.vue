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
import { defineComponent, computed } from 'vue'
import { IxIcon } from '@idux/components/icon'
import { getLocale } from '@idux/components/i18n'
import { emptyProps } from './types'

export default defineComponent({
  name: 'IxEmpty',
  components: { IxIcon },
  props: emptyProps,
  setup(props) {
    const emptyLocale = getLocale('empty')
    const description$$ = computed(() => props.description ?? emptyLocale.value.description)
    return { description$$ }
  },
})
</script>
