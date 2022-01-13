<template>
  <IxImage src="/images/example/html.png" alt="logo" loading="lazy" width="200" :onLoad="onLoad" :onError="onError" />
</template>

<script setup lang="ts">
import { useMessage } from '@idux/components/message'

const { info, error } = useMessage()
const onLoad = () => info('Loading is complete.')
const onError = (e: ErrorEvent) => {
  console.log(e)
  error('Failed to load.')
}
</script>
