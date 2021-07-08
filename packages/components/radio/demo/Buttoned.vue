<template>
  <ix-radio-group v-model:value="value" buttoned>
    <ix-radio value="a">Beijing</ix-radio>
    <ix-radio value="b">Shanghai</ix-radio>
    <ix-radio value="c">Guangzhou</ix-radio>
    <ix-radio value="d">Shenzhen</ix-radio>
  </ix-radio-group>
  <br /><br />
  <ix-radio-group v-model:value="value" buttoned mode="primary">
    <ix-radio value="a">Beijing</ix-radio>
    <ix-radio value="b">Shanghai</ix-radio>
    <ix-radio value="c">Guangzhou</ix-radio>
    <ix-radio value="d">Shenzhen</ix-radio>
  </ix-radio-group>
  <br /><br />
  <ix-radio-group v-model:value="value" buttoned disabled>
    <ix-radio value="a">Beijing</ix-radio>
    <ix-radio value="b">Shanghai</ix-radio>
    <ix-radio value="c">Guangzhou</ix-radio>
    <ix-radio value="d">Shenzhen</ix-radio>
  </ix-radio-group>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'

export default defineComponent({
  setup() {
    const value = ref('a')

    return { value }
  },
})
</script>
