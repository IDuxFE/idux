<template>
  <IxWatermark
    :rotate="30"
    :opacity="0.2"
    :content="text"
    font="small-caps bold 24px HGKY_CNKI"
    fontColor="#1c6eff"
    :fontSize="24"
    :offsetLeft="10"
    :renderFn="canvasDebugger"
  >
    <div style="height: 500px">
      <IxInput v-model:value="text"></IxInput>
    </div>
  </IxWatermark>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const text = ref('你好 iDux🚀')

const canvasDebugger = (ctx: CanvasRenderingContext2D) => {
  console.log(ctx.lineWidth)
}
</script>
