<template>
  <IxCarousel :showArrow="true">
    <div class="card-item">远看泰山黑糊糊</div>
    <div class="card-item">上头细来下头粗</div>
    <div class="card-item">如把泰山倒过来</div>
    <div class="card-item">下头细来上头粗</div>
  </IxCarousel>
  <IxCarousel :showArrow="true" style="margin-top: 16px">
    <div class="card-item">遥远的泰山，展现出阴暗的身影</div>
    <div class="card-item">厚重的基础，支撑起浅薄的高层</div>
    <div class="card-item">假如某一天，有人将那乾坤颠倒</div>
    <div class="card-item">陈旧的传统，必将遭逢地裂山崩</div>
    <template #arrow="{ type }">
      <IxIcon v-if="type === 'prev'" name="left"></IxIcon>
      <IxIcon v-else name="right"></IxIcon>
    </template>
  </IxCarousel>
</template>

<style lang="less" scoped>
.card-item {
  height: 160px;
  line-height: 160px;
  background-color: #364d79;
  text-align: center;
  font-size: 16px;
  color: #fff;
}
</style>
