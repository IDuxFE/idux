<template>
  <IxSpace style="margin-bottom: 8px">
    <IxButton @click="onAdd">Add</IxButton>
    <IxButton @click="onSaveAll">Save All</IxButton>
    <IxButton @click="onCancelAll">Cancel All</IxButton>
  </IxSpace>
  <IxFormWrapper :control="formGroup">
    <IxTable :columns="columns" :dataSource="data" :spin="spinning">
      <template #name="{ value, record }">
        <IxFormItem v-if="record.editable" messageTooltip>
          <IxInput :control="formGroup.get([record.key, 'name'])"></IxInput>
        </IxFormItem>
        <span v-else>{{ value }}</span>
      </template>
      <template #age="{ value, record }">
        <IxFormItem v-if="record.editable" messageTooltip>
          <IxInputNumber :control="formGroup.get([record.key, 'age'])"></IxInputNumber>
        </IxFormItem>
        <span v-else>{{ value }}</span>
      </template>
      <template #address="{ value, record }">
        <IxFormItem v-if="record.editable" messageTooltip>
          <IxInput :control="formGroup.get([record.key, 'address'])"></IxInput>
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

import { isString } from 'lodash-es'

import { Validators, useFormGroup } from '@idux/cdk/forms'
import { VKey, uniqueId } from '@idux/cdk/utils'
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
const formGroup = useFormGroup<Record<VKey, Data>>({})

const createRecordGroup = (record: Data) => {
  return useFormGroup<Data>({
    key: [record.key],
    name: [record.name, required],
    age: [record.age, [required, range(18, 99)]],
    address: [record.address, maxLength(100)],
  })
}

const addKeyPrefix = 'ADD_TABLE_KEY'
const onAdd = () => {
  // formGroup 不支持 Symbol 的 Key, 这里要注意保证可以的唯一性
  const key = uniqueId(addKeyPrefix)
  const addRecord = { key, editable: true } as Data
  formGroup.setControl(key, createRecordGroup(addRecord))
  data.value = [addRecord, ...data.value]
}

const onSave = (record: Data) => {
  const currRecordGroup = formGroup.get(record.key!)
  if (currRecordGroup.valid.value) {
    const formValue = currRecordGroup.getValue()
    spinning.value = true
    // 判断是否为新增
    if (isString(record.key) && record.key.startsWith(addKeyPrefix)) {
      // 调用新增接口, 参数中可能需要去掉 key
      console.log('add', formValue)
    } else {
      // 调用修改的接口
      console.log('edit', formValue)
    }

    // 请求成功后，刷新数据，只更新当前行的数据
    setTimeout(() => {
      const copyData = [...data.value]
      const targetIndex = copyData.findIndex(item => item.key === record.key)

      copyData.splice(targetIndex, 1, formValue)
      data.value = copyData
      success(`${formValue.name} saved successfully`)
      formGroup.removeControl(record.key as never)
      spinning.value = false
    }, 1000)
  } else {
    currRecordGroup.markAsDirty()
  }
}

const onCancel = (record: Data) => {
  // 判断是否为新增
  if (isString(record.key) && record.key.startsWith(addKeyPrefix)) {
    data.value = data.value.filter(item => item.key !== record.key)
  } else {
    record.editable = false
  }
  formGroup.removeControl(record.key as never)
}

const onEdit = (record: Data) => {
  formGroup.setControl(record.key!, createRecordGroup(record))
  record.editable = true
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

const onSaveAll = () => {
  if (formGroup.valid.value) {
    const records = Object.values(formGroup.getValue())
    const addRecords: Data[] = []
    const editRecords: Data[] = []

    records.forEach(record => {
      // 判断是否为新增
      if (isString(record.key) && record.key.startsWith(addKeyPrefix)) {
        // 可能需要去掉 key
        addRecords.push(record)
      } else {
        editRecords.push(record)
      }
    })

    if (addRecords.length === 0 && editRecords.length === 0) {
      return
    }
    // 请求新增/修改接口
    spinning.value = true
    console.log('add', addRecords)
    console.log('edit', editRecords)

    // 请求成功后，刷新数据
    setTimeout(() => {
      data.value = data.value.map(item => {
        const key = item.key!
        const newItem = records.find(record => record.key === key)
        return newItem ? newItem : item
      })
      records.forEach(record => formGroup.removeControl(record.key as never))
      spinning.value = false
    }, 1000)
  } else {
    formGroup.markAsDirty()
  }
}

const onCancelAll = () => {
  data.value = data.value
    .filter(item => isString(item.key) && !item.key.startsWith(addKeyPrefix))
    .map(item => {
      item.editable = false
      return item
    })
}
</script>
