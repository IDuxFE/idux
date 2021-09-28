<template>
  <IxCheckbox v-model:checked="checked" :disabled="disabled" label="选项" />
  <IxCheckbox v-model:checked="checked" :disabled="disabled" buttoned label="选项" />
  <div class="operation-area">
    <IxButton @click="changeChecked()">改变勾选状态: {{ checked }}</IxButton>
    <IxButton @click="changeDisabled()">改变禁用状态: {{ disabled }}</IxButton>
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

    return {
      checked,
      disabled,
      changeChecked,
      changeDisabled,
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
