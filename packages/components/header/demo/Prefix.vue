<template>
  <IxHeader prefix="arrow-left" @prefixClick="onPrefixClick"> Title </IxHeader>
  <IxHeader>
    Title
    <template #prefix> <IxIcon name="caret-left" @click="onPrefixClick" /> </template>
  </IxHeader>
</template>
<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  setup() {
    const onPrefixClick = (evt: MouseEvent) => console.log(evt)
    return { onPrefixClick }
  },
})
</script>
