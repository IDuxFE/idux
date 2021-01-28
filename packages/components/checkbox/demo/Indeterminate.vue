<template>
  <div>
    <ix-checkbox v-model:checked="checkAll" :indeterminate="indeterminate" @change="onCheckAllChange">
      CheckAll
    </ix-checkbox>
    <ix-checkbox-group v-model:value="value">
      <ix-checkbox value="option1"> option1 </ix-checkbox>
      <ix-checkbox value="option2"> option2 </ix-checkbox>
      <ix-checkbox value="option3"> option3 </ix-checkbox>
    </ix-checkbox-group>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, watch } from 'vue'

const valueList = ['option1', 'option2', 'option3']
export default defineComponent({
  setup() {
    const checkAll = ref(false)
    const indeterminate = ref(true)

    const value = ref(['option1', 'option2'])

    watch(
      () => value.value,
      checkValue => {
        indeterminate.value = !!checkValue.length && checkValue.length < valueList.length
        checkAll.value = checkValue.length === valueList.length
      },
    )

    const onCheckAllChange = (checkValue: boolean) => {
      const isCheckAll = checkValue ? valueList : []
      value.value = isCheckAll
      indeterminate.value = false
    }

    return {
      checkAll,
      indeterminate,
      onCheckAllChange,
      value,
    }
  },
})
</script>
<style lang="less" scoped></style>
