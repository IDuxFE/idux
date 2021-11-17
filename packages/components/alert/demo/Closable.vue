<template>
  <IxAlert closable @beforeClose="onBeforeClose" @close="onClose"> 雪崩的时候，没有一片雪花是不崩的。</IxAlert>
  <IxAlert closable type="error" @beforeClose="onBeforeClose" @close="onClose"> 香蕉越大，香蕉皮越大 </IxAlert>
  <IxAlert closable type="warning" @beforeClose="onBeforeClose" @close="onClose">
    如果你愿意多花一点时间读完，你就会发现你多花了一点时间。
  </IxAlert>
</template>

<script lang="ts" setup>
const onBeforeClose = () => {
  const randomNumber = Math.random()
  console.log('onBeforeClose', randomNumber)
  return randomNumber > 0.5
}

const onClose = () => {
  console.log('onClose')
}
</script>
