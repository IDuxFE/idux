<template>
  <div>
    <IxProgress :percent="defaultPercent" />
    <IxProgress :percent="defaultPercent" type="circle" />
    <IxButton-group>
      <IxButton icon="minus" @click="decline" />
      <IxButton icon="plus" @click="increase" />
    </IxButton-group>
  </div>
</template>
<script lang="ts">
import { defineComponent, ref } from 'vue'

export default defineComponent({
  setup() {
    const defaultPercent = ref<number>(0)

    const increase = () => {
      const percent = defaultPercent.value + 10
      defaultPercent.value = percent > 100 ? 100 : percent
    }

    const decline = () => {
      const percent = defaultPercent.value - 10
      defaultPercent.value = percent < 0 ? 0 : percent
    }
    return {
      defaultPercent,
      increase,
      decline,
    }
  },
})
</script>
