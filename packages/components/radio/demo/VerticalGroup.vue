<template>
  <IxRadioGroup v-model:value="value">
    <IxSpace direction="vertical">
      <IxRadio value="a">SelectOption A</IxRadio>
      <IxRadio value="b">SelectOption B</IxRadio>
      <IxRadio value="c">SelectOption C</IxRadio>
      <IxRadio value="d">
        More...
        <IxInput v-if="value === 'd'" v-model:value="moreValue" style="width: 100px; margin-left: 16px"></IxInput>
      </IxRadio>
    </IxSpace>
  </IxRadioGroup>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'

export default defineComponent({
  setup() {
    const value = ref('a')
    const moreValue = ref('')

    return { value, moreValue }
  },
})
</script>
