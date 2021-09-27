<template>
  <IxSpace direction="vertical">
    <IxCheckbox v-model:checked="checkAll" :indeterminate="indeterminate" :onChange="onCheckAllChange">
      全选
    </IxCheckbox>
    <IxCheckboxGroup v-model:value="value" :options="options" />
  </IxSpace>
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
      { label: '选项一', value: 'option1' },
      { label: '选项二', value: 'option2' },
      { label: '选项三', value: 'option3' },
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
