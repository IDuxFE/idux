<template>
  <div>
    <ix-checkbox v-model:checked="checked" :disabled="disabled" @change="onChange"> option </ix-checkbox>
    <div class="operation-area">
      <ix-button mode="primary" @click="changeChecked()">checked: {{ checked }}</ix-button>
      <ix-button mode="primary" @click="changeDisabled()">disabled: {{ disabled }}</ix-button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'

export default defineComponent({
  setup() {
    const checked = ref(true)
    const disabled = ref(true)

    const changeChecked = () => {
      checked.value = !checked.value
    }

    const changeDisabled = () => {
      disabled.value = !disabled.value
    }

    const onChange = () => {
      console.log('onChange')
    }

    return {
      checked,
      disabled,
      changeChecked,
      changeDisabled,
      onChange,
    }
  },
})
</script>
<style lang="less" scoped>
.operation-area {
  margin-top: 30px;
  .ix-button {
    margin-right: 10px;
  }
}
</style>
