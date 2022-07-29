<template>
  <IxFormWrapper :control="formGroup">
    <IxTable :columns="columns" :dataSource="data">
      <template #name="{ value, record }">
        <span v-if="!record.editable">{{ value }}</span>
        <IxFormItem v-else messageTooltip>
          <IxInput control="name"></IxInput>
        </IxFormItem>
      </template>
      <template #age="{ value, record }">
        <span v-if="!record.editable">{{ value }}</span>
        <IxFormItem v-else messageTooltip>
          <IxInputNumber control="age"></IxInputNumber>
        </IxFormItem>
      </template>
      <template #address="{ value, record }">
        <span v-if="!record.editable">{{ value }}</span>
        <IxFormItem v-else messageTooltip>
          <IxInput control="address"></IxInput>
        </IxFormItem>
      </template>
      <template #action="{ record }">
        <IxSpace v-if="record.editable">
          <IxButton @click="onSave">Save</IxButton>
          <IxButton @click="onCancel">Cancel</IxButton>
        </IxSpace>
      </template>
    </IxTable>
  </IxFormWrapper>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

import { Validators, useFormGroup } from '@idux/cdk/forms'
import { TableColumn } from '@idux/components/table'

interface Data {
  key?: number
  name?: string
  age?: number
  address?: string
  editable?: boolean
}
const { required, range, maxLength } = Validators
const formGroup = useFormGroup<Data>({
  name: ['', required],
  age: [undefined, [required, range(18, 99)]],
  address: ['', maxLength(100)],
})

const onSave = () => {
  if (formGroup.valid.value) {
    console.log('onSave', formGroup.getValue())
  } else {
    formGroup.markAsDirty()
  }
}

const onCancel = () => {
  formGroup.reset()
}

const columns: TableColumn<Data>[] = [
  {
    title: 'Name',
    dataKey: 'name',
    customCell: 'name',
    width: 150,
  },
  {
    title: 'Age',
    dataKey: 'age',
    customCell: 'age',
    width: 120,
  },
  {
    title: 'Address',
    dataKey: 'address',
    customCell: 'address',
  },
  {
    title: 'Action',
    key: 'action',
    customCell: 'action',
  },
]

const data = ref<Data[]>([])

for (let index = 0; index < 3; index++) {
  data.value.push({
    key: index,
    name: `Edrward ${index}`,
    age: 18 + index,
    address: `London Park no. ${index}`,
    editable: index === 0,
  })
}
</script>
