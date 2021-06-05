<template>
  <ix-input v-model:value="value" :addonBefore="addonBefore" :addonAfter="addonAfter" />
  <br /><br />
  <ix-input v-model:value="value">
    <template #addonBefore>
      <ix-select v-model:value="addonBefore" style="width: 80px">
        <ix-option label="https://" value="https"></ix-option>
        <ix-option label="http://" value="http"></ix-option>
      </ix-select>
    </template>
    <template #addonAfter>
      <ix-select v-model:value="addonAfter" style="width: 60px">
        <ix-option label=".com" value="com"></ix-option>
        <ix-option label=".cn" value="cn"></ix-option>
      </ix-select>
    </template>
  </ix-input>
  <br /><br />
  <ix-input v-model:value="value">
    <template #addonBefore><ix-icon name="user" /></template>
    <template #addonAfter><ix-icon name="setting" /></template>
  </ix-input>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'

export default defineComponent({
  setup() {
    const value = ref('my site')
    const addonBefore = ref('https')
    const addonAfter = ref('com')
    return { value, addonBefore, addonAfter }
  },
})
</script>
