<template>
  <IxHeader prefix="arrow-left" suffix="setting" @prefixClick="onPrefixClick" @suffixClick="onSuffixClick">
    Title
  </IxHeader>
  <IxHeader>
    Title
    <template #prefix>
      <IxIcon name="caret-left-filled" @click="onPrefixClick" />
    </template>
    <template #suffix>
      <IxButtonGroup size="xs" mode="text" :gap="8">
        <IxButton icon="setting" @click="onSuffixClick"></IxButton>
        <IxButton icon="menu" size="xs" @click="onSuffixClick"></IxButton>
        <IxButton size="xs" @click="onSuffixClick">More</IxButton>
      </IxButtonGroup>
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
