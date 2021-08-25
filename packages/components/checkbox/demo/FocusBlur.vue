<template>
  <div>
    <div>
      <IxCheckbox ref="checkboxRef" v-model:checked="checked" label="option" />
    </div>
    <div class="operation-area">
      <IxButton mode="primary" @click="changeFocus()">changeFocus</IxButton>
      <IxButton mode="primary" @click="changeBlur()">changeBlur</IxButton>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'

export default defineComponent({
  setup() {
    const checked = ref(false)
    const checkboxRef = ref(null as unknown as HTMLInputElement)

    const changeFocus = () => {
      checkboxRef.value.focus()
    }

    const changeBlur = () => {
      checkboxRef.value.blur()
    }

    return {
      checkboxRef,
      checked,
      changeFocus,
      changeBlur,
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
