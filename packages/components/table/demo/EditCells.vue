<template>
  <IxTable :columns="columns" :dataSource="data">
    <template #name="{ value, record }">
      <IxFormItem v-if="record.editable === 'name'" messageTooltip>
        <IxInput :control="editControl" @blur="onSave(record, 'name')"></IxInput>
      </IxFormItem>
      <span v-else class="edit-cell" @click="onEdit(record, 'name')">
        {{ value }}
        <IxIcon name="edit" />
      </span>
    </template>
    <template #age="{ value, record }">
      <IxFormItem v-if="record.editable === 'age'" messageTooltip>
        <IxInputNumber :control="editControl" @blur="onSave(record, 'age')"></IxInputNumber>
      </IxFormItem>
      <span v-else class="edit-cell" @click="onEdit(record, 'age')">
        {{ value }}
        <IxIcon name="edit" />
      </span>
    </template>
    <template #address="{ value, record }">
      <IxFormItem v-if="record.editable === 'address'" messageTooltip>
        <IxInput :control="editControl" @blur="onSave(record, 'address')"></IxInput>
      </IxFormItem>
      <span v-else class="edit-cell" @click="onEdit(record, 'address')">
        {{ value }}
        <IxIcon name="edit" />
      </span>
    </template>
    <template #action>
      <IxButtonGroup :gap="16" mode="link">
        <IxButton>Detail</IxButton>
        <IxButton>Delete</IxButton>
      </IxButtonGroup>
    </template>
  </IxTable>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

import { Validators, useFormControl } from '@idux/cdk/forms'
import { TableColumn } from '@idux/components/table'

interface Data {
  key?: number
  name?: string
  age?: number
  address?: string
  editable?: 'name' | 'age' | 'address'
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
const editControl = useFormControl<string | number | undefined>(undefined)
const validatorMap = {
  name: [required],
  age: [required, range(18, 99)],
  address: [maxLength(100)],
}

const onEdit = (record: Data, type: 'name' | 'age' | 'address') => {
  record.editable = type
  editControl.setValue(record[type])
  editControl.setValidators(validatorMap[type])
}

const onSave = (record: Data, type: 'name' | 'age' | 'address') => {
  if (editControl.valid.value) {
    // 发起请求，成功后刷新数据, 最好只更新当前行的数据，
    record[type] = editControl.getValue()
    record.editable = undefined
  } else {
    editControl.markAsDirty()
  }
}
</script>

<style scoped lang="less">
.edit-cell {
  .ix-icon {
    visibility: hidden;
    margin-left: 16px;
  }

  &:hover {
    .ix-icon {
      visibility: visible;
    }
  }
}
</style>
