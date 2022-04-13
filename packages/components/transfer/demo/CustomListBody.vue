<template>
  <IxTransfer
    v-model:value="targetKeys"
    class="transer-demo-custom-transfer-body__transfer"
    :data-source="dataSource"
    :disabled="disabled"
    :show-select-all="false"
  >
    <template #default="params">
      <IxTable
        :selected-row-keys="params.selectedKeys"
        :columns="getColumns(params)"
        :data-source="params.paginatedData"
        :scroll="{ height: 300, fullHeight: true }"
        :pagination="params.pagination"
      />
    </template>
    <template #footer />
  </IxTransfer>
</template>

<script setup lang="ts">
import { ref } from 'vue'

import { TableColumn, TableColumnSelectable } from '@idux/components/table'
import { TransferListSlotParams } from '@idux/components/transfer'

interface Data {
  key: number
  disabled: boolean
  name: string
  age: number
  address: string
}

const getColumns = (params: TransferListSlotParams): TableColumn<Data>[] => {
  const selectableColumn: TableColumnSelectable = {
    type: 'selectable',
    disabled: record => record.disabled,
    multiple: true,
    trigger: 'click',
    onChange: selectedKeys => params.handleSelectChange(selectedKeys),
  }
  if (!params.isSource) {
    return [
      selectableColumn,
      {
        title: 'Name',
        dataKey: 'name',
      },
    ]
  }

  return [
    selectableColumn,
    {
      title: 'Name',
      dataKey: 'name',
    },
    {
      title: 'Age',
      dataKey: 'age',
    },
    {
      title: 'Address',
      dataKey: 'address',
    },
  ]
}

const targetKeys = ref<number[]>(Array.from(new Array(10)).map((_, idx) => idx))

const dataSource: Data[] = Array.from(new Array(20)).map((_, idx) => ({
  key: idx,
  disabled: [1, 6, 12, 16].includes(idx),
  name: 'Candidate' + idx,
  age: idx,
  address: 'London No.1 Lake Park',
}))

const disabled = ref(false)
</script>
<style lang="less">
.transer-demo-custom-transfer-body__transfer {
  .ix-transfer-list {
    height: auto;
  }
  .ix-transfer-list-source {
    width: 500px;
  }
}
</style>