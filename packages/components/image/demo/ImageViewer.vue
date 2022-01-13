<template>
  <a style="cursor: pointer" @click="onClick">click me</a>
  <IxImageViewer v-model:visible="visible" v-model:activeIndex="activeIndex" :images="images"></IxImageViewer>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const visible = ref(false)
const activeIndex = ref(0)
const images = ref([
  '/images/example/html.png',
  '/images/example/css.png',
  '/images/example/js.png',
  '/images/example/nodejs.png',
])
const onClick = () => (visible.value = true)
</script>
