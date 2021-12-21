<template>
  <IxSpace>
    <IxButtonGroup>
      <IxButton @click="onClick">Button</IxButton>
      <IxDropdown>
        <IxButton icon="ellipsis" style="font-size: 15px"></IxButton>
        <template #overlay>
          <IxMenu :dataSource="dataSource"> </IxMenu>
        </template>
      </IxDropdown>
    </IxButtonGroup>
    <IxButtonGroup>
      <IxButton @click="onClick">Button</IxButton>
      <IxDropdown>
        <IxButton icon="setting" style="font-size: 15px"></IxButton>
        <template #overlay>
          <IxMenu :dataSource="dataSource"></IxMenu>
        </template>
      </IxDropdown>
    </IxButtonGroup>

    <IxDropdown>
      <IxButton>Button <IxIcon name="down"></IxIcon></IxButton>
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

const onClick = () => console.log('button click')
</script>
