<template>
  <IxSpace>
    <IxButton @click="openStringFooter">string</IxButton>
    <IxButton @click="oenVNodeFooter">VNode</IxButton>
    <IxButton @click="openIxButton">IxButton</IxButton>
  </IxSpace>
</template>

<script setup lang="ts">
import { h } from 'vue'

import { useNotification } from '@idux/components/notification'

const { info, success } = useNotification()

const openStringFooter = () =>
  info({
    title: 'string',
    content: 'The bottom area is configured as string display',
    footer: 'system message',
  })

const footerVNode = h('div', { style: { color: 'red' } }, 'system message')

const oenVNodeFooter = () =>
  info({
    title: 'VNode',
    content: 'The bottom area is configured as VNode',
    footer: footerVNode,
  })

const openIxButton = () => {
  const infoInstance = info({
    title: 'string',
    content: 'The bottom area is configured as IxButton',
    footer: [
      {
        mode: 'primary',
        text: 'ok',
        onClick: () =>
          success({
            title: 'success',
            content: 'ok',
          }),
      },
      {
        text: 'close',
        onClick: () => {
          infoInstance.destroy()
        },
      },
    ],
  })
}
</script>
