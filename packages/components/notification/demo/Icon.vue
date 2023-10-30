<template>
  <IxSpace :gap="[8, 8]">
    <IxButton @click="openCustomIconByName">Customized icon name</IxButton>
    <IxButton @click="openCustomIconByVNode">Customized icon VNode</IxButton>
    <IxButton @click="openCustomCloseIconByName">Customized close icon name</IxButton>
    <IxButton @click="openCustomCloseIconByVNode">Customized close icon VNode</IxButton>
  </IxSpace>
</template>

<script setup lang="ts">
import { h } from 'vue'

import { IxIcon } from '@idux/components/icon'
import { useNotification } from '@idux/components/notification'

const { info } = useNotification()
const openCustomIconByName = () =>
  info({
    icon: 'star',
    title: 'icon',
    content: 'This is a custom icon by name',
  })
const renderIcon = () => h(IxIcon, { name: 'star', style: { color: 'red' } })
const openCustomIconByVNode = () =>
  info({
    icon: renderIcon,
    title: 'icon',
    content: 'This is a custom icon by VNode',
  })

const openCustomCloseIconByName = () =>
  info({
    closeIcon: 'right',
    title: 'close icon',
    content: 'This is a custom close icon by name',
  })
const renderCloseIcon = () => h(IxIcon, { name: 'right', style: { color: 'red' } })
const openCustomCloseIconByVNode = () =>
  info({
    closeIcon: renderCloseIcon,
    title: 'close icon',
    content: 'This is a custom close icon by VNode',
  })
</script>
