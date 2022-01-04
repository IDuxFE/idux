<template>
  <IxSpace>
    <IxPopover header="Title">
      <template #content>
        <div>This is content...</div>
      </template>
      <IxButton>Text</IxButton>
    </IxPopover>
    <IxPopover :header="header">
      <template #content>
        <div>This is content...</div>
      </template>
      <IxButton>HeaderProps</IxButton>
    </IxPopover>
    <IxPopover :header="header">
      <template #header>
        <span>Title</span>
      </template>
      <template #content>
        <div>This is content...</div>
      </template>
      <IxButton>Slot</IxButton>
    </IxPopover>
  </IxSpace>
</template>
<script setup lang="ts">
import type { HeaderProps } from '@idux/components/header'

import { h } from 'vue'

import { IxIcon } from '@idux/components/icon'
import { useMessage } from '@idux/components/message'

const { info } = useMessage()

const header: HeaderProps = {
  title: 'Title',
  size: 'md',
  disabled: false,
  prefix: h(IxIcon, { name: 'alert' }),
  showBar: false,
  subTitle: 'Sub Title',
  suffix: h(IxIcon, { name: 'link' }),
  onPrefixClick: () => {
    info('prefixClick')
  },
  onSuffixClick: () => {
    info('suffixClick')
  },
}
</script>
