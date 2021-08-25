<template>
  <div>
    <IxCheckbox v-model:checked="checked" :disabled="disabled" label="option" />
    <div class="operation-area">
      <IxButton mode="primary" @click="changeChecked()">checked: {{ checked }}</IxButton>
      <IxButton mode="primary" @click="changeDisabled()">disabled: {{ disabled }}</IxButton>
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
