<template>
  <IxSpace>
    <IxButton v-click-outside="one">one</IxButton>
    <IxButton v-click-outside="two">two</IxButton>
    <IxButton v-click-outside="three">three</IxButton>
  </IxSpace>
</template>

<script setup lang="ts">
import { useMessage } from '@idux/components/message'

const { info } = useMessage()
const one = () => info('one')
const two = () => info('two')
const three = () => info('three')
</script>
