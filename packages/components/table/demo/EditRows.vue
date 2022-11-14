<template>
  <IxFormWrapper :control="formGroup">
    <IxTable :columns="columns" :dataSource="data">
      <template #name="{ value, record }">
        <IxFormItem v-if="record.editable" messageTooltip>
          <IxInput control="name"></IxInput>
        </IxFormItem>
        <span v-else>{{ value }}</span>
      </template>
      <template #age="{ value, record }">
        <IxFormItem v-if="record.editable" messageTooltip>
          <IxInputNumber control="age"></IxInputNumber>
        </IxFormItem>
        <span v-else>{{ value }}</span>
      </template>
      <template #address="{ value, record }">
        <IxFormItem v-if="record.editable" messageTooltip>
          <IxInput control="address"></IxInput>
        </IxFormItem>
        <span v-else>{{ value }}</span>
      </template>
      <template #action="{ record }">
        <IxButtonGroup :gap="8" mode="link" separator="|">
          <template v-if="record.editable">
            <IxButton @click="onSave(record)">Save</IxButton>
            <IxButton @click="onCancel(record)">Cancel</IxButton>
          </template>
          <template v-else>
            <IxButton @click="onEdit(record)">Edit</IxButton>
            <IxButton @click="onDelete(record)">Delete</IxButton>
          </template>
        </IxButtonGroup>
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
    width: 150,
  },
]

const data = ref<Data[]>([])

for (let index = 0; index < 3; index++) {
  data.value.push({
    key: index,
    name: `Edrward ${index}`,
    age: 18 + index,
    address: `London Park no. ${index}`,
  })
}

const { required, range, maxLength } = Validators
const formGroup = useFormGroup<Data>({
  name: ['', required],
  age: [undefined, [required, range(18, 99)]],
  address: ['', maxLength(100)],
})

const onSave = (record: Data) => {
  if (formGroup.valid.value) {
    // 发起请求，成功后刷新数据
    const oldData = [...data.value]
    const targetIndex = oldData.findIndex(item => item.key === record.key)
    oldData.splice(targetIndex, 1, formGroup.getValue())
    data.value = oldData
  } else {
    formGroup.markAsDirty()
  }
}

const onCancel = (record: Data) => {
  record.editable = false
  formGroup.reset()
}

const onEdit = (record: Data) => {
  record.editable = true
  formGroup.setValue(record)
}

const onDelete = (record: Data) => {
  console.log('delete', record)
}
</script>
