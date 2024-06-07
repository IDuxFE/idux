<template>
  <IxSpace style="margin-bottom: 8px">
    <IxButton @click="onAdd">Add</IxButton>
    <IxButton @click="onSaveAll">Save All</IxButton>
    <IxButton @click="onCancelAll">Cancel All</IxButton>
    <IxButton @click="editAll">Edit All</IxButton>
  </IxSpace>
  <IxFormWrapper :control="formGroup">
    <IxTable :columns="columns" :dataSource="data" :spin="spinning">
      <template #name="{ value, record }">
        <IxFormItem v-if="beingEditedDataKeys.has(record.key)" messageTooltip>
          <IxInput :control="formGroup.get([record.key, 'name'])"></IxInput>
        </IxFormItem>
        <span v-else>{{ value }}</span>
      </template>
      <template #age="{ value, record }">
        <IxFormItem v-if="beingEditedDataKeys.has(record.key)" messageTooltip>
          <IxInputNumber :control="formGroup.get([record.key, 'age'])"></IxInputNumber>
        </IxFormItem>
        <span v-else>{{ value }}</span>
      </template>

      <template #sid="{ value, record }">
        <IxFormItem v-if="beingEditedDataKeys.has(record.key)" messageTooltip>
          <IxInput :control="formGroup.get([record.key, 'sid'])"></IxInput>
        </IxFormItem>
        <span v-else>{{ value }}</span>
      </template>

      <template #gender="{ value, record }">
        <IxFormItem v-if="beingEditedDataKeys.has(record.key)" messageTooltip>
          <IxSelect :control="formGroup.get([record.key, 'gender'])">
            <IxSelectOption key="male">male</IxSelectOption>
            <IxSelectOption key="female">female</IxSelectOption>
            <IxSelectOption key="other">other</IxSelectOption>
          </IxSelect>
        </IxFormItem>
        <span v-else>{{ value }}</span>
      </template>

      <template #action="{ record }">
        <IxButtonGroup :gap="16" mode="link">
          <template v-if="beingEditedDataKeys.has(record.key)">
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

import { isString, omit } from 'lodash-es'

import { AbstractControl, ValidateErrors, Validators, useFormGroup } from '@idux/cdk/forms'
import { VKey, uniqueId } from '@idux/cdk/utils'
import { useMessage } from '@idux/components/message'
import { TableColumn } from '@idux/components/table'

interface Data {
  key: string
  name?: string
  age?: number
  address?: string
  sid?: string
  gender?: string
}

const columns: TableColumn<Data>[] = [
  {
    title: 'Name',
    dataKey: 'name',
    customCell: 'name',
    width: 150,
  },
  {
    title: 'gender',
    dataKey: 'gender',
    customCell: 'gender',
    width: 120,
  },
  {
    title: 'Age',
    dataKey: 'age',
    customCell: 'age',
    width: 120,
  },
  {
    title: 'student id',
    dataKey: 'sid',
    customCell: 'sid',
  },
  {
    title: 'Action',
    key: 'action',
    customCell: 'action',
    width: 150,
  },
]

const data = ref<Data[]>([])
const beingEditedDataKeys = ref<Set<string>>(new Set())
const spinning = ref(false)
const { success } = useMessage()

for (let index = 0; index < 3; index++) {
  data.value.push({
    key: `${index}`,
    name: `Edrward ${index}`,
    age: 66 + index,
    sid: `25${index * 2}`,
    gender: 'female',
  })
}

const { required, range } = Validators
const formGroup = useFormGroup<Record<VKey, Data>>({})

const createRecordGroup = (record: Data) => {
  const formGroup = useFormGroup<Data>(
    {
      key: [record.key],
      name: [record.name, [required, nameValidator]],
      sid: [record.sid, [required, sidValidator]],
      gender: [record.gender, required],
      age: [record.age, [required, range(18, 99)]],
    },
    { trigger: 'interactions' },
  )

  // 注意，若版本为 1.x 不支持 interactions ,则需要手动对已填写列进行 markAsDirty 从而触发飘红

  const sidControl = formGroup.get('sid')!
  const genderControl = formGroup.get('gender')!
  genderControl.watchValue(() => sidControl.validate())

  return formGroup
}

const nameValidator = (value: string, control: AbstractControl): ValidateErrors | undefined => {
  const currentEditKey = control.parent?.get('key')?.getValue()
  if (currentEditKey === undefined) {
    return undefined
  }

  const dataInTable = data.value.reduce<Record<string, string>>((map, curr) => {
    map[curr.key] = curr.name || ''
    return map
  }, {})

  const allForms = formGroup.getValue()
  const dataInForm = Object.values(allForms).reduce<Record<string, string>>((map, curr) => {
    map[curr.key] = curr.name || ''
    return map
  }, {})

  const otherNames: string[] = Object.values(
    omit(
      {
        ...dataInTable,
        ...dataInForm,
      },
      currentEditKey,
    ),
  )

  if (otherNames.includes(value)) {
    return {
      name: {
        message: {
          'zh-CN': 'name不能重复',
        },
      },
    }
  }
  return undefined
}

const sidValidator = (value: string, control: AbstractControl): ValidateErrors | undefined => {
  const gender = control.parent?.get('gender')?.getValue()
  if (gender === undefined) {
    return undefined
  }
  console.log(`value is ${value}`)
  if (gender === 'other' && !value?.endsWith('x')) {
    return {
      sid: {
        message: {
          'zh-CN': 'other性别，sid必须以x结尾',
        },
      },
    }
  } else if (gender === 'male' && !(+value.slice(-1) % 2 === 1)) {
    return {
      sid: {
        message: {
          'zh-CN': 'male性别，sid必须是奇数',
        },
      },
    }
  } else if (gender === 'female' && !(+value.slice(-1) % 2 === 0)) {
    return {
      sid: {
        message: {
          'zh-CN': 'female性别，sid必须是偶数',
        },
      },
    }
  }
  return undefined
}

const addKeyPrefix = 'ADD_TABLE_KEY'
const onAdd = () => {
  // formGroup 不支持 Symbol 的 Key, 这里要注意保证可以的唯一性
  const key = uniqueId(addKeyPrefix)
  const addRecord: Data = { key }
  formGroup.setControl(key, createRecordGroup(addRecord))
  data.value = [addRecord, ...data.value]
  beingEditedDataKeys.value.add(key)
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

      copyData.splice(targetIndex, 1, {
        ...formValue,
        key: formValue.key.startsWith(addKeyPrefix) ? uniqueId('ADDED') : formValue.key,
      })
      data.value = copyData
      success(`${formValue.name} saved successfully`)
      formGroup.removeControl(record.key as never)
      beingEditedDataKeys.value.delete(record.key)
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
    beingEditedDataKeys.value.delete(record.key)
  }
  formGroup.removeControl(record.key as never)
}

const onEdit = (record: Data) => {
  formGroup.setControl(record.key!, createRecordGroup(record))
  beingEditedDataKeys.value.add(record.key)
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
      if (record.key.startsWith(addKeyPrefix)) {
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
        const key = item.key
        const newItem = records.find(record => record.key === key)
        const result = newItem ? newItem : item
        return {
          ...result,
          key: result.key.startsWith(addKeyPrefix) ? uniqueId('ADDED') : result.key,
        }
      })
      records.forEach(record => formGroup.removeControl(record.key as never))
      beingEditedDataKeys.value.clear()
      spinning.value = false
    }, 1000)
  } else {
    formGroup.markAsDirty()
  }
}

const onCancelAll = () => {
  data.value = data.value
    .filter(item => !item.key.startsWith(addKeyPrefix))
    .map(item => {
      beingEditedDataKeys.value.clear()
      return item
    })
}

const editAll = () => {
  data.value = data.value.map(item => {
    formGroup.setControl(item.key!, createRecordGroup(item))
    beingEditedDataKeys.value.add(item.key)
    return item
  })
}
</script>
