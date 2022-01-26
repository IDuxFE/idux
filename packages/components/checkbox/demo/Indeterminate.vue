<template>
  <IxSpace vertical>
    <IxCheckbox v-model:checked="isCheckAll" :indeterminate="indeterminate" @change="onCheckAllChange">
      Check all
    </IxCheckbox>
    <IxCheckboxGroup v-model:value="groupValue" :options="options" />
  </IxSpace>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'

const list = ['Apple', 'Pear', 'Orange']

const isCheckAll = ref(false)
const indeterminate = ref(true)
const groupValue = ref(['Apple', 'Orange'])
const options = list.map(item => {
  return { label: item, value: item }
})

const onCheckAllChange = (checkAll: boolean) => {
  groupValue.value = checkAll ? list : []
}

watch(groupValue, value => {
  indeterminate.value = value.length > 0 && value.length < list.length
  isCheckAll.value = value.length === list.length
})
</script>
