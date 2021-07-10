<template>
  <div>
    <ix-checkbox v-model:checked="checkAll" :indeterminate="indeterminate" :onChange="onCheckAllChange">
      CheckAll
    </ix-checkbox>
    <ix-checkbox-group v-model:value="value" :options="options" />
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
    const options = [
      { label: 'option1', value: 'option1' },
      { label: 'option2', value: 'option2' },
      { label: 'option3', value: 'option3' },
    ]

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
      options,
    }
  },
})
</script>
<style lang="less" scoped></style>
