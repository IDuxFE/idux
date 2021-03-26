<template>
  <div>
    <div>
      <ix-checkbox v-model:checked="checked" :readonly="readonly"> option </ix-checkbox>
    </div>
    <div class="operation-area">
      <ix-button mode="primary" @click="changeChecked()">checked: {{ checked }}</ix-button>
      <ix-button mode="primary" @click="changeReadonly()">readonly: {{ readonly }}</ix-button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'

export default defineComponent({
  setup() {
    const checked = ref(true)
    const readonly = ref(false)

    const changeChecked = () => {
      checked.value = !checked.value
    }

    const changeReadonly = () => {
      readonly.value = !readonly.value
    }

    return {
      checked,
      readonly,
      changeChecked,
      changeReadonly,
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
