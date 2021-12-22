<template>
  <IxRadioGroup v-model:value="value" buttoned>
    <IxRadio value="top">top</IxRadio>
    <IxRadio value="bottom">bottom</IxRadio>
    <IxRadio value="start">start</IxRadio>
    <IxRadio value="end">end</IxRadio>
    <IxRadio value="none">none</IxRadio>
  </IxRadioGroup>
  <IxCarousel :dotPlacement="value">
    <div class="card-item">1</div>
    <div class="card-item">2</div>
    <div class="card-item">3</div>
    <div class="card-item">4</div>
  </IxCarousel>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const value = ref('start')
</script>

<style lang="less" scoped>
.card-item {
  height: 160px;
  line-height: 160px;
  background-color: #364d79;
  text-align: center;
  font-size: 24px;
  color: #fff;
}
</style>
