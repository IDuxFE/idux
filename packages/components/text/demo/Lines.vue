<script lang="ts" setup>
const lines = Array.from(new Array(20)).map((_, idx) => `192.168.0.1 ${idx}`)
</script>

<template>
  <IxText class="demo-text-expand-lines" :ellipsis="{ rows: 4, expandable: true }">
    <template v-for="line in lines" :key="line">
      <span>{{ line }}<br /></span>
    </template>
  </IxText>
</template>
