<template>
  <IxSpace>
    <IxDropdown placement="bottomStart">
      <IxButton>BS</IxButton>
      <template #overlay>
        <IxMenu :dataSource="dataSource"></IxMenu>
      </template>
    </IxDropdown>
    <IxDropdown placement="bottom">
      <IxButton>Bottom</IxButton>
      <template #overlay>
        <IxMenu :dataSource="dataSource"></IxMenu>
      </template>
    </IxDropdown>
    <IxDropdown placement="bottomEnd">
      <IxButton>BE</IxButton>
      <template #overlay>
        <IxMenu :dataSource="dataSource"></IxMenu>
      </template>
    </IxDropdown>
  </IxSpace>
  <br />
  <IxSpace>
    <IxDropdown placement="topStart">
      <IxButton>TS</IxButton>
      <template #overlay>
        <IxMenu :dataSource="dataSource"></IxMenu>
      </template>
    </IxDropdown>
    <IxDropdown placement="top">
      <IxButton>Top</IxButton>
      <template #overlay>
        <IxMenu :dataSource="dataSource"></IxMenu>
      </template>
    </IxDropdown>
    <IxDropdown placement="topEnd">
      <IxButton>TE</IxButton>
      <template #overlay>
        <IxMenu :dataSource="dataSource"></IxMenu>
      </template>
    </IxDropdown>
  </IxSpace>
</template>

<script setup lang="ts">
import { MenuData } from '@idux/components/menu'

const dataSource: MenuData[] = [
  { type: 'item', key: 'one', label: 'One' },
  { type: 'item', key: 'two', label: 'Two' },
  { type: 'divider' },
  { type: 'item', key: 'three', label: 'Three', disabled: true },
]
</script>

<style lang="less" scoped>
.ix-button {
  width: 80px;
}
</style>
