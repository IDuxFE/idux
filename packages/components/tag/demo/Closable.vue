<template>
  <IxTagGroup closable @close="handleClose">
    <IxTag key="a">两数之和</IxTag>
    <IxTag key="b" status="info">三数之和</IxTag>
    <IxTag key="c" status="warning">四数之和</IxTag>
    <IxTag key="d" status="error">M数之和</IxTag>
  </IxTagGroup>
</template>

<script lang="ts" setup>
const handleClose = console.log
</script>
