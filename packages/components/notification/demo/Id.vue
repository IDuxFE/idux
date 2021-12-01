<template>
  <IxSpace>
    <IxButton @click="open">Click count</IxButton>
    <IxButton @click="customizeOpen">Customized count</IxButton>
    <IxButton @click="destroyAll">Destroy all notification</IxButton>
    <IxButton @click="destroyCustomized">Destroy customized count notification</IxButton>
  </IxSpace>
</template>

<script setup lang="ts">
import { useNotification } from '@idux/components/notification'

const { info, destroyAll, destroy } = useNotification()
let count = 0
let notificationKey: string
const open = () => {
  const content = `click count: ${count++}`
  if (!notificationKey) {
    const instance = info({
      content,
      title: 'notification',
    })
    notificationKey = instance.key
  } else {
    info({
      key: notificationKey,
      title: 'notification',
      content,
    })
  }
}

let countCustomized = 0
const customizedKey = 'ix-notification-key-only'
const customizeOpen = () => {
  info({
    key: customizedKey,
    title: 'notification',
    content: `click count: ${countCustomized++}`,
  })
}
const destroyCustomized = () => destroy(customizedKey)
</script>
