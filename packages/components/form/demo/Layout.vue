<template>
  <ix-form class="demo-form" :layout="layout">
    <ix-form-item label="Form Layout">
      <ix-radio-group v-model:value="layout">
        <ix-radio-button value="horizontal">Horizontal</ix-radio-button>
        <ix-radio-button value="vertical">Vertical</ix-radio-button>
        <ix-radio-button value="inline">Inline</ix-radio-button>
      </ix-radio-group>
    </ix-form-item>
    <ix-form-item label="Field A">
      <ix-input></ix-input>
    </ix-form-item>
    <ix-form-item label="Field B">
      <ix-input></ix-input>
    </ix-form-item>
    <ix-form-item>
      <ix-button mode="primary">Submit</ix-button>
    </ix-form-item>
  </ix-form>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'

export default defineComponent({
  setup() {
    const layout = ref('horizontal')

    return { layout }
  },
})
</script>

<style lang="less" scoped>
.demo-form:not(.ix-form-inline) {
  max-width: 400px;
}
</style>
