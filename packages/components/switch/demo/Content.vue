<template>
  <IxSpace direction="vertical" :size="20">
    <IxSwitch v-model:checked="checked">
      <template #checkedChildren>
        <span>开</span>
      </template>
      <template #unCheckedChildren>
        <span>关</span>
      </template>
    </IxSwitch>
  </IxSpace>
</template>
<script lang="ts">
import { defineComponent, ref } from 'vue'

export default defineComponent({
  setup() {
    const checked = ref(true)

    return {
      checked,
    }
  },
})
</script>
