<template>
  <IxHeader prefix="arrow-left" suffix="setting" @prefixClick="onPrefixClick" @suffixClick="onSuffixClick">
    Title
  </IxHeader>
  <IxHeader>
    Title
    <template #prefix>
      <IxIcon name="caret-left" @click="onPrefixClick" />
    </template>
    <template #suffix>
      <IxIcon name="setting" @click="onSuffixClick"></IxIcon>
      <IxIcon name="menu" @click="onSuffixClick"></IxIcon>
      <IxButton mode="link" @click="onSuffixClick">More</IxButton>
    </template>
  </IxHeader>
</template>
<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  setup() {
    const onPrefixClick = (evt: MouseEvent) => console.log(evt)
    const onSuffixClick = (evt: MouseEvent) => console.log(evt)

    return { onPrefixClick, onSuffixClick }
  },
})
</script>
