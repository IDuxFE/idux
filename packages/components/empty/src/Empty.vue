<template>
  <div class="ix-empty">
    <div class="ix-empty-image">
      <img v-if="image" :src="image" alt="empty image" />
      <IxIcon v-else name="empty" />
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
import { computed, defineComponent } from 'vue'

import { getLocale } from '@idux/components/i18n'
import { IxIcon } from '@idux/components/icon'

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
