<template>
  <IxCarousel ref="carouselRef">
    <div v-for="item in list" :key="item" class="card-item">{{ item }}</div>
    <template #dot>
      <div class="custom-dot"></div>
    </template>
  </IxCarousel>
</template>

<script lang="ts" setup>
const list = [
  '遥远的泰山，展现出阴暗的身影',
  '厚重的基础，支撑起浅薄的高层',
  '假如某一天，有人将那乾坤颠倒',
  '陈旧的传统，必将遭逢地裂山崩',
]
</script>

<style lang="less" scoped>
.card-item {
  height: 160px;
  line-height: 160px;
  background-color: #364d79;
  text-align: center;
  font-size: 16px;
  color: #fff;
}

.custom-dot {
  width: 8px;
  height: 8px;
  border-radius: 4px;
  background-color: #fff;
}
</style>
