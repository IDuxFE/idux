<template>
  <IxButton @click="open">Customized content</IxButton>
</template>

<script setup lang="ts">
import { h } from 'vue'

import { useNotification } from '@idux/components/notification'

const notification = useNotification()

const title = () => h('h3', { style: { color: 'red' } }, 'vnode title')

const content = () =>
  h('ul', {}, [h('li', {}, 'This is a VNode content data'), h('li', {}, 'This is a VNode content data')])

const open = () =>
  notification.info({
    title,
    content,
  })
</script>
