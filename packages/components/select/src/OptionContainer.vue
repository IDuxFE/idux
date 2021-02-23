<template>
  <div class="ix-option-container">
    <template v-for="option in options" :key="option.value">
      <ix-option-group v-if="option.children" :label="option.label" :options="option.children" />
      <ix-option v-else :disabled="option.disabled" :label="option.label" :value="option.value" />
    </template>
    <slot v-if="!options.length" />
    <div v-show="isEmpty" class="ix-option-container-empty">
      <slot name="empty">
        <ix-empty :description="empty" />
      </slot>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, provide, ref } from 'vue'
import { PropTypes } from '@idux/cdk/utils'
import { IxEmpty } from '@idux/components/empty'
import IxOptionGroup from './OptionGroup.vue'
import IxOption from './Option.vue'
import { visibleChangeToken } from './utils'

export default defineComponent({
  name: 'IxOptionContainer',
  components: { IxOptionGroup, IxOption, IxEmpty },
  props: {
    options: PropTypes.array.def([]),
    empty: PropTypes.string,
  },
  setup() {
    const showItemCount = ref(0)
    const isEmpty = computed(() => showItemCount.value === 0)

    const visibleChange = (visible: boolean) => {
      if (visible) {
        showItemCount.value++
      } else {
        showItemCount.value--
      }
    }
    provide(visibleChangeToken, visibleChange)

    return { isEmpty }
  },
})
</script>
