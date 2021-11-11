<template>
  <IxButton @click="onOpen">Open</IxButton>
</template>

<script setup lang="ts">
import { useDrawer } from '@idux/components/drawer'

const { open } = useDrawer()

const onOpen = () => open({ header: 'Default', content: 'Some contents..' })
</script>
