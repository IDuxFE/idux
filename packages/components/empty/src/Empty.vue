<template>
  <div :class="`${prefixCls}-empty`">
    <div :class="`${prefixCls}-empty-image`">
      <img v-if="image" :src="image" alt="empty image" />
      <IxIcon v-else name="empty" />
    </div>
    <div v-if="description$$ || $slots.description" :class="`${prefixCls}-empty-description`">
      <slot name="description">{{ description$$ }}</slot>
    </div>
    <div v-if="$slots.default" :class="`${prefixCls}-empty-footer`">
      <slot />
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, computed } from 'vue'
import { useGlobalConfig } from '@idux/components/config'
import { IxIcon } from '@idux/components/icon'
import { getLocale } from '@idux/components/i18n'
import { emptyProps } from './types'

export default defineComponent({
  name: 'IxEmpty',
  components: { IxIcon },
  props: emptyProps,
  setup(props) {
    const { prefixCls } = useGlobalConfig('common')
    const emptyLocale = getLocale('empty')
    const description$$ = computed(() => props.description ?? emptyLocale.value.description)
    return { prefixCls, description$$ }
  },
})
</script>
