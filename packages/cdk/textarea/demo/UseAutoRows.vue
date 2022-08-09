<template>
  <IxSpace vertical>
    <textarea ref="textareaRef" v-model="value" class="demo-use-auto-rows__textarea" placeholder="autoRows"></textarea>
    <IxSpace>
      <span> autoRows </span>
      <IxRadioGroup v-model:value="autoRows">
        <IxRadio :value="true">true</IxRadio>
        <IxRadio :value="false">false</IxRadio>
        <IxRadio value="object">{ minRows: 3, maxRows: 4 }</IxRadio>
      </IxRadioGroup>
    </IxSpace>
  </IxSpace>
</template>

<script setup lang="ts">
import { computed, ref, watch } from 'vue'

import { useAutoRows } from '@idux/cdk/textarea'

const value = ref<string>()
const autoRows = ref<string | boolean>(true)

const textareaRef = ref<HTMLTextAreaElement>()
const { resizeToFitContent } = useAutoRows(
  textareaRef,
  computed(() => {
    if (autoRows.value === 'object') {
      return { minRows: 3, maxRows: 4 }
    }

    return !!autoRows.value
  }),
)

watch(value, () => {
  resizeToFitContent()
})
</script>

<style scoped>
.demo-use-auto-rows__textarea {
  box-sizing: border-box;
  border: 1px solid #000;
  line-height: 1.5;
  padding: 2px 4px;
  outline: none;
  resize: none;
}
</style>
