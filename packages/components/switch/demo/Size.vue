<template>
  <div>small size:</div>
  <ix-switch size="small" checked-children="开" un-checked-children="关"></ix-switch>
  <ix-switch
    v-model:checked="checked"
    class="mt-5"
    size="small"
    checked-children="开"
    un-checked-children="关"
    disabled
    :loading="loading"
  ></ix-switch>
  <ix-switch v-model:checked="checked2" class="mt-5" size="small" :loading="loading"></ix-switch>
  <div class="mt-5">normal size:</div>
  <ix-switch size="medium"></ix-switch>
  <ix-switch v-model:checked="checked" class="mt-5" size="medium" :loading="loading"></ix-switch>
</template>
<script lang="ts">
import { defineComponent, ref } from 'vue'

export default defineComponent({
  setup() {
    const disabled = ref(true)
    const loading = ref(true)
    const checked = ref(true)
    const checked2 = ref(false)
    const changeDisabled = () => {
      disabled.value = !disabled.value
    }

    return {
      disabled,
      changeDisabled,
      loading,
      checked,
      checked2,
    }
  },
})
</script>
<style lang="less" scoped>
.mt-5 {
  margin-top: 5px;
}
</style>
