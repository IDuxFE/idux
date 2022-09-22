<template>
  <IxWatermark
    :rotate="30"
    :opacity="0.2"
    content="你好 iDux🚀"
    font="small-caps bold 24px HGKY_CNKI"
    fontColor="#1c6eff"
    :fontSize="24"
    :offsetLeft="10"
    :renderFn="canvasDebugger"
  >
    <div style="height: 500px"></div>
  </IxWatermark>
</template>

<script setup lang="ts">
const canvasDebugger = (ctx: CanvasRenderingContext2D) => {
  console.log(ctx.lineWidth)
}
</script>
