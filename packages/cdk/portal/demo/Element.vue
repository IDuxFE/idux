<template>
  <CdkPortal :target="container">
    <div>Portal</div>
  </CdkPortal>
</template>

<script setup lang="ts">
const container = document.createElement('div')
container.classList.add('custom-container')
document.body.appendChild(container)
</script>
