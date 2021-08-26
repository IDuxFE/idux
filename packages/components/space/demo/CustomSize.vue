<template>
  <IxSpace :size="size">
    Space
    <IxButton mode="primary">Button</IxButton>
    <IxButton>Button</IxButton>
  </IxSpace>
  <br />
  <input v-model="num" type="number" />
</template>

<script lang="ts">
import { computed, defineComponent, ref } from 'vue'

export default defineComponent({
  name: 'CustomSize',
  setup() {
    const num = ref(20)
    const size = computed(() => +num.value)

    return { num, size }
  },
})
</script>
