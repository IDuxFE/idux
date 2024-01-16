<template>
  <div style="margin-bottom: 8px">
    <IxButton :disabled="isEditing" @click="onAdd">Add</IxButton>
  </div>
  <IxFormWrapper :control="formGroup">
    <IxTable :columns="columns" :dataSource="data" :spin="spinning">
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
        <IxButtonGroup :gap="16" mode="link">
          <template v-if="record.editable">
            <IxButton @click="onSave(record)">Save</IxButton>
            <IxButton @click="onCancel(record)">Cancel</IxButton>
          </template>
          <template v-else>
            <IxButton :disabled="isEditing" @click="onEdit(record)">Edit</IxButton>
            <IxButton :disabled="isEditing" @click="onDelete(record)">Delete</IxButton>
          </template>
        </IxButtonGroup>
      </template>
    </IxTable>
  </IxFormWrapper>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

import { isSymbol } from 'lodash-es'

import { Validators, useFormGroup } from '@idux/cdk/forms'
import { VKey } from '@idux/cdk/utils'
import { useMessage } from '@idux/components/message'
import { TableColumn } from '@idux/components/table'

interface Data {
  key?: VKey
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
const spinning = ref(false)
const isEditing = ref(false)
const { success } = useMessage()

for (let index = 0; index < 3; index++) {
  data.value.push({
    key: index,
    name: `Edrward ${index}`,
    age: 12 + index,
    address: `London Park no. ${index}`,
  })
}

const { required, range, maxLength } = Validators
const formGroup = useFormGroup<Data>({
  key: [undefined],
  name: ['', required],
  age: [undefined, [required, range(18, 99)]],
  address: ['', maxLength(100)],
})

const onAdd = () => {
  const addRecord = { key: Symbol(), editable: true } as Data
  data.value = [addRecord, ...data.value]
  isEditing.value = true
}

const onSave = (record: Data) => {
  if (formGroup.valid.value) {
    const formValue = formGroup.getValue()
    spinning.value = true
    // Symbol 的 key 代表新增
    if (isSymbol(record.key)) {
      // 调用新增接口, 参数中可能需要去掉 key
      console.log('add', formValue)
    } else {
      // 调用修改的接口
      console.log('edit', formValue)
    }
    // 请求成功后，刷新数据
    setTimeout(() => {
      const copyData = [...data.value]
      const targetIndex = copyData.findIndex(item => item.key === record.key)

      copyData.splice(targetIndex, 1, formValue)
      data.value = copyData
      success(`${formValue.name} saved successfully`)
      spinning.value = false
      isEditing.value = false
    }, 1000)
  } else {
    formGroup.markAsDirty()
  }
}

const onCancel = (record: Data) => {
  // Symbol 的 key 代表新增
  if (isSymbol(record.key)) {
    data.value = data.value.filter(item => item.key !== record.key)
  } else {
    record.editable = false
  }
  isEditing.value = false
  formGroup.reset()
  formGroup.markAsPristine()
}

const onEdit = (record: Data) => {
  formGroup.setValue(record)
  record.editable = true
  isEditing.value = true
}

const onDelete = (record: Data) => {
  spinning.value = true

  // reload data
  setTimeout(() => {
    data.value = data.value.filter(item => item.key !== record.key)
    success(`${record.name} deleted successfully`)
    spinning.value = false
  }, 1000)
}
</script>
