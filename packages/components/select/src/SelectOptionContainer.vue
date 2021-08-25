<template>
  <div class="ix-option-container">
    <template v-for="option in options" :key="option.value">
      <SelectOptionGroup v-if="option.children" :label="option.label" :options="option.children" />
      <SelectOption v-else :disabled="option.disabled" :label="option.label" :value="option.value" />
    </template>
    <slot v-if="!options.length" />
    <div v-show="isEmpty" class="ix-option-container-empty">
      <slot name="empty">
        <IxEmpty :description="empty" />
      </slot>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, provide, ref } from 'vue'
import { IxPropTypes } from '@idux/cdk/utils'
import { IxEmpty } from '@idux/components/empty'
import SelectOption from './SelectOption.vue'
import SelectOptionGroup from './SelectOptionGroup.vue'
import { visibleChangeToken } from './token'

export default defineComponent({
  components: { SelectOption, SelectOptionGroup, IxEmpty },
  props: {
    options: IxPropTypes.array().def(() => []),
    empty: IxPropTypes.string,
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
